import React, { useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import InteractiveMap from '../components/maps/InteractiveMap';

const SalesMap = () => {
  useEffect(() => {
    // Désactiver le zoom de la page uniquement sur la page de la carte
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-8">
        Carte des ventes
      </h1>
      
      <div className="space-y-4 md:space-y-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
          <InteractiveMap />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesMap;