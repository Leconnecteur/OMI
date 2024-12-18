// Icônes SVG encodées en base64 pour les marqueurs
export const mapIcons = {
  house: `data:image/svg+xml;base64,${btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="#4A4238" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)}`,
  
  apartment: `data:image/svg+xml;base64,${btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 21H17M7 21V7C7 5.89543 7.89543 5 9 5H15C16.1046 5 17 5.89543 17 7V21M7 21H5M17 21H19M10 8H14M10 12H14M10 16H14" stroke="#4A4238" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)}`,
  
  land: `data:image/svg+xml;base64,${btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M6 17L12 11L16 15M16 15L21 10M16 15L18 17" stroke="#4A4238" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)}`,
};

// Fonction pour créer la configuration des marqueurs
export const createMarkerConfig = (google: any) => {
  const configs = {
    house: new google.maps.marker.PinElement({
      glyph: mapIcons.house,
      background: "#FFFFFF",
      borderColor: "#4A4238",
      glyphColor: "#4A4238",
    }),
    apartment: new google.maps.marker.PinElement({
      glyph: mapIcons.apartment,
      background: "#FFFFFF",
      borderColor: "#4A4238",
      glyphColor: "#4A4238",
    }),
    land: new google.maps.marker.PinElement({
      glyph: mapIcons.land,
      background: "#FFFFFF",
      borderColor: "#4A4238",
      glyphColor: "#4A4238",
    })
  };

  return configs;
};
