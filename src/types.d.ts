export type Stock = {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}


export type NestChildrenProps = Readonly<{
  children: React.ReactNode
}>


export type MonthlyRevenueRawData = {
  revenue: number;
  date: string;
  revenue_month: number;
}

export type MonthlyRevenueRefinedData = {
  month: string;
  revenue: number;
  monthOnYearGrowthRate: number;
}

export type DataSource = 'remote' | 'local';