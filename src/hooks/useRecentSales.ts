import { useState, useEffect } from 'react';
import { getRecentSales } from '../services/properties';
import { SalesData } from '../types/dashboard';

export function useRecentSales(userId: string | undefined, months = 6) {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSales = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const sales = await getRecentSales(months, userId);
        
        if (!mounted) return;

        const processedSales = sales.reduce((acc: SalesData[], sale) => {
          const month = new Date(sale.saleDate).toLocaleString('fr-FR', { month: 'short' });
          const existingMonth = acc.find(item => item.month === month);
          
          if (existingMonth) {
            existingMonth.sales += 1;
          } else {
            acc.push({ month, sales: 1 });
          }
          return acc;
        }, []);
        
        setSalesData(processedSales);
      } catch (error) {
        if (mounted) {
          setError('Failed to load sales data');
          setSalesData([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSales();

    return () => {
      mounted = false;
    };
  }, [userId, months]);

  return { salesData, loading, error };
}