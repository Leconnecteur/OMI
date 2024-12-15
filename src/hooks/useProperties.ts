import { useState, useEffect } from 'react';
import { getRecentSales } from '../services/properties';
import { Property } from '../types/property';
import { useAuth } from './useAuth';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProperties() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedProperties = await getRecentSales(12);
        setProperties(fetchedProperties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [user]);

  return { properties, loading, error };
}
