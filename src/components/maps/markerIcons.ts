export const markerIcons = {
  appartement: {
    url: '/icons/apartment.svg',
    scaledSize: { width: 32, height: 32 }
  },
  maison: {
    url: '/icons/house.svg',
    scaledSize: { width: 32, height: 32 }
  },
  terrain: {
    url: '/icons/land.svg',
    scaledSize: { width: 32, height: 32 }
  },
  default: {
    url: '/icons/default.svg',
    scaledSize: { width: 32, height: 32 }
  }
};

export const getMarkerIcon = (propertyType: string) => {
  const type = propertyType.toLowerCase();
  return markerIcons[type as keyof typeof markerIcons] || markerIcons.default;
};
