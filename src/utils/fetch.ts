
import { DataSource } from '@/types';
/**
 * 請求數據緩存，避免短時間内重複進行相同的請求
 */
let cacheMap: Map<string, { data: object, expiredAt: number }>;

/**
 * 發起請求是的配置
 */
type GetOptions = {
  /**
   * 結果緩存時常（毫秒）
   */
  cacheDuration?: number;
  /**
   * 中斷請求的訊號
   */
  abortSignal?: AbortSignal;
}

/**
 * 默認緩存時間一分鐘
 */
const DEFAULT_CACHE_DURATION = 1000 * 60;
/**
 * 選擇的數據源緩存在本地的key
 */
const DATA_SOURCE_KEY = 'data-source';

/**
 * 數據源，默認使用本地的
 */
let dataSource: DataSource = 'local';

/**
 * 初始化后是否已經從本地存儲中取回了數據源
 */
let localRetrieved = false;

/**
 * 更新數據源
 * @param newDataSource 新的數據源
 */
export function updateDataSource(newDataSource: DataSource) {
  dataSource = newDataSource;
  localStorage.setItem(DATA_SOURCE_KEY, dataSource);
}
/**
 * 獲取當前的數據源
 * @returns 
 */
export function getDataSource() {
  if (!localRetrieved) {
    dataSource = localStorage.getItem(DATA_SOURCE_KEY) as DataSource || 'local';
    localRetrieved = true;
  }
  return dataSource
}

/**
 * 確保緩存已初始化，會開啓一個任務定期清理過期的緩存，避免過期内容占用内存。
 * @returns 
 */
function insureCache() {
  if (!cacheMap) {
    cacheMap = new Map();
    setInterval(() => {
      const keys = Array.from(cacheMap.keys());
      keys.forEach(key => {
        const cache = cacheMap.get(key);
        if (cache && cache.expiredAt < Date.now()) {
          cacheMap.delete(key);
        }
      })
    }, DEFAULT_CACHE_DURATION);
  }
  return cacheMap;
}

/**
 * 嘗試從緩存讀取結果
 * @param key 緩存的key
 * @returns 
 */
function readCache(key: string) {
  const cache = insureCache();
  const cacheData = cache.get(key);
  if (cacheData && cacheData.expiredAt > Date.now()) {
    return cacheData.data;
  } else {
    cacheMap.delete(key);
    return null;
  }
}

/**
 * 將數據寫到緩存
 * @param key 緩存的key
 * @param data 數據
 * @param cacheDuration 緩存有效時長
 */
function writeCache(key: string, data: object, cacheDuration = DEFAULT_CACHE_DURATION) {
  const cache = insureCache();
  cache.set(key, { data, expiredAt: Date.now() + cacheDuration });
}

/**
 * 發起GET請求
 * @param url 請求地址
 * @param options 配置
 * @returns 
 */
async function getInner(url: string, options: GetOptions = {}) {
  const cachedData = readCache(url);
  if (cachedData) {
    return cachedData;
  } else {
    try {
      const res = await fetch(url, { signal: options.abortSignal });
      const json = await res.json();
      writeCache(url, json, options.cacheDuration);
      return json;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return {};
      } else {
        return { err: err };
      }
    }
  }
}

/**
 * 通用的get請求
 * @param url 請求地址
 * @param cacheDuration 結果緩存時間
 * @returns 
 */
export function get(url: string, cacheDuration = DEFAULT_CACHE_DURATION) {
  const abortController = new AbortController();
  const joint = url.includes('?') ? '&' : '?';
  const promise = getInner(url + `${joint}data-source=${dataSource}`, { abortSignal: abortController.signal, cacheDuration });
  return {
    abort: () => abortController.abort(),
    promise
  }
}

/**
 * 請求股票信息
 * @param keyword 關鍵字
 * @returns 
 */
export function getStocks(keyword: string) {
  return get(`/api/search-stock?keyword=${keyword}`);
}
/**
 * 請求月入信息
 * @param keyword 關鍵字
 * @param startDate 開始時間
 * @param endDate 結束時間
 * @returns 
 */
export function getMonthlyRevenue(keyword: string, startDate: string, endDate: string) {
  return get(`/api/monthly-revenue?stock-id=${keyword}&start-date=${startDate}&end-date=${endDate}`);
}