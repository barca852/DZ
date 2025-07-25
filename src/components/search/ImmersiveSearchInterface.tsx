
import { useState } from 'react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Brain, 
  Zap, 
  Target,
  BookOpen,
  FileText,
  Scale,
  Users,
  ClipboardList
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

export function ImmersiveSearchInterface() {
  // États pour les modales métier
  const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [browseType, setBrowseType] = useState<string>('');
  const [browseTitle, setBrowseTitle] = useState<string>('');

  // Fonction de recherche sémantique
  const handleSemanticSearch = (query: string) => {
    // Simulation d'une vraie recherche sémantique
    const results = [
      { id: 1, title: 'Document sémantique 1', relevance: 0.95 },
      { id: 2, title: 'Document sémantique 2', relevance: 0.87 },
      { id: 3, title: 'Document sémantique 3', relevance: 0.82 }
    ];
    setSearchResults(results);
    setShowSearchResultsModal(true);
  };

  // Fonction de recherche par mots-clés
  const handleKeywordSearch = (query: string) => {
    // Simulation d'une vraie recherche par mots-clés
    const results = [
      { id: 1, title: 'Document mots-clés 1', relevance: 0.92 },
      { id: 2, title: 'Document mots-clés 2', relevance: 0.85 },
      { id: 3, title: 'Document mots-clés 3', relevance: 0.78 }
    ];
    setSearchResults(results);
    setShowSearchResultsModal(true);
  };

  // Fonction de recherche IA avancée
  const handleAISearch = (query: string) => {
    // Simulation d'une vraie recherche IA
    const results = [
      { id: 1, title: 'Document IA 1', relevance: 0.98 },
      { id: 2, title: 'Document IA 2', relevance: 0.94 },
      { id: 3, title: 'Document IA 3', relevance: 0.89 }
    ];
    setSearchResults(results);
    setShowSearchResultsModal(true);
  };

  // Fonction de navigation par type
  const handleBrowseType = (type: string, title: string) => {
    setBrowseType(type);
    setBrowseTitle(title);
    setShowBrowseModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Interface de Recherche Immersive</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explorez notre base de données juridique avec des outils de recherche avancés et intelligents
        </p>
      </div>

      {/* Search Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <CardTitle className="text-indigo-900">Recherche Sémantique</CardTitle>
            <CardDescription>
              Recherche intelligente basée sur le sens et le contexte
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => handleSemanticSearch(searchQuery || 'recherche contextuelle')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              Recherche sémantique
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Recherche par Mots-clés</CardTitle>
            <CardDescription>
              Recherche précise par termes spécifiques
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => handleKeywordSearch(searchQuery || 'recherche par termes')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Recherche mots-clés
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Recherche IA Avancée</CardTitle>
            <CardDescription>
              Intelligence artificielle pour des résultats optimaux
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => handleAISearch(searchQuery || 'recherche intelligente')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              IA avancée
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <Button 
              onClick={() => handleBrowseType('loi', 'Lois')}
              className="bg-red-600 hover:bg-red-700"
            >
              <Scale className="w-4 h-4 mr-2" />
              Lois
            </Button>
            <Button
              onClick={() => handleBrowseType('decret', 'Décrets')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Décrets
            </Button>
            <Button
              onClick={() => handleBrowseType('arrete', 'Arrêtés')}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Arrêtés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modale de résultats de recherche */}
      {showSearchResultsModal && (
        <DocumentViewerModal
          isOpen={showSearchResultsModal}
          onClose={() => setShowSearchResultsModal(false)}
          document={{
            title: "Résultats de recherche",
            content: `Résultats trouvés: ${searchResults.length}\n\n${searchResults.map((result, index) => `${index + 1}. ${result.title} (pertinence: ${result.relevance})\n`).join('')}\n\nInterface de visualisation et navigation dans les résultats de recherche.`
          }}
        />
      )}

      {/* Modale de navigation par type */}
      {showBrowseModal && (
        <DocumentViewerModal
          isOpen={showBrowseModal}
          onClose={() => setShowBrowseModal(false)}
          document={{
            title: `Navigation: ${browseTitle}`,
            content: `Interface de navigation dans les ${browseTitle.toLowerCase()}\n\nType: ${browseType}\n\nFiltres disponibles:\n- Par date\n- Par institution\n- Par domaine\n- Par statut\n\nInterface de navigation et filtrage par type de document.`
          }}
        />
      )}
    </div>
  );
}
