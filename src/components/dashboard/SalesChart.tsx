import React from 'react';
import { SalesData } from '../../types/dashboard';

interface SalesChartProps {
  data: SalesData[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  const maxSales = Math.max(...data.map(item => item.sales));
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Évolution des ventes
      </h3>
      
      <div className="relative h-64">
        <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-24px)]">
          {data.map((item, index) => (
            <div
              key={item.month}
              className="absolute bottom-0 bg-blue-600 rounded-t-sm transition-all duration-300"
              style={{
                left: `${(index / data.length) * 100}%`,
                width: `${90 / data.length}%`,
                height: `${(item.sales / maxSales) * 100}%`,
              }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-gray-600">
                {item.sales}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
          {data.map(item => (
            <div key={item.month} className="text-center">
              {item.month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;