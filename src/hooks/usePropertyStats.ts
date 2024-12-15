import { useEffect, useState } from 'react';
import { calculateStats, Stats } from '../services/stats';
import { useProperties } from './useProperties';

export function usePropertyStats() {
  const { properties, loading, error } = useProperties();
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    averagePrice: 0,
    totalVolume: 0,
    averageNegotiation: 0,
    pricePerSqm: 0,
    propertyTypeBreakdown: 'N/A',
    topCities: []
  });

  useEffect(() => {
    if (!loading && !error && properties.length > 0) {
      const calculatedStats = calculateStats(properties);
      setStats(calculatedStats);
    }
  }, [properties, loading, error]);

  return { stats, loading, error };
}