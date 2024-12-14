import React from 'react';
import StatsList from './stats/StatsList';
import SalesChart from './SalesChart';
import { DashboardStats } from '../../types/dashboard';
import { SalesData } from '../../types/dashboard';

interface DashboardMetricsProps {
  stats: DashboardStats;
  salesData: SalesData[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ stats, salesData }) => {
  return (
    <div className="space-y-6">
      <StatsList stats={stats} />
      <div className="grid grid-cols-1 gap-6">
        <SalesChart data={salesData} />
      </div>
    </div>
  );
};

export default DashboardMetrics;