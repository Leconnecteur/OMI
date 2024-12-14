import React from 'react';
import { Clock } from 'lucide-react';

const IndexBuildingNotice: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <Clock className="h-6 w-6 text-blue-500" />
        <h3 className="text-lg font-medium text-blue-900">
          Preparing Your Dashboard
        </h3>
      </div>
      <p className="mt-2 text-sm text-blue-700">
        We're setting up your data for the first time. This process usually takes 1-2 minutes.
        The dashboard will automatically update once ready.
      </p>
      <div className="mt-4">
        <div className="h-1 w-full bg-blue-100 rounded-full overflow-hidden">
          <div className="h-1 bg-blue-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default IndexBuildingNotice;