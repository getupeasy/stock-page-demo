import { NextResponse } from "next/server";
import { DataSource } from "@/types";
import { requestFinMind } from "../fin-mind";
import { searchLocalStocks } from "../local/stocks";
/**
 * 數據加載適配器
 */
const dataLoader = {
  /**
   * 從遠程加載
   * @param dataId 股票id
   * @returns 
   */
  async remote(dataId: string) {
    return requestFinMind('TaiwanStockInfo', dataId, '2023-01-01', '2023-12-31');
  },
  /**
   * 從本地加載
   * @param keyword 關鍵字
   * @returns 
   */
  async local(keyword: string) {
    const data = searchLocalStocks(keyword);
    return NextResponse.json({ data });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dataId = searchParams.get('keyword');
  if (!dataId) {
    return NextResponse.json({ error: 'keyword is required' }, { status: 400 });
  }
  const dataSource: DataSource = searchParams.get('data-source') as DataSource || 'local'
  return dataLoader[dataSource](dataId);
}