import { Property } from '../types/property';

export const calculateSalesTrend = (
  currentCount: number, 
  previousCount: number
): number => {
  if (previousCount === 0) {
    return currentCount > 0 ? 100 : 0;
  }
  return ((currentCount - previousCount) / previousCount) * 100;
};

export const countSalesInRange = (
  sales: Property[], 
  startDate: Date, 
  endDate: Date
): number => {
  return sales.filter(sale => {
    const saleDate = new Date(sale.saleDate);
    return saleDate >= startDate && saleDate <= endDate;
  }).length;
};