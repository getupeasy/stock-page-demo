import { Stock } from "@/types";
import localStockData from "./stocks-data";



/**
 * 加載本地股票列表，是之前從fin mind中下載過來的csv中的數據
 * @returns 
 */
function loadLocalStocks() {
  const [, ...lines] = localStockData.split('\n').filter(line => line.trim());
  const map = new Map();

  lines.forEach(line => {
    const [industry_category, stock_id, stock_name, type, date] = line.split(',');
    if (map.has(stock_id)) {
      return;
    }
    map.set(stock_id, {
      industry_category,
      stock_id,
      stock_name,
      type,
      date: date.replace(/\r/, '')
    });
  });

  return Array.from(map.values());
}
const localStocks: Stock[] = loadLocalStocks();

/**
 * 從本地數據中獲取某個股票的概要信息
 * @param id 
 * @returns 
 */
export function findLocalStock(id: string) {
  return localStocks.find(stock => stock.stock_id === id);
}

/**
 * 根據關鍵字搜尋本地股票，模糊匹配股票名和股票id
 * @param keyword 關鍵字
 * @returns 
 */
export function searchLocalStocks(keyword: string) {
  return localStocks.filter(stock => stock.stock_id.includes(keyword) || stock.stock_name.includes(keyword));
}
