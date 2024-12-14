import { useState, useEffect, useCallback } from 'react';
import { DocumentData } from 'firebase/firestore';
import { parseFirebaseError } from '../services/firebase/errors';
import { getCachedData, setCachedData } from '../services/firebase/cache';

interface UseFirestoreQueryResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  isIndexBuilding: boolean;
  refetch: () => Promise<void>;
}

export function useFirestoreQuery<T>(
  queryFn: () => Promise<DocumentData[]>,
  deps: any[] = [],
  options: {
    cacheKey?: string;
    userId?: string;
  } = {}
): UseFirestoreQueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isIndexBuilding, setIsIndexBuilding] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsIndexBuilding(false);

      // Try to get cached data first
      if (options.cacheKey && options.userId) {
        const cachedData = await getCachedData(options.cacheKey, options.userId);
        if (cachedData) {
          setData(cachedData as T[]);
          setLoading(false);
          // Fetch fresh data in background
          queryFn().then((freshData) => {
            setData(freshData as T[]);
            setCachedData(options.cacheKey!, options.userId!, freshData);
          });
          return;
        }
      }

      // If no cache or cache miss, fetch fresh data
      const result = await queryFn();
      setData(result as T[]);

      // Cache the fresh data
      if (options.cacheKey && options.userId) {
        setCachedData(options.cacheKey, options.userId, result);
      }
    } catch (err) {
      const parsedError = parseFirebaseError(err);
      setError(parsedError.message);
      setIsIndexBuilding(parsedError.isIndexError);
    } finally {
      setLoading(false);
    }
  }, [queryFn, options.cacheKey, options.userId]);

  useEffect(() => {
    fetchData();
  }, [...deps, fetchData]);

  return { 
    data, 
    loading, 
    error, 
    isIndexBuilding,
    refetch: fetchData
  };
}