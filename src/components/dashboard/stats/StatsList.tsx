import React from 'react';
import { PropertyStats } from '../../../services/stats';
import { formatPrice, formatNumber } from '../../../utils/format';

interface StatsListProps {
  stats: PropertyStats;
}

const StatsList: React.FC<StatsListProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Statistiques générales */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Volume total des ventes</dt>
                <dd className="text-base sm:text-lg font-medium text-gray-900">{formatPrice(stats.totalVolume)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Délai de vente moyen</dt>
                <dd className="text-base sm:text-lg font-medium text-gray-900">{Math.round(stats.averageSaleTime)} jours</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Évolution des prix</dt>
                <dd className="text-base sm:text-lg font-medium text-gray-900">
                  <span className={stats.priceEvolution >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.priceEvolution >= 0 ? '+' : ''}{stats.priceEvolution.toFixed(1)}%
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Négociation moyenne</dt>
                <dd className="text-base sm:text-lg font-medium text-gray-900">
                  <span className={stats.averageNegotiation >= 0 ? 'text-red-600' : 'text-green-600'}>
                    {stats.averageNegotiation >= 0 ? '+' : ''}{stats.averageNegotiation.toFixed(1)}%
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Prix moyens par type */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Prix moyens par type</h3>
          <dl className="space-y-2">
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Appartements</dt>
              <dd className="text-sm font-medium text-gray-900">{formatPrice(stats.averagePriceByType.apartment)}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Maisons</dt>
              <dd className="text-sm font-medium text-gray-900">{formatPrice(stats.averagePriceByType.house)}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Terrains</dt>
              <dd className="text-sm font-medium text-gray-900">{formatPrice(stats.averagePriceByType.land)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Nombre de ventes par type */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Répartition des ventes</h3>
          <dl className="space-y-2">
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Appartements</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.byPropertyType.apartment}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Maisons</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.byPropertyType.house}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-gray-500">Terrains</dt>
              <dd className="text-sm font-medium text-gray-900">{stats.byPropertyType.land}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Total des ventes */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Nombre total de ventes</dt>
                <dd className="text-base sm:text-lg font-medium text-gray-900">{stats.totalSales}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsList;