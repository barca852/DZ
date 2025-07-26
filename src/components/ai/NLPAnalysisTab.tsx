
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export function NLPAnalysisTab() {
  // S'assurer que le composant se monte correctement
  useEffect(() => {
    console.log('NLPAnalysisTab mounted');
    return () => {
      console.log('NLPAnalysisTab unmounted');
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            NLP Avancé - Test de Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test de navigation - Cliquez sur Accueil pour tester</p>
        </CardContent>
      </Card>
    </div>
  );
}
