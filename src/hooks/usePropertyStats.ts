import { useState, useEffect } from 'react';
import { calculatePropertyStats, PropertyStats } from '../services/stats';
import { getRecentSales } from '../services/properties';

const DEFAULT_STATS: PropertyStats = {
  totalSales: 0,
  averagePrice: 0,
  averageSaleTime: 0,
  totalVolume: 0,
  byPropertyType: { apartment: 0, house: 0, land: 0 },
  priceEvolution: 0,
  averagePriceByType: { apartment: 0, house: 0, land: 0 },
  averageNegotiation: 0
};

export function usePropertyStats(userId: string | undefined) {
  const [stats, setStats] = useState<PropertyStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const properties = await getRecentSales(12, userId);
        const calculatedStats = calculatePropertyStats(properties);
        
        if (mounted) {
          setStats(calculatedStats);
        }
      } catch (error) {
        if (mounted) {
          setError('Impossible de charger les statistiques');
          setStats(DEFAULT_STATS);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { stats, loading, error };
}