import useBlockCommonStyle from "@/hooks/block-common-style";
import { Stock } from "@/types";
import { getStocks } from "@/utils/fetch";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * 股票標題組件屬性
 */
type Props = Readonly<{
  /**
   * 股票id
   */
  stockId: string
}>

/**
 * 使用標題内容
 * @param stockId 股票id
 * @returns 
 */
function useTitle(stockId: string) {
  const [title, setTitle] = useState('加載中...');
  useEffect(() => {
    const req = getStocks<Stock[]>(stockId);
    req.promise.then(res => {
      if (!res || res.err) {
        setTitle('請求數據失敗');
      } else if (!res.data || !res.data.length) {
        setTitle('未找到相關股票');
      } else {
        const stock = res.data[0] as Stock;
        setTitle(`${stock.stock_name}(${stock.stock_id})`);
      }
    })
    return () => req.abort()
  }, [stockId])
  return title;
}

/**
 * 股票標題組件
 * @param props 
 * @returns 
 */
export default function StockTitle(props: Props) {
  const { stockId } = props;
  const title = useTitle(stockId);
  return <Box sx={{
    ...useBlockCommonStyle(),
    padding: '8px 16px',
    minHeight: '49.6px'
  }}>
    <Typography variant="h6" component='h1' sx={{ fontWeight: 'bold' }}>{title}</Typography>
  </Box>;
} 