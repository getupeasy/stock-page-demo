import { MonthlyRevenueRawData } from "@/types";

const localRevenueMap = new Map<string, MonthlyRevenueRawData[]>();

/**
 * 假造本地的财报数据，總是假造9年的數據，
 * 簡單假設是從現在往前9年。
 * @returns 
 */
function fakeLocalRevenue() {
  const data: MonthlyRevenueRawData[] = [];
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let baseRevenue = Math.round(Math.random() * 100000000000) + 10000000;
  for (let i = 0; i < 108; i++) {
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    let growthRate = Math.random() * 0.2;
    if (Math.random() > 0.5) {
      growthRate = -growthRate;
    }
    let revenue = Math.round(baseRevenue * (1 + growthRate));
    if (revenue > 999999999999) {
      revenue = Math.round(Math.random() * 400000000000 + 500000000000);
    } else if (revenue < 10000000) {
      revenue = Math.round(Math.random() * 20000000 + 10000000);
    }
    baseRevenue = revenue;
    data.push({
      date: `${year}-${monthStr}-01`,
      revenue: revenue,
      revenue_month: month
    });
  }
  return data.reverse();
}

/**
 * 獲取本地假造的某個股票財報數據
 * @param id 股票id
 * @param startDate 開始日期
 * @param endDate 結束日期
 * @returns 
 */
export function findLocalRevenue(id: string, startDate: string, endDate: string) {
  let data = localRevenueMap.get(id);
  if (!data) {
    data = fakeLocalRevenue();
    localRevenueMap.set(id, data);
  }
  const yearCount = Number(endDate.split('-')[0]) - Number(startDate.split('-')[0]);
  const monthCount = yearCount * 12;
  return data.slice(0, monthCount);
}
