import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PropertySearchComponent from '../components/dashboard/PropertySearch';

export default function PropertySearch() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Recherche de biens
      </h1>
      <PropertySearchComponent />
    </DashboardLayout>
  );
}
