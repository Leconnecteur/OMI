import { Property } from '../types/property';

export interface Stats {
  totalProperties: number;
  averagePrice: number;
  totalVolume: number;
  averageNegotiation: number;
  pricePerSqm: number;
  propertyTypeBreakdown: string;
  topCities: Array<{ city: string; count: number }>;
}

export function calculateStats(properties: Property[]): Stats {
  if (!properties.length) {
    return {
      totalProperties: 0,
      averagePrice: 0,
      totalVolume: 0,
      averageNegotiation: 0,
      pricePerSqm: 0,
      propertyTypeBreakdown: 'N/A',
      topCities: []
    };
  }

  // Calcul du nombre total de biens
  const totalProperties = properties.length;

  // Calcul du prix moyen
  const prices = properties.map(p => p.price).filter((price): price is number => price !== undefined && price !== null);
  const averagePrice = calculateAverage(prices);

  // Calcul du volume total
  const totalVolume = prices.reduce((sum, price) => sum + price, 0);

  // Calcul de la négociation moyenne
  const negotiations = properties.map(p => {
    if (!p.price || !p.firstMandatePrice) return null;
    return ((p.firstMandatePrice - p.price) / p.firstMandatePrice) * 100;
  }).filter((neg): neg is number => neg !== null);
  const averageNegotiation = calculateAverage(negotiations);

  // Calcul du prix moyen au m²
  const pricesPerSqm = properties.map(p => {
    if (!p.price || !p.surface) return null;
    return p.price / p.surface;
  }).filter((price): price is number => price !== null);
  const pricePerSqm = Math.round(calculateAverage(pricesPerSqm));

  // Calcul de la répartition par type de bien
  const propertyTypeBreakdown = calculatePropertyTypeBreakdown(properties);

  // Calcul du top 5 des villes
  const topCities = calculateTopCities(properties);

  return {
    totalProperties,
    averagePrice,
    totalVolume,
    averageNegotiation,
    pricePerSqm,
    propertyTypeBreakdown,
    topCities
  };
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

function calculateTopCities(properties: Property[]): Array<{ city: string; count: number }> {
  // Compter les biens par ville
  const cityCounts = new Map<string, number>();
  
  properties.forEach(property => {
    if (property.city) {
      const city = property.city.trim();
      cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
    }
  });

  // Convertir en tableau et trier
  return Array.from(cityCounts.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function calculatePropertyTypeBreakdown(properties: Property[]): string {
  const typeCounts = {
    apartment: 0,
    house: 0,
    land: 0
  };
  
  properties.forEach(property => {
    const type = property.type.toLowerCase();
    if (type in typeCounts) {
      typeCounts[type as keyof typeof typeCounts]++;
    }
  });

  const total = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
  if (total === 0) return 'N/A';
  
  const typePercentages = Object.entries(typeCounts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([type, count]) => {
      const percentage = (count / total * 100).toFixed(0);
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      return `${capitalizedType} ${percentage}%`;
    });

  return typePercentages.join(' / ') || 'N/A';
}
