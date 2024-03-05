import useGotoStock from "@/hooks/goto-stock";
import { useSecondBgColor, useSecondBorderColor } from "@/hooks/mui-theme";
import { Stock } from "@/types";
import { Divider, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * 搜索結果列表組件屬性
 */
type ResultListProps = {
  /**
   * 股票列表
   */
  stocks: Stock[]
}

/**
 * 使用搜索結果列表選擇和控制功能，
 * 上下鍵可以選擇、Enter鍵可以跳轉到選中的股票
 * @param stocks 股票列表
 * @returns 
 */
function useListSelection(stocks: Stock[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { gotoStock } = useGotoStock();
  // 处理上下按钮
  useEffect(() => {
    setActiveIndex(0);
    const handleArrowUpDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prevIndex => {
          if (e.key === 'ArrowDown') {
            return (prevIndex + 1) % stocks.length;
          } else {
            return (prevIndex - 1 + stocks.length) % stocks.length;
          }
        })
      }
    }
    window.addEventListener('keydown', handleArrowUpDown)
    return () => {
      window.removeEventListener('keydown', handleArrowUpDown)
    }
  }, [stocks.length])
  // 处理Enter健
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        gotoStock(stocks[activeIndex].stock_id)
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [activeIndex, gotoStock, stocks])
  return {
    activeIndex,
    setActiveIndex,
    gotoStock
  }
}


/**
 * 搜索結果列表組件
 * @param props 
 * @returns 
 */
export default function SearchStockResultList(props: ResultListProps) {
  const { stocks } = props
  const hoverColor = useSecondBgColor();
  const { activeIndex, setActiveIndex, gotoStock } = useListSelection(stocks)
  return <List sx={{
    bgcolor: 'background.default',
    width: '100%',
    position: 'absolute',
    maxHeight: '60vh',
    overflowY: 'auto',
    border: `solid 1px ${useSecondBorderColor()}`,
    zIndex: 1
  }}>
    <Divider textAlign="left">查詢個股</Divider>
    {
      stocks.map(stock => {
        const bgColor = activeIndex === stocks.indexOf(stock) ? hoverColor : 'inherit'
        return <ListItem key={stock.stock_id + stock.industry_category + stock.type}
          onMouseEnter={() => setActiveIndex(stocks.indexOf(stock))}
          onClick={() => gotoStock(stock.stock_id)}
          sx={{ backgroundColor: bgColor, cursor: 'pointer' }} >
          {stock.stock_id} {stock.stock_name}
        </ListItem>
      })
    }
  </List >
}