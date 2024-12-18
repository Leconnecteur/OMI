import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';

export interface FilterValues {
  type: string;
  rooms?: string;
  bedrooms?: string;
  isViabilise?: boolean;
  priceRange: {
    min: string | number;
    max: string | number;
  };
  city: string;
}

const initialFilterState: FilterValues = {
  type: '',
  rooms: undefined,
  bedrooms: undefined,
  isViabilise: undefined,
  priceRange: { min: '', max: '' },
  city: ''
};

interface MapFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  initialValues: FilterValues;
}

const MapFilters: React.FC<MapFiltersProps> = ({ onFilterChange, initialValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(initialValues);

  const handleFilterChange = useCallback((key: keyof FilterValues, value: any) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [key]: value };
      if (key === 'type') {
        newFilters.rooms = undefined;
        newFilters.bedrooms = undefined;
        newFilters.isViabilise = undefined;
      }
      return newFilters;
    });
  }, []);

  // Utiliser useCallback pour mémoriser la fonction
  const clearFilters = useCallback(() => {
    try {
      // Créer une nouvelle référence d'objet pour les filtres réinitialisés
      const clearedFilters = { ...initialFilterState };
      
      // Mettre à jour l'état local
      setFilters(clearedFilters);
      
      // Notifier le parent du changement
      onFilterChange(clearedFilters);
      
      // Optionnellement, fermer le panneau des filtres
      setIsOpen(false);
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des filtres:', error);
    }
  }, [onFilterChange]);

  // Effet secondaire pour propager les changements au parent
  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const hasActiveFilters = filters.type || 
    filters.priceRange.min || 
    filters.priceRange.max || 
    filters.city ||
    filters.rooms ||
    filters.bedrooms ||
    filters.isViabilise !== undefined;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white text-gray-700 hover:bg-gray-50 rounded-lg shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          <span className="font-medium text-base">Filtres</span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Actifs
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Type de bien</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'apartment', label: 'Appartement' },
                { id: 'house', label: 'Maison' },
                { id: 'land', label: 'Terrain' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleFilterChange('type', id === filters.type ? '' : id)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    filters.type === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filters.type === 'apartment' && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Nombre de pièces</h3>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5+'].map((rooms) => (
                  <button
                    key={rooms}
                    onClick={() => handleFilterChange('rooms', rooms === filters.rooms ? undefined : rooms)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.rooms === rooms
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rooms}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filters.type === 'house' && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Nombre de chambres</h3>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5+'].map((bedrooms) => (
                  <button
                    key={bedrooms}
                    onClick={() => handleFilterChange('bedrooms', bedrooms === filters.bedrooms ? undefined : bedrooms)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      filters.bedrooms === bedrooms
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {bedrooms}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filters.type === 'land' && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Viabilisé</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('isViabilise', filters.isViabilise === true ? undefined : true)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    filters.isViabilise === true
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Oui
                </button>
                <button
                  onClick={() => handleFilterChange('isViabilise', filters.isViabilise === false ? undefined : false)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    filters.isViabilise === false
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Non
                </button>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Prix</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Ville</h3>
            <input
              type="text"
              placeholder="Entrez une ville"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full mt-2 text-red-600 flex items-center justify-center gap-1 text-sm py-2 hover:bg-red-50 rounded-md"
            >
              <X size={16} />
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MapFilters;
