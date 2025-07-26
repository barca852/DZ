#!/usr/bin/env node

/**
 * Script de nettoyage pour Dalil.dz
 * Supprime les fichiers inutilisés et optimise le projet
 */

const fs = require('fs');
const path = require('path');

// Fichiers à supprimer (documentation obsolète)
const filesToDelete = [
  'EXTENSION_COMPLETE_LYO.md',
  'IMPLEMENTATION_COMPLETE_LYO.md',
  'SYNCHRONISATION_BRANCHE_LYO_COMPLETE.md',
  'VRAIES_FONCTIONNALITES_LYO.md',
  'PROCESSEUR_OCR_100_LOCAL_DZ.md',
  'PROGRESS_OCR_REAL.md',
  'README_OCR_IA.md',
  'RESOLUTION_PAGE_BLANCHE_OCR.md',
  'RESUME_FINAL_LYO_OCR_IA.md',
  'RESUMÉ_IMPLEMENTATION_OCR_IA.md',
  'SECURITY_LEVEL_8.5_REPORT.md',
  'SECURITY_PERFORMANCE_REPORT.md',
  'SEPARATION_TACHES_OCR.md',
  'SIMPLIFICATION_INTERFACE_OCR.md',
  'SYNCHRONISATION_BRANCHE_LYO.md',
  'TEST_INSTRUCTIONS_LYO.md',
  'BOUTONS_LIENS_FONCTIONNELS_RAPPORT.md',
  'BUGS_FIXED_SUMMARY.md',
  'CONFIRMATION_FINAL_LYO_ONGLETS.md',
  'CONFIRMATION_LYO.md',
  'CONFIRMATION_MISSION_OCR_IA_LOCAL_LYO.md',
  'CORRECTION_ONGLETS_PRESERVATION.md',
  'CORRECTION_SCANNER_AVANCE.md',
  'DETAILED_METRICS_REPORT.md',
  'ETAT_IMPLEMENTATION_OCR_IA_LYO.md',
  'GUIDE_OCR_IA_JURIDIQUE.md',
  'OCR_JURIDIQUE_DOCUMENTATION.md',
  'OPTIMISATION_ASSETS_LOURDS.md',
  'PLAN_AMELIORATION_TECHNIQUE.md',
  'PLAN_TRAVAIL_OCR_IA_JURIDIQUE_ALGERIEN.md',
  'performance_metrics.txt',
  'FORCE_PREVIEW_REBUILD.txt'
];

// Dossiers à nettoyer
const dirsToClean = [
  'dist',
  'node_modules/.cache',
  '.vite'
];

// Fonction pour supprimer un fichier
function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Supprimé: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression de ${filePath}:`, error.message);
  }
}

// Fonction pour nettoyer un dossier
function cleanDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Dossier nettoyé: ${dirPath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du nettoyage de ${dirPath}:`, error.message);
  }
}

// Fonction principale
function cleanup() {
  console.log('🧹 Début du nettoyage de Dalil.dz...\n');
  
  // Supprimer les fichiers de documentation obsolète
  console.log('📄 Suppression des fichiers de documentation obsolète...');
  filesToDelete.forEach(file => {
    deleteFile(file);
  });
  
  // Nettoyer les dossiers de build
  console.log('\n🗂️  Nettoyage des dossiers de build...');
  dirsToClean.forEach(dir => {
    cleanDirectory(dir);
  });
  
  // Nettoyer les logs et fichiers temporaires
  console.log('\n📝 Nettoyage des fichiers temporaires...');
  const tempFiles = [
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    '.DS_Store',
    'Thumbs.db'
  ];
  
  tempFiles.forEach(pattern => {
    const files = fs.readdirSync('.').filter(file => 
      file.includes(pattern.replace('*', ''))
    );
    files.forEach(file => deleteFile(file));
  });
  
  console.log('\n✅ Nettoyage terminé !');
  console.log('\n📊 Résumé:');
  console.log(`   - ${filesToDelete.length} fichiers de documentation supprimés`);
  console.log(`   - ${dirsToClean.length} dossiers nettoyés`);
  console.log('\n🚀 Le projet est maintenant optimisé pour la production.');
}

// Exécuter le nettoyage
if (require.main === module) {
  cleanup();
}

module.exports = { cleanup, deleteFile, cleanDirectory };