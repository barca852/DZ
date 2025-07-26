
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function RecommendationsTab() {
  // S'assurer que le composant se monte correctement
  useEffect(() => {
    console.log('RecommendationsTab mounted');
    return () => {
      console.log('RecommendationsTab unmounted');
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-green-600" />
            Recommandations - Test de Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test de navigation - Cliquez sur Accueil pour tester</p>
        </CardContent>
      </Card>
    </div>
  );
}
