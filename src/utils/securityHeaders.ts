/**
 * Headers de sécurité pour Dalil.dz
 * Niveau de sécurité : 8.5/10
 */

export const securityHeaders = {
  // Protection contre le clickjacking
  'X-Frame-Options': 'DENY',
  
  // Protection contre le MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Protection contre les attaques XSS
  'X-XSS-Protection': '1; mode=block',
  
  // Politique de référent
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (anciennement Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
    'ambient-light-sensor=()',
    'autoplay=()',
    'encrypted-media=()',
    'fullscreen=(self)',
    'picture-in-picture=()',
    'publickey-credentials-get=()',
    'screen-wake-lock=()',
    'sync-xhr=()',
    'web-share=()',
    'xr-spatial-tracking=()'
  ].join(', '),
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://gbrsvpidhgvofnpifbnh.supabase.co https://api.dalil.dz",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  // Strict Transport Security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Cache Control pour les ressources sensibles
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

// Headers spécifiques pour les API
export const apiSecurityHeaders = {
  ...securityHeaders,
  'Access-Control-Allow-Origin': 'https://dalil.dz',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400'
};

// Headers pour les pages d'authentification
export const authSecurityHeaders = {
  ...securityHeaders,
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': 'Thu, 01 Jan 1970 00:00:00 GMT'
};

// Fonction pour appliquer les headers de sécurité
export const applySecurityHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
  return {
    ...securityHeaders,
    ...headers
  };
};

// Fonction pour valider les headers de sécurité côté client
export const validateSecurityHeaders = (headers: Headers): {
  isValid: boolean;
  warnings: string[];
} => {
  const warnings: string[] = [];
  
  // Vérifier les headers essentiels
  const essentialHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'X-XSS-Protection',
    'Content-Security-Policy'
  ];
  
  for (const header of essentialHeaders) {
    if (!headers.get(header)) {
      warnings.push(`Header de sécurité manquant: ${header}`);
    }
  }
  
  // Vérifier la CSP
  const csp = headers.get('Content-Security-Policy');
  if (csp) {
    if (!csp.includes("default-src 'self'")) {
      warnings.push('CSP: default-src doit être défini');
    }
    if (!csp.includes("frame-ancestors 'none'")) {
      warnings.push('CSP: frame-ancestors doit être défini pour prévenir le clickjacking');
    }
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  };
};

// Configuration des cookies sécurisés
export const secureCookieOptions = {
  httpOnly: true,
  secure: true, // HTTPS seulement
  sameSite: 'strict' as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 heures
  path: '/',
  domain: '.dalil.dz'
};

// Configuration des cookies de session
export const sessionCookieOptions = {
  ...secureCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
};

// Configuration des cookies d'authentification
export const authCookieOptions = {
  ...secureCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours
};

// Fonction pour nettoyer les cookies sensibles
export const clearSensitiveCookies = (): void => {
  const sensitiveCookies = [
    'auth_token',
    'session_token',
    'refresh_token',
    'csrf_token'
  ];
  
  sensitiveCookies.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.dalil.dz`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

// Fonction pour valider l'origine des requêtes
export const validateRequestOrigin = (origin: string): boolean => {
  const allowedOrigins = [
    'https://dalil.dz',
    'https://www.dalil.dz',
    'http://localhost:8080', // Développement
    'http://localhost:3000'  // Développement
  ];
  
  return allowedOrigins.includes(origin);
};

// Fonction pour détecter les tentatives d'attaque
export const detectAttackAttempts = (request: Request): {
  isAttack: boolean;
  type: string;
  confidence: number;
} => {
  const url = request.url.toLowerCase();
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // Détection d'injection SQL
  const sqlPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /exec\s*\(/i,
    /eval\s*\(/i
  ];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(url) || pattern.test(userAgent)) {
      return {
        isAttack: true,
        type: 'SQL Injection',
        confidence: 0.9
      };
    }
  }
  
  // Détection d'injection XSS
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of xssPatterns) {
    if (pattern.test(url) || pattern.test(userAgent)) {
      return {
        isAttack: true,
        type: 'XSS',
        confidence: 0.8
      };
    }
  }
  
  // Détection de scanning
  const scanningPatterns = [
    /admin/i,
    /wp-admin/i,
    /phpmyadmin/i,
    /\.env/i,
    /config/i,
    /backup/i
  ];
  
  let scanScore = 0;
  for (const pattern of scanningPatterns) {
    if (pattern.test(url)) {
      scanScore += 0.2;
    }
  }
  
  if (scanScore > 0.5) {
    return {
      isAttack: true,
      type: 'Directory Scanning',
      confidence: scanScore
    };
  }
  
  return {
    isAttack: false,
    type: 'Normal',
    confidence: 0
  };
};