import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PropertyManagement from './PropertyManagement';

const PropertyPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PropertyManagement />
    </DashboardLayout>
  );
};

export default PropertyPage;
