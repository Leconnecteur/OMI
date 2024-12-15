import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { usePropertyStats } from '../hooks/usePropertyStats';
import { Building2, Euro, LineChart, ArrowRightLeft, SquareEqual } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import PropertyTypeBreakdown from '../components/dashboard/PropertyTypeBreakdown';
import TopCities from '../components/dashboard/TopCities';

export default function Dashboard() {
  const { stats, loading, error } = usePropertyStats();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur : </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!stats || stats.totalProperties === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
          <div className="text-gray-600 text-center">
            <h2 className="text-xl font-semibold mb-2">Aucune donnée disponible</h2>
            <p className="text-gray-500">Commencez par ajouter des biens immobiliers pour voir les statistiques.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#4A4238]">
          Tableau de bord
        </h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Total des biens"
            value={stats.totalProperties.toString()}
            icon={Building2}
          />
          <DashboardCard
            title="Prix moyen"
            value={stats.averagePrice.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR',
              maximumFractionDigits: 0
            })}
            icon={Euro}
          />
          <DashboardCard
            title="Volume total"
            value={stats.totalVolume.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR',
              maximumFractionDigits: 0
            })}
            icon={LineChart}
          />
          <DashboardCard
            title="Prix moyen/m²"
            value={stats.pricePerSqm.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR',
              maximumFractionDigits: 0
            })}
            icon={SquareEqual}
          />
          <DashboardCard
            title="Négociation moyenne"
            value={`${stats.averageNegotiation.toFixed(1)}%`}
            icon={ArrowRightLeft}
          />
          <PropertyTypeBreakdown breakdownString={stats.propertyTypeBreakdown} />
          <TopCities cities={stats.topCities} />
        </div>
      </div>
    </DashboardLayout>
  );
}