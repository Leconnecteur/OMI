import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { AlertCircle } from 'lucide-react';

const SalesMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Carte des ventes
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-12rem)] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Erreur de chargement de la carte
              </h3>
              <p className="text-sm text-red-600">
                Impossible d'afficher la carte. Veuillez vérifier les paramètres de partage de la carte Google Maps.
              </p>
            </div>
          </div>
        ) : (
          <iframe 
            src="https://www.google.com/maps/d/u/1/embed?mid=1LMRSSJ3aDhxiLnUqgXXm8dyke_BSdf0&ehbc=2E312F&noprof=1"
            className="w-full h-full border-0"
            title="Carte des ventes immobilières"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalesMap;