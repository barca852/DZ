
import { Dashboard } from "@/components/Dashboard";
import { LegalTextsSections } from "@/components/LegalTextsSections";
import { AdministrativeProcedures } from "@/components/AdministrativeProcedures";
import { ProceduresSections } from "@/components/ProceduresSections";
import { AnalysisReportsSections } from "@/components/AnalysisReportsSections";
import { EnhancedAssistedWritingSection } from "@/components/EnhancedAssistedWritingSection";
import { CollaborationSections } from "@/components/CollaborationSections";
import { NewsReferencesSections } from "@/components/NewsReferencesSections";
import { ConfigurationSections } from "@/components/ConfigurationSections";
import { HelpSections } from "@/components/HelpSections";
import { AISearchSection } from "@/components/AISearchSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { DataExtractionSection } from "@/components/DataExtractionSection";
import { DocumentTemplatesSection } from "@/components/DocumentTemplatesSection";
import { AdvancedSearchSection } from "@/components/AdvancedSearchSection";
import { SavedSearchesEnhanced } from "@/components/SavedSearchesEnhanced";
import { AccessibilitySettings } from "@/components/configuration/AccessibilitySettings";
import { EnhancedAccessibilitySettings } from "@/components/configuration/EnhancedAccessibilitySettings";
import { OfflineMode } from "@/components/configuration/OfflineMode";
import { SecuritySection } from "@/components/configuration/SecuritySection";
import { MobileAppSection } from "@/components/configuration/MobileAppSection";
import { IntegrationsInteroperabilitySection } from "@/components/configuration/IntegrationsInteroperabilitySection";
import AlgerianLegalOCRComponent from "@/components/ocr/AlgerianLegalOCRComponent";
import OCRDemoComponent from "@/components/ocr/OCRDemoComponent";
import SimpleOCRDiagnostic from "@/components/ocr/SimpleOCRDiagnostic";
import OCRTestBasic from "@/components/OCRTestBasic";
import SimplifiedOCRComponent from "@/components/ocr/SimplifiedOCRComponent";
import RealOCRComponent from "@/components/ocr/RealOCRComponent";
import DZOCRIAProcessor from "@/components/ocr/DZOCRIAProcessor";
import ApprovalWorkflowComponent from "@/components/ocr/ApprovalWorkflowComponent";
import BatchProcessingComponent from "@/components/ocr/BatchProcessingComponent";
import OCRAnalyticsComponent from "@/components/ocr/OCRAnalyticsComponent";
import OCRSettingsComponent from "@/components/ocr/OCRSettingsComponent";
import { MonitoringComponent } from "@/components/monitoring/MonitoringComponent";

import { AIAdvancedSection } from "@/components/ai/AIAdvancedSection";
import { AnalyticsDashboardsSection } from "@/components/analytics/AnalyticsDashboardsSection";

// NextGenSearchSection intégré dans les onglets de recherche
import { EnhancedAILegalAssistant } from "@/components/ai/EnhancedAILegalAssistant";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface ContentRendererProps {
  activeSection: string;
  language: string;
  refreshTrigger?: number;
}

export function ContentRenderer({ activeSection, language, refreshTrigger }: ContentRendererProps) {
  switch (activeSection) {
    case "dashboard":
      return (
        <div className="space-y-8">
          <Dashboard language={language} />
        </div>
      );
    
    // OCR + IA sections - Composants fonctionnels
    case "ocr-extraction":
      return <DZOCRIAProcessor />;
    case "batch-processing":
      return <BatchProcessingComponent />;
    case "ocr-analytics":
      return <OCRAnalyticsComponent />;
    case "approval-workflow":
      return <ApprovalWorkflowComponent />;
    case "ocr-settings":
      return <OCRSettingsComponent />;
    case "monitoring":
      return <MonitoringComponent />;
    
    // Legal Texts sections
    case "legal-catalog":
    case "legal-enrichment":
    case "legal-search":
      return <LegalTextsSections section={activeSection} language={language} />;
    
    // Administrative Procedures sections
    case "procedures-catalog":
      return <AdministrativeProcedures />;
    case "procedures-enrichment":
    case "procedures-search":
    case "procedures-resources":
      return <ProceduresSections section={activeSection} language={language} />;
    
    // Analysis & Reports sections
    case "dashboards":
    case "analysis":
    case "reports":
      return <AnalysisReportsSections section={activeSection} language={language} />;
    case "analytics-dashboards":
      return <AnalyticsDashboardsSection language={language} />;
    case "assisted-writing":
      return <EnhancedAssistedWritingSection />;
    
    // Collaboration sections
    case "forum":
    case "collaborative-workspace":
    case "shared-resources":
      return <CollaborationSections section={activeSection} language={language} />;
    
    // News & References sections
    case "news":
    case "library":
    case "dictionaries":
    case "directories":
      return <NewsReferencesSections section={activeSection} language={language} />;
    
    // Configuration sections
    case "nomenclature":
    case "complementary-resources":
    case "alerts-notifications":
    case "user-management":
    case "performance-scalability":
      return <ConfigurationSections section={activeSection} language={language} />;
    case "integrations-interoperability":
      return <IntegrationsInteroperabilitySection language={language} />;
    
    // Redirect data-management to security section
    case "data-management":
    case "security":
      return <SecuritySection language={language} />;
    
    // New mobile app section
    case "mobile-app":
      return <MobileAppSection language={language} />;
    
    // New configuration sections
    case "accessibility-settings":
      return <EnhancedAccessibilitySettings language={language} />;
    case "offline-mode":
      return <OfflineMode language={language} />;
    
    // Help sections
    case "about":
    case "contact":
    case "technical-support":
      return <HelpSections section={activeSection} language={language} />;

    // Legal sections  
    case "privacy-policy":
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              La République Algérienne Démocratique et Populaire, à travers la plateforme dalil.dz, 
              s'engage à protéger la confidentialité et la sécurité des données personnelles de tous 
              les utilisateurs conformément à la législation algérienne en vigueur.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Collecte des données</h2>
            <p className="text-gray-600 mb-4">
              Nous collectons les types de données suivants pour assurer le bon fonctionnement de la plateforme :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Données d'identification :</strong> Nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Données professionnelles :</strong> Statut professionnel, domaine d'activité, numéro d'agrément</li>
              <li><strong>Données de connexion :</strong> Adresse IP, logs de connexion, cookies de session</li>
              <li><strong>Données d'utilisation :</strong> Historique de recherche, documents consultés, favoris</li>
              <li><strong>Données de contenu :</strong> Documents téléchargés, commentaires, contributions</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. Finalités de traitement</h2>
            <p className="text-gray-600 mb-4">
              Vos données personnelles sont traitées aux fins suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Fourniture des services de veille juridique et d'information légale</li>
              <li>Gestion de votre compte utilisateur et authentification</li>
              <li>Personnalisation de l'expérience utilisateur et recommandations</li>
              <li>Amélioration continue de la plateforme et des services</li>
              <li>Communication relative aux mises à jour et nouveautés</li>
              <li>Respect des obligations légales et réglementaires</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Base légale du traitement</h2>
            <p className="text-gray-600 mb-4">
              Le traitement de vos données est fondé sur :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>L'exécution d'un contrat :</strong> Pour la fourniture des services demandés</li>
              <li><strong>L'intérêt légitime :</strong> Pour l'amélioration des services et la sécurité</li>
              <li><strong>L'obligation légale :</strong> Pour respecter les dispositions réglementaires</li>
              <li><strong>Le consentement :</strong> Pour les traitements optionnels (newsletters, cookies analytiques)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Conservation des données</h2>
            <p className="text-gray-600 mb-4">
              Nous conservons vos données personnelles pour une durée limitée et justifiée :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Données de compte :</strong> Pendant la durée d'activité du compte + 3 ans</li>
              <li><strong>Données de connexion :</strong> 12 mois maximum</li>
              <li><strong>Données de contenu :</strong> Pendant la durée d'activité + 5 ans</li>
              <li><strong>Cookies :</strong> 13 mois maximum pour les cookies analytiques</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Sécurité et protection</h2>
            <p className="text-gray-600 mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Chiffrement SSL/TLS pour toutes les communications</li>
              <li>Authentification multi-facteurs pour les comptes sensibles</li>
              <li>Surveillance continue des accès et détection d'intrusion</li>
              <li>Sauvegardes sécurisées et chiffrées</li>
              <li>Formation régulière du personnel à la sécurité</li>
              <li>Audits de sécurité périodiques</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Partage des données</h2>
            <p className="text-gray-600 mb-4">
              Vos données personnelles ne sont partagées qu'avec :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Les autorités compétentes sur demande légale</li>
              <li>Nos prestataires techniques sous contrat strict de confidentialité</li>
              <li>Les partenaires institutionnels dans le cadre de missions de service public</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Aucune donnée n'est vendue, louée ou cédée à des fins commerciales.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Vos droits</h2>
            <p className="text-gray-600 mb-4">
              Conformément à la législation algérienne, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Droit d'accès :</strong> Consulter vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
              <li><strong>Droit d'effacement :</strong> Supprimer vos données dans certains cas</li>
              <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement pour des motifs légitimes</li>
              <li><strong>Droit de limitation :</strong> Limiter le traitement dans certains cas</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">8. Cookies et technologies similaires</h2>
            <p className="text-gray-600 mb-4">
              Notre plateforme utilise des cookies pour :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Assurer le bon fonctionnement technique de la plateforme</li>
              <li>Mémoriser vos préférences et paramètres</li>
              <li>Analyser l'utilisation pour améliorer nos services</li>
              <li>Assurer la sécurité et prévenir les fraudes</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">9. Contact et réclamations</h2>
            <p className="text-gray-600 mb-4">
              Pour toute question relative à cette politique ou pour exercer vos droits :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Email :</strong> privacy@dalil.dz</li>
              <li><strong>Téléphone :</strong> +213 21 XX XX XX</li>
              <li><strong>Adresse :</strong> Ministère de la Justice, Alger, Algérie</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Vous avez également le droit de déposer une réclamation auprès de l'Autorité de Régulation 
              des Communications Électroniques et des Postes (ARCEP) si vous estimez que vos droits 
              ne sont pas respectés.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">10. Mise à jour de la politique</h2>
            <p className="text-gray-600 mb-4">
              Cette politique de confidentialité peut être mise à jour pour refléter les évolutions 
              légales, technologiques ou de nos services. Les modifications importantes vous seront 
              notifiées par email ou par un avis sur la plateforme.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      );
    
    case "terms-of-use":
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Les présentes conditions d'utilisation régissent l'utilisation de la plateforme dalil.dz, 
              service officiel de veille juridique de la République Algérienne Démocratique et Populaire. 
              En accédant et en utilisant cette plateforme, vous acceptez d'être lié par ces conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Définitions</h2>
            <p className="text-gray-600 mb-4">
              Dans ces conditions d'utilisation :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>"Plateforme"</strong> désigne le site web dalil.dz et ses services associés</li>
              <li><strong>"Utilisateur"</strong> désigne toute personne accédant à la plateforme</li>
              <li><strong>"Contenu"</strong> désigne tous les textes, documents, données et informations disponibles</li>
              <li><strong>"Services"</strong> désigne l'ensemble des fonctionnalités offertes par la plateforme</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. Accès et inscription</h2>
            <p className="text-gray-600 mb-4">
              L'accès à la plateforme dalil.dz est ouvert à :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Les professionnels du droit (avocats, notaires, huissiers, magistrats)</li>
              <li>Les fonctionnaires et agents de l'administration publique</li>
              <li>Les étudiants en droit et chercheurs</li>
              <li>Les citoyens algériens pour des fins de consultation juridique</li>
              <li>Les entreprises et organisations dans le cadre de leurs obligations légales</li>
            </ul>
            <p className="text-gray-600 mb-4">
              L'inscription peut être requise pour accéder à certaines fonctionnalités avancées.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Utilisation autorisée</h2>
            <p className="text-gray-600 mb-4">
              Vous êtes autorisé à utiliser la plateforme pour :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Consulter les textes juridiques et la législation en vigueur</li>
              <li>Effectuer des recherches juridiques et documentaires</li>
              <li>Télécharger des documents officiels pour usage professionnel</li>
              <li>Participer aux forums de discussion et échanges</li>
              <li>Utiliser les outils d'analyse et de veille juridique</li>
              <li>Contribuer à l'enrichissement de la base documentaire</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Utilisation interdite</h2>
            <p className="text-gray-600 mb-4">
              Il est strictement interdit de :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Utiliser la plateforme à des fins illégales ou frauduleuses</li>
              <li>Tenter de compromettre la sécurité ou l'intégrité du système</li>
              <li>Reproduire, distribuer ou commercialiser le contenu sans autorisation</li>
              <li>Publier du contenu diffamatoire, offensant ou inapproprié</li>
              <li>Usurper l'identité d'autres utilisateurs ou administrateurs</li>
              <li>Utiliser des robots ou scripts automatisés sans autorisation</li>
              <li>Surcharger les serveurs par des requêtes excessives</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              La plateforme dalil.dz et son contenu sont protégés par les droits de propriété intellectuelle :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Textes juridiques :</strong> Propriété de l'État algérien, reproduction autorisée pour usage officiel</li>
              <li><strong>Interface et logiciels :</strong> Droits réservés au Ministère de la Justice</li>
              <li><strong>Bases de données :</strong> Protection par le droit sui generis</li>
              <li><strong>Contenu utilisateur :</strong> Droits réservés aux contributeurs respectifs</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Toute reproduction, distribution ou modification non autorisée est strictement interdite.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Responsabilités</h2>
            <p className="text-gray-600 mb-4">
              <strong>Responsabilité de l'utilisateur :</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Respecter les présentes conditions d'utilisation</li>
              <li>Assurer la confidentialité de ses identifiants de connexion</li>
              <li>Vérifier l'exactitude et la pertinence des informations utilisées</li>
              <li>Respecter les droits de propriété intellectuelle</li>
              <li>Ne pas nuire au bon fonctionnement de la plateforme</li>
            </ul>
            <p className="text-gray-600 mb-4">
              <strong>Responsabilité de la plateforme :</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Assurer la disponibilité et la sécurité des services</li>
              <li>Maintenir l'exactitude et la mise à jour du contenu juridique</li>
              <li>Protéger la confidentialité des données utilisateur</li>
              <li>Fournir un support technique approprié</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Disponibilité et maintenance</h2>
            <p className="text-gray-600 mb-4">
              La plateforme s'efforce de maintenir une disponibilité optimale mais ne peut garantir :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Une disponibilité continue 24h/24 et 7j/7</li>
              <li>L'absence d'interruptions pour maintenance</li>
              <li>La compatibilité avec tous les navigateurs et appareils</li>
              <li>L'absence d'erreurs techniques ou de bugs</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Les maintenances programmées sont annoncées à l'avance sur la plateforme.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">8. Limitation de responsabilité</h2>
            <p className="text-gray-600 mb-4">
              Dans les limites autorisées par la loi algérienne :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>La plateforme ne peut être tenue responsable des dommages indirects</li>
              <li>La responsabilité est limitée aux dommages directs prouvés</li>
              <li>Aucune garantie n'est fournie quant à l'exactitude absolue du contenu</li>
              <li>Les utilisateurs restent responsables de l'utilisation qu'ils font des informations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">9. Suspension et résiliation</h2>
            <p className="text-gray-600 mb-4">
              La plateforme se réserve le droit de :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Suspendre temporairement l'accès d'un utilisateur en cas de violation</li>
              <li>Résilier définitivement un compte en cas de manquement grave</li>
              <li>Modifier ou supprimer du contenu inapproprié</li>
              <li>Prendre toute mesure nécessaire pour protéger l'intégrité du service</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">10. Modifications des conditions</h2>
            <p className="text-gray-600 mb-4">
              La plateforme peut modifier ces conditions d'utilisation à tout moment. 
              Les modifications importantes seront notifiées :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Par email aux utilisateurs inscrits</li>
              <li>Par un avis sur la page d'accueil de la plateforme</li>
              <li>Par une notification dans l'interface utilisateur</li>
            </ul>
            <p className="text-gray-600 mb-4">
              La poursuite de l'utilisation après modification vaut acceptation des nouvelles conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">11. Droit applicable et juridiction</h2>
            <p className="text-gray-600 mb-4">
              Les présentes conditions sont régies par le droit algérien. 
              Tout litige sera soumis à la compétence des tribunaux algériens.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">12. Contact</h2>
            <p className="text-gray-600 mb-4">
              Pour toute question relative à ces conditions d'utilisation :
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li><strong>Email :</strong> legal@dalil.dz</li>
              <li><strong>Téléphone :</strong> +213 21 XX XX XX</li>
              <li><strong>Adresse :</strong> Ministère de la Justice, Alger, Algérie</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
              <p className="text-blue-800 text-sm">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
              <p className="text-blue-700 text-sm mt-2">
                En utilisant la plateforme dalil.dz, vous confirmez avoir lu, compris et accepté 
                l'intégralité de ces conditions d'utilisation.
              </p>
            </div>
          </div>
        </div>
      );

    case "messages":
      return (
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Messages et Notifications</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Messages récents</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <h3 className="font-medium text-blue-900">Nouvelle mise à jour juridique</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Une nouvelle loi sur le commerce électronique a été publiée au Journal Officiel.
                    </p>
                    <p className="text-blue-600 text-xs mt-2">Il y a 2 heures</p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <h3 className="font-medium text-green-900">Validation de document</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Votre document "Procédure d'immatriculation" a été validé et publié.
                    </p>
                    <p className="text-green-600 text-xs mt-2">Il y a 1 jour</p>
                  </div>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <h3 className="font-medium text-yellow-900">Rappel de deadline</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      N'oubliez pas de soumettre votre rapport mensuel avant le 30 du mois.
                    </p>
                    <p className="text-yellow-600 text-xs mt-2">Il y a 3 jours</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications email</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Alertes juridiques</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages système</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // AI sections
    case "ai-assistant":
      return <EnhancedAILegalAssistant />;
    case "ai-advanced":
      return <AIAdvancedSection />;
    // ai-search désormais intégré dans les onglets de recherche
    
    // Admin section
    case "admin":
      return <AdminPanel />;
    
    // Other sections
    case "favorites":
      return <FavoritesSection />;
    case "data-extraction":
      return <DataExtractionSection />;
    case "document-templates":
      return <DocumentTemplatesSection />;
    case "advanced-search":
      return <AdvancedSearchSection />;
    case "saved-searches":
      return <SavedSearchesEnhanced />;
    
    
    default:
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Section en cours de développement</h3>
            <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
          </div>
        </div>
      );
  }
}
