"use client"
import StockTitle from "@/components/stock-title";
import { MonthlyRevenueRawData, MonthlyRevenueRefinedData } from "@/types";
import { getMonthlyRevenue } from "@/utils/fetch";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import MonthlyRevenueChart from "./chart";
import MonthlyRevenueTable from "./table";

/**
 * 月入和增长率組件屬性
 */
type MonthlyRevenueProps = {
  /** 股票id */
  stockId: string;
}

/**
 * 提煉月入和增长率的數據，
 * 調整財報月份，
 * 計算每個月相對與前一年同月的增長率
 * @param data 原始數據
 * @returns 
 */
function refineMonthlyRevenue(data: MonthlyRevenueRawData[]) {
  const refinedData: MonthlyRevenueRefinedData[] = [];
  for (let i = 12; i < data.length; i++) {
    const item = data[i];
    const month = item.revenue_month;
    // 财报发布年份
    let year = Number(item.date.slice(0, 4));
    // 12月的财报时次年一月发布
    if (month === 12) {
      year -= 1
    }
    const aYearPrevRevenue = data[i - 12].revenue;
    const aYearGrowthRate = Number(((item.revenue - aYearPrevRevenue) / aYearPrevRevenue * 100).toFixed(2));
    refinedData.push({
      month: `${year}-${month}`,
      revenue: item.revenue,
      monthOnYearGrowthRate: aYearGrowthRate,
    })
  }
  return refinedData;
}

/**
 * 根據年數，獲取開始日期和結束日期
 * @param yearRange 年數
 * @returns 
 */
function resolveYearRange(yearRange: number) {
  const now = new Date();
  const endDate = now.toISOString().slice(0, 10);
  const start = now.setFullYear(now.getFullYear() - yearRange);
  const startDate = new Date(start).toISOString().slice(0, 10);
  return { startDate, endDate };

}

/**
 * 使用提煉好的月入和增长率數據
 * @param stockId 股票id
 * @param yearRange 年份範圍
 * @returns 
 */
function useSearchMonthlyRevenue(stockId: string, yearRange: number) {
  const [revenueList, setRevenueList] = useState<MonthlyRevenueRefinedData[]>([]);
  const [message, setMessage] = useState('加載中...');
  useEffect(() => {
    const { startDate, endDate } = resolveYearRange(yearRange);
    const req = getMonthlyRevenue(stockId, startDate, endDate);
    req.promise.then(res => {
      if (res.err) {
        setMessage('請求數據失敗');
      } else if (!res.data || !res.data.length) {
        setMessage('未找到相關數據');
      } else {
        setRevenueList(refineMonthlyRevenue(res.data));
        setMessage('');
      }
    })
  }, [stockId, yearRange])
  return { revenueList, message };
}


/**
 * 月入和增長率組件
 * @param props 
 * @returns 
 */
export default function MonthlyRevenue(props: MonthlyRevenueProps) {
  const { stockId } = props;
  const [yearRange, setYearRange] = useState(5);
  // 要算每月的年增率，需要上一年的数据
  const { revenueList, message } = useSearchMonthlyRevenue(stockId, yearRange + 1);


  return <Box sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <StockTitle stockId={stockId} />
    <MonthlyRevenueChart yearRange={yearRange} list={revenueList}
      onChangeYearRange={setYearRange} message={message} />
    <MonthlyRevenueTable list={revenueList} message={message} />
  </Box>;
}