import config from "@/config";
import querystring from 'querystring';

/**
 * 從fin mind遠程獲取數據縂入口
 * @param dataset 資料集名稱
 * @param dataId 股票id
 * @param startDate 開始日期
 * @param endDate 結束日期
 * @returns 
 */
export async function requestFinMind(dataset: string, dataId: string, startDate: string, endDate: string) {
  const token = process.env.FIN_MIND_TOKEN;
  if (!token) {
    throw new Error('FIN_MIND_TOKEN is not set');
  }
  const queryString = querystring.stringify({
    dataset: dataset,
    data_id: dataId,
    start_date: startDate,
    end_date: endDate,
    token
  });
  const url = `${config.finMindApiUrl}/?${queryString}`;
  const res = await fetch(url);
  return res;
}