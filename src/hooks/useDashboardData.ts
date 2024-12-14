import { usePropertyStats } from './usePropertyStats';
import { useRecentSales } from './useRecentSales';
import { useFirestoreQuery } from './useFirestoreQuery';
import { getPropertiesQuery } from '../services/firebase/queries';

export function useDashboardData(userId: string | undefined) {
  const { 
    data: properties,
    loading: propertiesLoading,
    error: propertiesError,
    isIndexBuilding
  } = useFirestoreQuery(
    () => getPropertiesQuery(userId || ''),
    [userId]
  );

  const { stats, loading: statsLoading, error: statsError } = usePropertyStats(userId);
  const { salesData, loading: salesLoading, error: salesError } = useRecentSales(userId);

  const error = propertiesError || statsError || salesError;
  const loading = propertiesLoading || statsLoading || salesLoading;

  return {
    stats,
    salesData,
    properties,
    loading,
    error,
    isIndexBuilding
  };
}