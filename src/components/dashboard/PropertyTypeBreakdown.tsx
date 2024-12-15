import React from 'react';
import { PieChart } from 'lucide-react';

interface PropertyTypeData {
  type: string;
  percentage: number;
  displayName: string;
}

interface PropertyTypeBreakdownProps {
  breakdownString: string;
}

export default function PropertyTypeBreakdown({ breakdownString }: PropertyTypeBreakdownProps) {
  const parseBreakdown = (str: string): PropertyTypeData[] => {
    if (str === 'N/A') return [];
    
    const typeMap: { [key: string]: string } = {
      'Apartment': 'Appartement',
      'House': 'Maison',
      'Land': 'Terrain'
    };
    
    return str.split(' / ').map(item => {
      const [type, percentStr] = item.split(' ');
      const percent = parseInt(percentStr);
      
      return {
        type,
        percentage: percent,
        displayName: typeMap[type] || type
      };
    });
  };

  const data = parseBreakdown(breakdownString);

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Répartition</h3>
          <PieChart className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-gray-400 text-center">Aucune donnée</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">Répartition</h3>
        <PieChart className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#4A4238]">{item.displayName}</span>
              <span className="text-sm font-semibold text-[#4A4238]">{item.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out bg-[#4A4238]"
                style={{
                  width: `${item.percentage}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
