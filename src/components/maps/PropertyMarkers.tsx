import { AdvancedMarkerElement } from '@googlemaps/markerwithlabel';
import './PropertyMarkers.css';

interface Property {
  address: string;
  description: string;
  price: string;
  type: 'apartment' | 'house' | 'land';
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  position: {
    lat: number;
    lng: number;
  };
}

const buildMarkerContent = (property: Property) => {
  const content = document.createElement('div');
  content.classList.add('property', property.type);

  const iconUrl = property.type === 'apartment' 
    ? '/icons/apartment.png'
    : property.type === 'house'
    ? '/icons/house.png'
    : '/icons/land.png';

  content.innerHTML = `
    <div class="icon">
      <img src="${iconUrl}" alt="${property.type}" />
    </div>
    <div class="details">
      <div class="price">${property.price}</div>
      <div class="address">${property.address}</div>
      <div class="features">
        ${property.type !== 'land' ? `
          <div>
            <i class="fas fa-ruler"></i>
            <span>${property.surface} m²</span>
          </div>
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
        ` : `
          <div>
            <i class="fas fa-ruler"></i>
            <span>${property.surface} m²</span>
          </div>
        `}
      </div>
    </div>
  `;

  return content;
};

export const createPropertyMarkers = (map: google.maps.Map, properties: Property[]) => {
  const markers: AdvancedMarkerElement[] = [];

  for (const property of properties) {
    const marker = new AdvancedMarkerElement({
      map,
      content: buildMarkerContent(property),
      position: property.position,
      title: property.description,
    });

    marker.addListener('click', () => {
      toggleHighlight(marker);
    });

    markers.push(marker);
  }

  return markers;
};

const toggleHighlight = (markerView: AdvancedMarkerElement) => {
  const content = markerView.content as HTMLElement;
  if (content.classList.contains('highlight')) {
    content.classList.remove('highlight');
    markerView.zIndex = undefined;
  } else {
    content.classList.add('highlight');
    markerView.zIndex = 1;
  }
};
