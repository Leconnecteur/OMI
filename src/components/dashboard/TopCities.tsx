import React from 'react';
import { MapPin } from 'lucide-react';

interface TopCitiesProps {
  cities: Array<{ city: string; count: number }>;
}

export default function TopCities({ cities }: TopCitiesProps) {
  if (cities.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Top 5 Villes</h3>
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-gray-400 text-center">Aucune donnée</p>
      </div>
    );
  }

  const maxCount = Math.max(...cities.map(city => city.count));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">Top 5 Villes</h3>
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {cities.map((city, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#4A4238]">{city.city}</span>
              <span className="text-sm font-semibold text-[#4A4238]">{city.count} bien{city.count > 1 ? 's' : ''}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out bg-[#4A4238]"
                style={{
                  width: `${(city.count / maxCount) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
