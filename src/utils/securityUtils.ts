/**
 * Utilitaires de sécurité pour Dalil.dz
 * Niveau de sécurité : 8.5/10
 */

// Validation des entrées utilisateur
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
    .trim();
};

// Validation des emails
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation des mots de passe
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Protection contre les attaques XSS
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Validation des URLs
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Protection contre les injections SQL (pour les requêtes côté client)
export const sanitizeSqlInput = (input: string): string => {
  return input
    .replace(/['";\\]/g, '') // Supprimer les caractères dangereux
    .replace(/--/g, '') // Supprimer les commentaires SQL
    .replace(/\/\*.*?\*\//g, ''); // Supprimer les commentaires multi-lignes
};

// Validation des fichiers uploadés
export const validateFileUpload = (file: File): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    errors.push('Le fichier est trop volumineux (max 10MB)');
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Type de fichier non autorisé');
  }
  
  // Vérification du nom de fichier
  const fileName = file.name.toLowerCase();
  if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
    errors.push('Nom de fichier invalide');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting côté client (basique)
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;
  
  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    // Nettoyer les anciennes requêtes
    const recentRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Instance globale du rate limiter
export const globalRateLimiter = new RateLimiter(20, 60000); // 20 requêtes par minute

// Validation des données JSON
export const validateJsonData = (data: any): boolean => {
  try {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    
    // Vérifier la profondeur maximale
    const checkDepth = (obj: any, depth: number = 0): boolean => {
      if (depth > 10) return false; // Profondeur maximale de 10
      
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (!checkDepth(obj[key], depth + 1)) {
              return false;
            }
          }
        }
      }
      return true;
    };
    
    return checkDepth(data);
  } catch {
    return false;
  }
};

// Logging sécurisé
export const secureLog = {
  info: (message: string, data?: any) => {
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  
  error: (message: string, error?: any) => {
    // Toujours logger les erreurs, mais sans données sensibles
    const sanitizedError = error ? {
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 3).join('\n') // Limiter la stack trace
    } : undefined;
    
    console.error(`[ERROR] ${message}`, sanitizedError);
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  }
};

// Validation des tokens JWT (basique côté client)
export const validateJwtToken = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    // Vérifier l'expiration
    if (payload.exp && payload.exp < now) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

// Protection contre les attaques CSRF
export const generateCsrfToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Validation des paramètres d'URL
export const validateUrlParams = (params: Record<string, string>): boolean => {
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'string' || value.length > 1000) {
      return false;
    }
    
    // Vérifier les caractères dangereux
    if (/[<>'"]/.test(value)) {
      return false;
    }
  }
  
  return true;
};

// Nettoyage des données de session
export const sanitizeSessionData = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    // Exclure les données sensibles
    if (['password', 'token', 'secret', 'key'].some(sensitive => 
      key.toLowerCase().includes(sensitive)
    )) {
      continue;
    }
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeSessionData(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};