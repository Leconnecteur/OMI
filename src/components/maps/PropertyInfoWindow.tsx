import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Property } from '../../types/property';

interface PropertyInfoWindowProps {
  property: Property;
  position: google.maps.LatLngLiteral;
  onClose: () => void;
}

const PropertyInfoWindow: React.FC<PropertyInfoWindowProps> = ({ property, position, onClose }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPropertyType = (type: string) => {
    const types = {
      appartement: 'Appartement',
      apartment: 'Appartement',
      maison: 'Maison',
      house: 'Maison',
      terrain: 'Terrain',
      land: 'Terrain',
    };
    return types[type.toLowerCase()] || type;
  };

  const getCondition = (condition: string) => {
    const conditions = {
      // États en anglais
      'new': 'Neuf',
      'like_new': 'Comme neuf',
      'excellent': 'Excellent état',
      'very_good': 'Très bon état',
      'good': 'Bon état',
      'fair': 'État correct',
      'to_refresh': 'À rafraîchir',
      'to_renovate': 'À rénover',
      'renovated': 'Rénové',
      'being_renovated': 'En cours de rénovation',
      'to_restore': 'À restaurer',
      'ruin': 'En ruine',
      // Variations possibles
      'very-good': 'Très bon état',
      'verygood': 'Très bon état',
      'to-renovate': 'À rénover',
      'torenovate': 'À rénover',
      'to-refresh': 'À rafraîchir',
      'torefresh': 'À rafraîchir',
      'to-restore': 'À restaurer',
      'torestore': 'À restaurer',
      // États déjà en français (pour éviter toute transformation)
      'neuf': 'Neuf',
      'comme neuf': 'Comme neuf',
      'excellent état': 'Excellent état',
      'très bon état': 'Très bon état',
      'bon état': 'Bon état',
      'état correct': 'État correct',
      'à rafraîchir': 'À rafraîchir',
      'à rénover': 'À rénover',
      'rénové': 'Rénové',
      'en cours de rénovation': 'En cours de rénovation',
      'à restaurer': 'À restaurer',
      'en ruine': 'En ruine'
    };
    return conditions[condition.toLowerCase()] || condition;
  };

  const getExposure = (exposure: string) => {
    const exposures = {
      // Expositions en anglais
      'north': 'Nord',
      'south': 'Sud',
      'east': 'Est',
      'west': 'Ouest',
      'northeast': 'Nord-Est',
      'northwest': 'Nord-Ouest',
      'southeast': 'Sud-Est',
      'southwest': 'Sud-Ouest',
      // Variations avec tirets
      'north-east': 'Nord-Est',
      'north-west': 'Nord-Ouest',
      'south-east': 'Sud-Est',
      'south-west': 'Sud-Ouest',
      // Expositions déjà en français
      'nord': 'Nord',
      'sud': 'Sud',
      'est': 'Est',
      'ouest': 'Ouest',
      'nord-est': 'Nord-Est',
      'nord-ouest': 'Nord-Ouest',
      'sud-est': 'Sud-Est',
      'sud-ouest': 'Sud-Ouest'
    };
    return exposures[exposure.toLowerCase()] || exposure;
  };

  const getExterior = (exterior: string) => {
    const exteriors = {
      // Extérieurs en anglais
      'garden': 'Jardin',
      'terrace': 'Terrasse',
      'balcony': 'Balcon',
      'parking': 'Parking',
      'garage': 'Garage',
      'courtyard': 'Cour',
      'pool': 'Piscine',
      'swimming_pool': 'Piscine',
      'swimming-pool': 'Piscine',
      // Extérieurs déjà en français
      'jardin': 'Jardin',
      'terrasse': 'Terrasse',
      'balcon': 'Balcon',
      'cour': 'Cour',
      'piscine': 'Piscine'
    };
    return exteriors[exterior.toLowerCase()] || exterior;
  };

  return (
    <InfoWindow 
      position={position} 
      onCloseClick={onClose}
      options={{
        maxWidth: window.innerWidth < 768 ? window.innerWidth - 32 : 400,
        pixelOffset: new window.google.maps.Size(0, -30)
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg" style={{ maxWidth: '100%' }}>
        {property.images && property.images.length > 0 && (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-32 sm:h-48 object-cover"
          />
        )}
        <div className="p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2 sm:mb-3">
            <h3 className="font-semibold text-base sm:text-lg">{property.title}</h3>
            <span className="bg-[#B87D42] text-white px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
              {getPropertyType(property.type)}
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-[#B87D42] mb-2 sm:mb-3">
            {formatPrice(property.price)}
          </div>

          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <p className="text-gray-700">{property.address}</p>
            {property.city && (
              <p className="text-gray-700">
                <span className="font-medium">Ville :</span> {property.city}
              </p>
            )}
            {property.district && (
              <p className="text-gray-700">
                <span className="font-medium">Quartier :</span> {property.district}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 sm:my-3 text-xs sm:text-sm">
            <div className="flex items-center">
              <span className="mr-1 sm:mr-2">📏</span>
              <span className="font-medium">Surface :</span> {property.surface} m²
            </div>
            {property.rooms && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🚪</span>
                <span className="font-medium">Pièces :</span> {property.rooms}
              </div>
            )}
            {property.bedrooms && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🛏️</span>
                <span className="font-medium">Ch. :</span> {property.bedrooms}
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🚿</span>
                <span className="font-medium">SdB :</span> {property.bathrooms}
              </div>
            )}
            {property.floor !== undefined && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🏢</span>
                <span className="font-medium">Étage :</span> {property.floor}
              </div>
            )}
            {property.exterior && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">🌳</span>
                <span className="font-medium">Ext. :</span> {getExterior(property.exterior)}
              </div>
            )}
            {property.exposure && (
              <div className="flex items-center">
                <span className="mr-1 sm:mr-2">☀️</span>
                <span className="font-medium">Expo. :</span> {getExposure(property.exposure)}
              </div>
            )}
          </div>

          {property.condition && (
            <div className="text-xs sm:text-sm text-gray-700 mt-2">
              <span className="font-medium">État :</span> {getCondition(property.condition)}
            </div>
          )}

          {property.description && (
            <div className="mt-2 sm:mt-3">
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                {property.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </InfoWindow>
  );
};

export default PropertyInfoWindow;
