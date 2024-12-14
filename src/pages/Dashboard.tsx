import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#4A4238]">
          Tableau de bord
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Statistiques */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total des biens</h3>
            <p className="text-2xl font-semibold text-[#4A4238]">-</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Prix moyen</h3>
            <p className="text-2xl font-semibold text-[#4A4238]">-</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Transactions</h3>
            <p className="text-2xl font-semibold text-[#4A4238]">-</p>
          </div>
        </div>

        {/* Message quota */}
        <div className="bg-[#4A4238]/5 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-[#4A4238]/10">
          <p className="text-[#4A4238] text-center text-sm sm:text-base">
            Le quota de la base de données a été dépassé. Veuillez réessayer plus tard ou contacter l'administrateur pour plus d'informations.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}