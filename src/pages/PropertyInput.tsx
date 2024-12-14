import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PropertyForm from '../components/dashboard/PropertyForm';

export default function PropertyInput() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Saisie des données
      </h1>
      <PropertyForm />
    </DashboardLayout>
  );
}