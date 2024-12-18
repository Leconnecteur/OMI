import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  GoogleMap, 
  useLoadScript,
  MarkerF
} from '@react-google-maps/api';
import { useUserProperties } from '../../hooks/useUserProperties';
import { Property } from '../../types/property';
import PropertyInfoWindow from './PropertyInfoWindow';
import MapFilters, { FilterValues } from './MapFilters';
import './PropertyMarkers.css';

// Styles pour la carte
const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 80px)',
};

// Centre initial de la carte (France)
const center = {
  lat: 46.603354,
  lng: 1.888334,
};

// Options de la carte
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapId: "44eff20ba27ef34c",
  gestureHandling: 'greedy', // Permet le zoom de la carte sans interférer avec la page
};

// Bibliothèques Google Maps nécessaires
const libraries: ("places" | "geometry" | "drawing" | "visualization" | "marker")[] = ["places", "marker"];

const initialFilters: FilterValues = {
  type: '',
  rooms: undefined,
  bedrooms: undefined,
  isViabilise: undefined,
  priceRange: { min: '', max: '' },
  city: ''
};

// Mapping des types en français
const TYPE_MAPPING = {
  apartment: 'appartement',
  house: 'maison',
  land: 'terrain'
} as const;

// Définition des icônes SVG
const PROPERTY_ICONS = {
  apartment: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zm-5-3V4h3v4h3v3h-9V8h3zm-5 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V6h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm6 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
  </svg>`,
  house: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z"/>
  </svg>`,
  land: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2L2 19h20L12 2zm0 4l6.31 12H5.69L12 6z"/>
  </svg>`
};

export default function InteractiveMap() {
  const { properties, loading: propertiesLoading } = useUserProperties();
  const [markers, setMarkers] = useState<Array<{ position: google.maps.LatLngLiteral; property: Property }>>([]);
  const [selectedProperty, setSelectedProperty] = useState<{ position: google.maps.LatLngLiteral; property: Property } | null>(null);
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [advancedMarkers, setAdvancedMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const createHTMLMarker = useCallback((property: Property) => {
    const markerDiv = document.createElement('div');
    const type = property.type.toLowerCase();
    const frenchType = TYPE_MAPPING[type as keyof typeof TYPE_MAPPING];
    
    // Créer la structure HTML du marqueur
    markerDiv.className = `property ${frenchType}`;
    markerDiv.innerHTML = `
      <div class="icon">
        ${PROPERTY_ICONS[type] || PROPERTY_ICONS.house}
      </div>
      <div class="details">
        <div class="price">${property.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
        <div class="address">${property.address}</div>
        <div class="features">
          <div>
            <i class="fas fa-ruler"></i>
            <span>${property.surface} m²</span>
          </div>
          ${type !== 'land' ? `
            ${property.rooms ? `
              <div>
                <i class="fas fa-door-open"></i>
                <span>${property.rooms} pièces</span>
              </div>
            ` : ''}
            ${property.bedrooms ? `
              <div>
                <i class="fas fa-bed"></i>
                <span>${property.bedrooms} ch.</span>
              </div>
            ` : ''}
            ${property.bathrooms ? `
              <div>
                <i class="fas fa-bath"></i>
                <span>${property.bathrooms} sdb</span>
              </div>
            ` : ''}
          ` : ''}
        </div>
      </div>
    `;

    return markerDiv;
  }, []);

  const updateMarkers = useCallback(() => {
    if (!mapRef || !isLoaded || !markers.length) return;

    // Supprimer les anciens marqueurs
    advancedMarkers.forEach(marker => marker.map = null);

    // Créer les nouveaux marqueurs
    const newMarkers = markers.map(({ position, property }) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef,
        position,
        content: createHTMLMarker(property),
        title: property.address
      });

      marker.addListener('click', () => {
        setSelectedProperty({ position, property });
      });

      return marker;
    });

    setAdvancedMarkers(newMarkers);
  }, [mapRef, isLoaded, markers, createHTMLMarker]);

  // Mettre à jour les marqueurs quand la carte ou les données changent
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  // Cache pour le géocodage
  const geocodeCache = useMemo(() => new Map<string, google.maps.LatLngLiteral>(), []);

  // Géocodage des adresses
  const geocodeAddress = useCallback(async (property: Property) => {
    try {
      if (!isLoaded || !window.google) {
        console.error('Google Maps API non chargée');
        return null;
      }

      if (!property.address || !property.city) {
        console.warn('Adresse ou ville manquante pour la propriété:', property);
        return null;
      }

      // Création d'une clé unique pour le cache
      const cacheKey = `${property.address}-${property.city}`.toLowerCase().trim();
      
      // Vérifier le cache
      if (geocodeCache.has(cacheKey)) {
        const position = geocodeCache.get(cacheKey)!;
        return { position, property };
      }

      // Nettoyage et normalisation de l'adresse
      const cleanAddress = (address: string) => {
        return address
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/\s*,\s*/g, ',')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      const address = cleanAddress(`${property.address}, ${property.city}, France`);
      const geocoder = new window.google.maps.Geocoder();

      const result = await geocoder.geocode({
        address,
        region: 'fr',
        language: 'fr'
      });

      if (!result.results || result.results.length === 0) {
        console.warn(`Aucun résultat trouvé pour l'adresse: ${address}`);
        return null;
      }

      const location = result.results[0].geometry.location;
      const position = {
        lat: location.lat(),
        lng: location.lng(),
      };

      // Vérifier si la position est en France
      if (position.lat >= 41 && position.lat <= 51 && 
          position.lng >= -5 && position.lng <= 10) {
        
        // Mettre en cache le résultat
        geocodeCache.set(cacheKey, position);
        console.log(`Géocodage réussi pour: ${address}`);
        return { position, property };
      } else {
        console.warn(`Position hors de France pour: ${address}`, position);
        return null;
      }

    } catch (error) {
      console.error('Erreur lors du géocodage de:', property.address, error);
      return null;
    }
  }, [isLoaded, geocodeCache]);

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.type === 'apartment' && filters.rooms && property.rooms !== filters.rooms) return false;
      if (filters.type === 'house' && filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
      if (filters.type === 'land' && filters.isViabilise !== undefined && property.isViabilise !== filters.isViabilise) return false;
      if (filters.priceRange.min && property.price < Number(filters.priceRange.min)) return false;
      if (filters.priceRange.max && property.price > Number(filters.priceRange.max)) return false;
      if (filters.city && property.city.toLowerCase().trim() !== filters.city.toLowerCase().trim()) return false;
      return true;
    });
  }, [filters, properties]);

  // Mise à jour des marqueurs par lots
  useEffect(() => {
    let isMounted = true;

    if (!filteredProperties || !isLoaded) {
      console.log('En attente du chargement...');
      return;
    }

    console.log('Début du géocodage pour', filteredProperties.length, 'propriétés');
    
    // Réinitialiser les marqueurs avant de commencer
    setMarkers([]);

    const updateMarkers = async () => {
      const allResults: Array<{ position: google.maps.LatLngLiteral; property: Property }> = [];
      
      try {
        // Traiter toutes les propriétés en une seule fois
        const allPromises = filteredProperties.map(async (property) => {
          try {
            return await geocodeAddress(property);
          } catch (error) {
            console.error(`Erreur lors du géocodage de ${property.address}:`, error);
            return null;
          }
        });

        const results = await Promise.all(allPromises);
        const validResults = results.filter(
          (marker): marker is NonNullable<typeof marker> => marker !== null
        );
        
        if (isMounted) {
          console.log(`Mise à jour des marqueurs: ${validResults.length} marqueurs`);
          setMarkers(validResults);
        }

        console.log(`Géocodage terminé: ${validResults.length}/${filteredProperties.length} adresses géocodées avec succès`);
      } catch (error) {
        console.error('Erreur lors du géocodage:', error);
      }
    };

    updateMarkers();

    return () => {
      isMounted = false;
    };
  }, [filteredProperties, geocodeAddress, isLoaded]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Erreur de chargement de Google Maps
          </h3>
          <p className="text-sm text-red-600">
            {loadError.message}
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded || propertiesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4238]"></div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div style={mapContainerStyle}>
        <GoogleMap
          zoom={6}
          center={center}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={options}
          onClick={() => setSelectedProperty(null)}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <MarkerF
              key={marker.property.id}
              position={marker.position}
            />
          ))}
          {selectedProperty && (
            <PropertyInfoWindow
              property={selectedProperty.property}
              position={selectedProperty.position}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </GoogleMap>
      </div>
      
      {/* Filtres - Desktop: en bas à gauche, Mobile: en bas fixe */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 z-10">
        <div className="bg-white shadow-lg rounded-lg md:bg-opacity-95">
          <MapFilters
            onFilterChange={handleFilterChange}
            initialValues={filters}
          />
        </div>
      </div>
    </div>
  );
}
