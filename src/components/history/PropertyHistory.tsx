import React, { useState } from 'react';
import useUserProperties from '../../hooks/useUserProperties';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const PropertyHistory: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const { properties, loading, error } = useUserProperties();

  const months = [...new Set(properties?.map(prop => {
    const date = prop.saleDate?.toDate?.() || new Date();
    return format(date, 'MMMM yyyy', { locale: fr });
  }))].sort((a, b) => {
    const dateA = new Date(a.split(' ')[1], fr.months.indexOf(a.split(' ')[0]));
    const dateB = new Date(b.split(' ')[1], fr.months.indexOf(b.split(' ')[0]));
    return dateB.getTime() - dateA.getTime();
  });

  const filteredProperties = selectedMonth
    ? properties?.filter(prop => {
        const date = prop.saleDate?.toDate?.() || new Date();
        return format(date, 'MMMM yyyy', { locale: fr }) === selectedMonth;
      })
    : properties;

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue: {error}</div>;
  if (!properties?.length) return <div>Aucun bien immobilier trouvé dans votre historique.</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4A4238] focus:border-[#4A4238]"
        >
          <option value="">Tous les mois</option>
          {months.map(month => (
            <option key={month} value={month}>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredProperties?.map((property, index) => {
          const saleDate = property.saleDate?.toDate?.() || new Date();
          
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {property.type === 'house' ? 'Maison' : 
                     property.type === 'apartment' ? 'Appartement' : 'Terrain'}
                    {property.typology && ` - ${property.typology}`}
                  </h3>
                  <p className="text-gray-600">{property.address}</p>
                  <p className="text-gray-600">{property.city}</p>
                </div>

                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Date de vente:</span>{' '}
                    {format(saleDate, 'dd MMMM yyyy', { locale: fr })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Prix:</span>{' '}
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
                      .format(property.price)}
                  </p>
                  {property.surface && (
                    <p className="text-gray-600">
                      <span className="font-medium">Surface:</span>{' '}
                      {property.surface} m²
                    </p>
                  )}
                </div>

                {property.type !== 'land' && (
                  <div>
                    {property.condition && (
                      <p className="text-gray-600">
                        <span className="font-medium">État:</span>{' '}
                        {property.condition === 'new' ? 'Neuf' :
                         property.condition === 'good' ? 'Bon état' :
                         property.condition === 'to-renovate' ? 'À rénover' : property.condition}
                      </p>
                    )}
                    {property.constructionYear && (
                      <p className="text-gray-600">
                        <span className="font-medium">Année de construction:</span>{' '}
                        {property.constructionYear}
                      </p>
                    )}
                    {property.parkingSpots > 0 && (
                      <p className="text-gray-600">
                        <span className="font-medium">Parking:</span>{' '}
                        {property.parkingSpots}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyHistory;
