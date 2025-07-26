
import React from 'react';
// import { TabFormField } from '@/components/common/TabFormField';
// import { EnhancedContextualRecommendations } from './EnhancedContextualRecommendations';

export function RecommendationsTab() {
  return (
    <div className="space-y-6">
      {/* TabFormField temporairement supprimé pour test */}
      {/* <TabFormField
        placeholder="Explorer les recommandations contextuelles..."
        onSearch={(query) => console.log('Recherche recommandations:', query)}
        onAdd={() => console.log('Nouvelle recommandation')}
        onFilter={() => console.log('Filtrer recommandations')}
        onSort={() => console.log('Trier recommandations')}
        onExport={() => console.log('Exporter recommandations')}
        onRefresh={() => console.log('Actualiser recommandations')}
        showActions={true}
      /> */}
      
      {/* EnhancedContextualRecommendations temporairement supprimé pour test */}
      {/* <EnhancedContextualRecommendations /> */}
      
      <div className="text-center py-8">
        <p>Test de navigation - Onglet Recommandations simplifié</p>
      </div>
    </div>
  );
}
