import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DashboardErrorProps {
  message?: string;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ 
  message = 'An error occurred while loading the dashboard data. Please try again later.'
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
      <div>
        <h3 className="text-sm font-medium text-red-800">Error Loading Dashboard</h3>
        <p className="mt-1 text-sm text-red-700">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default DashboardError;