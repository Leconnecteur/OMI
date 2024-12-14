import { Property } from '../types/property';

export interface PropertyStats {
  totalSales: number;
  averagePrice: number;
  averageSaleTime: number;
  totalVolume: number;
  byPropertyType: {
    apartment: number;
    house: number;
    land: number;
  };
  priceEvolution: number;
  averagePriceByType: {
    apartment: number;
    house: number;
    land: number;
  };
  averageNegotiation: number;
}

export function calculatePropertyStats(properties: Property[]): PropertyStats {
  if (!properties.length) {
    return {
      totalSales: 0,
      averagePrice: 0,
      averageSaleTime: 0,
      totalVolume: 0,
      byPropertyType: { apartment: 0, house: 0, land: 0 },
      priceEvolution: 0,
      averagePriceByType: { apartment: 0, house: 0, land: 0 },
      averageNegotiation: 0
    };
  }

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);

  // Filtrer les propriétés des 6 derniers mois
  const recentProperties = properties.filter(p => {
    const saleDate = new Date(p.saleDate);
    return saleDate >= sixMonthsAgo;
  });

  if (!recentProperties.length) {
    return calculatePropertyStats([properties[properties.length - 1]]);
  }

  // Calculer les statistiques par type
  const byType = {
    apartment: 0,
    house: 0,
    land: 0
  };

  const pricesByType = {
    apartment: [] as number[],
    house: [] as number[],
    land: [] as number[]
  };

  let totalVolume = 0;
  let totalSaleTime = 0;
  let propertiesWithSaleTime = 0;
  let totalNegotiationPercentage = 0;
  let propertiesWithNegotiation = 0;
  let propertiesWithPrice = 0;

  // N'utiliser que les propriétés récentes pour les calculs
  recentProperties.forEach(property => {
    const type = property.type.toLowerCase() as keyof typeof byType;
    byType[type]++;
    
    if (property.price) {
      pricesByType[type].push(property.price);
      totalVolume += property.price;
      propertiesWithPrice++;
    }

    // Calcul du délai de vente
    if (property.saleDate && property.firstMandateDate) {
      const saleDate = new Date(property.saleDate);
      const mandateDate = new Date(property.firstMandateDate);
      const saleTime = Math.floor((saleDate.getTime() - mandateDate.getTime()) / (1000 * 60 * 60 * 24));
      if (saleTime >= 0) { // On vérifie que la date de vente est après la date du mandat
        totalSaleTime += saleTime;
        propertiesWithSaleTime++;
      }
    }

    // Calcul du pourcentage de négociation
    if (property.price && property.firstMandatePrice) {
      const negotiationPercentage = ((property.firstMandatePrice - property.price) / property.firstMandatePrice) * 100;
      totalNegotiationPercentage += negotiationPercentage;
      propertiesWithNegotiation++;
    }
  });

  // Calculer les prix moyens par type
  const averagePriceByType = {
    apartment: calculateAverage(pricesByType.apartment),
    house: calculateAverage(pricesByType.house),
    land: calculateAverage(pricesByType.land)
  };

  // Calculer l'évolution des prix
  const priceEvolution = calculatePriceEvolution(recentProperties);

  // Calculer la moyenne de négociation
  const averageNegotiation = propertiesWithNegotiation > 0 
    ? totalNegotiationPercentage / propertiesWithNegotiation 
    : 0;

  // Calculer le délai de vente moyen
  const averageSaleTime = propertiesWithSaleTime > 0
    ? totalSaleTime / propertiesWithSaleTime
    : 0;

  return {
    totalSales: recentProperties.length,
    averagePrice: propertiesWithPrice > 0 ? totalVolume / propertiesWithPrice : 0,
    averageSaleTime,
    totalVolume,
    byPropertyType: byType,
    priceEvolution,
    averagePriceByType,
    averageNegotiation
  };
}

function calculateAverage(numbers: number[]): number {
  if (!numbers.length) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function calculatePriceEvolution(properties: Property[]): number {
  if (properties.length < 2) return 0;

  // Trier les propriétés par date de vente
  const sortedProperties = [...properties].sort((a, b) => {
    return new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime();
  });

  // Diviser en deux périodes
  const midPoint = Math.floor(sortedProperties.length / 2);
  const firstPeriod = sortedProperties.slice(0, midPoint);
  const secondPeriod = sortedProperties.slice(midPoint);

  const firstPeriodAvg = calculateAverage(firstPeriod.map(p => p.price || 0));
  const secondPeriodAvg = calculateAverage(secondPeriod.map(p => p.price || 0));

  if (firstPeriodAvg === 0) return 0;

  return ((secondPeriodAvg - firstPeriodAvg) / firstPeriodAvg) * 100;
}
