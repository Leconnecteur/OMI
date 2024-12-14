export interface DashboardStats {
  currentMonthSales: number;
  salesTrend: number;
  previousMonthSales?: number;
}

export interface SalesData {
  month: string;
  sales: number;
}