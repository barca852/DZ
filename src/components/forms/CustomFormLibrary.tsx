import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  Star,
  Calendar,
  MoreHorizontal,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';

interface CustomForm {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: number;
  responses: number;
  createdDate: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  isStarred: boolean;
}

export function CustomFormLibrary() {
  // États pour les modales métier
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showViewFormModal, setShowViewFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showDuplicateFormModal, setShowDuplicateFormModal] = useState(false);
  const [showDeleteFormModal, setShowDeleteFormModal] = useState(false);
  const [showPopularTemplatesModal, setShowPopularTemplatesModal] = useState(false);
  const [showImportFormModal, setShowImportFormModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentForm, setCurrentForm] = useState<any>(null);

  const customForms: CustomForm[] = [
    {
      id: '1',
      title: 'Demande de permis de construire',
      description: 'Formulaire personnalisé pour les demandes de permis de construire',
      category: 'Urbanisme',
      fields: 12,
      responses: 45,
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'published',
      isStarred: true
    },
    {
      id: '2',
      title: 'Déclaration d\'activité commerciale',
      description: 'Formulaire pour les déclarations d\'activité commerciale',
      category: 'Commerce',
      fields: 8,
      responses: 23,
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'published',
      isStarred: false
    },
    {
      id: '3',
      title: 'Demande de subvention',
      description: 'Formulaire de demande de subvention pour associations',
      category: 'Associations',
      fields: 15,
      responses: 12,
      createdDate: '2024-01-05',
      lastModified: '2024-01-12',
      status: 'draft',
      isStarred: false
    }
  ];

  const categories = ['all', 'Urbanisme', 'Commerce', 'Associations', 'Social', 'Fiscal'];

  const filteredForms = customForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction de création de formulaire
  const handleCreateForm = () => {
    setShowCreateFormModal(true);
  };

  // Fonction de filtres avancés
  const handleAdvancedFilters = () => {
    setShowFiltersModal(true);
  };

  // Fonction de visualisation de formulaire
  const handleViewForm = (form: any) => {
    setCurrentForm(form);
    setShowViewFormModal(true);
  };

  // Fonction de modification de formulaire
  const handleEditForm = (form: any) => {
    setCurrentForm(form);
    setShowEditFormModal(true);
  };

  // Fonction de duplication de formulaire
  const handleDuplicateForm = (form: any) => {
    setCurrentForm(form);
    setShowDuplicateFormModal(true);
  };

  // Fonction de téléchargement de formulaire
  const handleDownloadForm = (formId: string, formTitle: string) => {
    const fileName = `${formTitle.toLowerCase().replace(/\s+/g, '_')}.json`;
    const content = JSON.stringify({ id: formId, title: formTitle, type: 'formulaire' }, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Fonction de suppression de formulaire
  const handleDeleteForm = (form: any) => {
    setCurrentForm(form);
    setShowDeleteFormModal(true);
  };

  // Fonction de modèles populaires
  const handlePopularTemplates = () => {
    setShowPopularTemplatesModal(true);
  };

  // Fonction d'import de formulaire
  const handleImportForm = () => {
    setShowImportFormModal(true);
  };

  // Fonction de statistiques
  const handleStats = () => {
    setShowStatsModal(true);
  };

  // Fonction d'aide formulaires
  const handleHelp = () => {
    setShowHelpModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bibliothèque de Formulaires</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos formulaires personnalisés
          </p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleCreateForm}
        >
          <Plus className="w-4 h-4" />
          Créer un formulaire
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un formulaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Toutes les catégories' : category}
            </option>
          ))}
        </select>
        <Button 
          variant="outline"
          onClick={handleAdvancedFilters}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grille</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                        <Badge variant="outline">{form.category}</Badge>
                        {form.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <CardTitle className="text-lg">{form.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">{form.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">{form.fields}</span> champs
                      </div>
                      <div>
                        <span className="font-medium">{form.responses}</span> réponses
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Créé le {new Date(form.createdDate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Modifié le {new Date(form.lastModified).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewForm(form)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditForm(form)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateForm(form)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Dupliquer
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadForm(form.id, form.title)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteForm(form)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4 mt-6">
          <div className="space-y-4">
            {filteredForms.map((form) => (
              <Card key={form.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{form.title}</h3>
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                        <Badge variant="outline">{form.category}</Badge>
                        {form.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <p className="text-gray-600 mb-2">{form.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{form.fields} champs</span>
                        <span>{form.responses} réponses</span>
                        <span>Modifié le {new Date(form.lastModified).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewForm(form)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditForm(form)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateForm(form)}
                      >
                        <MoreHorizontal className="w-4 h-4 mr-2" />
                        Actions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={handlePopularTemplates}
            >
              <Star className="w-5 h-5" />
              Modèles populaires
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={handleImportForm}
            >
              <Upload className="w-5 h-5" />
              Importer formulaire
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={handleStats}
            >
              <BarChart3 className="w-5 h-5" />
              Statistiques
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={handleHelp}
            >
              <HelpCircle className="w-5 h-5" />
              Aide
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modale de création de formulaire */}
      {showCreateFormModal && (
        <DocumentViewerModal
          isOpen={showCreateFormModal}
          onClose={() => setShowCreateFormModal(false)}
          document={{
            title: "Créer un nouveau formulaire",
            content: "Interface de création de formulaire - Définissez les champs, la validation et la logique métier de votre formulaire personnalisé."
          }}
        />
      )}

      {/* Modale de filtres avancés */}
      {showFiltersModal && (
        <DocumentViewerModal
          isOpen={showFiltersModal}
          onClose={() => setShowFiltersModal(false)}
          document={{
            title: "Filtres avancés",
            content: "Interface de filtres avancés - Filtrez vos formulaires par catégorie, date, auteur, statut et autres critères."
          }}
        />
      )}

      {/* Modale de visualisation de formulaire */}
      {showViewFormModal && currentForm && (
        <DocumentViewerModal
          isOpen={showViewFormModal}
          onClose={() => setShowViewFormModal(false)}
          document={{
            title: `Formulaire: ${currentForm.title}`,
            content: `Visualisation du formulaire: ${currentForm.title}\n\nCatégorie: ${currentForm.category}\nStatut: ${currentForm.status}\n\nInterface de visualisation complète du formulaire.`
          }}
        />
      )}

      {/* Modale de modification de formulaire */}
      {showEditFormModal && currentForm && (
        <DocumentViewerModal
          isOpen={showEditFormModal}
          onClose={() => setShowEditFormModal(false)}
          document={{
            title: `Modifier: ${currentForm.title}`,
            content: `Interface de modification du formulaire: ${currentForm.title}\n\nÉditez les champs, la validation et la configuration du formulaire.`
          }}
        />
      )}

      {/* Modale de duplication de formulaire */}
      {showDuplicateFormModal && currentForm && (
        <DocumentViewerModal
          isOpen={showDuplicateFormModal}
          onClose={() => setShowDuplicateFormModal(false)}
          document={{
            title: `Dupliquer: ${currentForm.title}`,
            content: `Interface de duplication du formulaire: ${currentForm.title}\n\nCréez une copie du formulaire avec un nouveau nom et des modifications.`
          }}
        />
      )}

      {/* Modale de suppression de formulaire */}
      {showDeleteFormModal && currentForm && (
        <DocumentViewerModal
          isOpen={showDeleteFormModal}
          onClose={() => setShowDeleteFormModal(false)}
          document={{
            title: `Supprimer: ${currentForm.title}`,
            content: `Confirmation de suppression du formulaire: ${currentForm.title}\n\nÊtes-vous sûr de vouloir supprimer ce formulaire ? Cette action est irréversible.`
          }}
        />
      )}

      {/* Modale de modèles populaires */}
      {showPopularTemplatesModal && (
        <DocumentViewerModal
          isOpen={showPopularTemplatesModal}
          onClose={() => setShowPopularTemplatesModal(false)}
          document={{
            title: "Modèles populaires",
            content: "Interface des modèles populaires - Consultez et utilisez les modèles de formulaires les plus utilisés par la communauté."
          }}
        />
      )}

      {/* Modale d'import de formulaire */}
      {showImportFormModal && (
        <DocumentViewerModal
          isOpen={showImportFormModal}
          onClose={() => setShowImportFormModal(false)}
          document={{
            title: "Importer un formulaire",
            content: "Interface d'import de formulaire - Importez un formulaire externe depuis un fichier JSON ou depuis une URL."
          }}
        />
      )}

      {/* Modale de statistiques */}
      {showStatsModal && (
        <DocumentViewerModal
          isOpen={showStatsModal}
          onClose={() => setShowStatsModal(false)}
          document={{
            title: "Statistiques des formulaires",
            content: "Interface des statistiques - Visualisez les métriques d'utilisation, les performances et les tendances de vos formulaires."
          }}
        />
      )}

      {/* Modale d'aide formulaires */}
      {showHelpModal && (
        <DocumentViewerModal
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
          document={{
            title: "Aide pour les formulaires",
            content: "Guide d'aide pour les formulaires - Documentation complète sur la création, la gestion et l'utilisation des formulaires personnalisés."
          }}
        />
      )}
    </div>
  );
}