import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Property } from '../types/property';
import { useAuth } from './useAuth';

export function useUserProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserProperties() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Récupérer toutes les propriétés pour la carte
        const q = query(
          collection(db, 'properties'),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const userProperties = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || null
        })) as Property[];

        console.log('Properties fetched:', userProperties.length);
        setProperties(userProperties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProperties();
  }, [user]);

  return { properties, loading, error };
}
