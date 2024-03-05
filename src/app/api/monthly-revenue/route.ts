import { NextResponse } from "next/server";
import { requestFinMind } from "../fin-mind"
import { DataSource } from "@/types";
import { findLocalStock } from "../local/stocks";
import { findLocalRevenue } from "../local/revenue";

/**
 * 數據加載適配器
 */
const dataLoader = {
  /**
   * 從遠程加載
   * @param dataId 股票id
   * @param startDate 開始日期
   * @param endDate 結束日期
   * @returns 
   */
  async remote(dataId: string, startDate: string, endDate: string) {
    return requestFinMind('TaiwanStockMonthRevenue', dataId, startDate, endDate);
  },
  /**
   * 從本地加載
   * @param dataId 股票id
   * @param startDate 開始日期
   * @param endDate 結束日期
   * @returns 
   */
  async local(dataId: string, startDate: string, endDate: string) {
    const stock = findLocalStock(dataId);
    if (!stock) {
      return NextResponse.json({});
    }
    return NextResponse.json({
      data: findLocalRevenue(dataId, startDate, endDate)
    })

  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const validationFails: string[] = [];
  const params: string[] = [];
  const dateFormatParams = ['start-date', 'end-date'];
  const requiredParams = ['stock-id', ...dateFormatParams];
  requiredParams.forEach(key => {
    const value = searchParams.get(key);
    if (!value) {
      validationFails.push(`${key} is required`);
    } else {
      params.push(value);
    }
  })

  dateFormatParams.forEach(key => {
    const value = searchParams.get(key);
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      validationFails.push(`${key} should be yyyy-mm-dd format`);
    }
  })
  if (validationFails.length > 0) {
    return NextResponse.json({ error: validationFails.join('\n') }, { status: 400 });
  }
  const dataSource: DataSource = searchParams.get('data-source') as DataSource || 'local'
  return dataLoader[dataSource](...params as [string, string, string]);
}