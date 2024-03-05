import useBlockCommonStyle from "@/hooks/block-common-style";
import { MonthlyRevenueRefinedData } from "@/types";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

/**
 * 月入和增長率表格組件屬性
 */
type Props = Readonly<{
  /**
   * 數據
   */
  list: MonthlyRevenueRefinedData[],
  /**
   * 數據加載中的狀態信息
   */
  message: string
}>

const columns: { id: keyof MonthlyRevenueRefinedData, label: string }[] = [
  { id: 'month', label: '年度月份' },
  { id: 'revenue', label: '年度營收' },
  { id: 'monthOnYearGrowthRate', label: '單月營收年增率（%）' },
]

/**
 * 使用初始化后滾動最右側，查看最新數據的功能
 * @param listLength 數據長度
 * @returns 
 */
function useScrollEnd(listLength: number) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  useEffect(() => {
    let tryTimes = 0;
    const id = setInterval(() => {
      const tbody = tbodyRef.current;
      if (!tbody) {
        return;
      }
      const scrollWidth = tbody.scrollWidth;
      if (scrollWidth > tbody.offsetWidth) {
        tbody.scrollTo({ top: 0, left: scrollWidth });
        clearInterval(id);
      }
      tryTimes++;
      if (tryTimes > 20) {
        clearInterval(id);
      }
    }, 250);
    return () => {
      clearInterval(id);
    }
  }, [listLength]);
  return tbodyRef;
}

/**
 * 月入和增長率表格組件
 * @param props 
 * @returns 
 */
export default function MonthlyRevenueTable(props: Props) {
  const { list, message } = props;
  const { palette } = useTheme();
  const tbodyRef = useScrollEnd(list.length);
  return <Box sx={{
    ...useBlockCommonStyle(),
    marginBottom: '24px',
  }}>
    <Button variant="contained" sx={{ margin: '16px' }}>每月營收</Button>
    {message
      ? <Box sx={{ height: '188.8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{message}</Box>
      : <TableContainer component={Paper} sx={{ borderRadius: '0' }}>
        <Table sx={{ display: 'flex', gap: '4px' }}>
          <TableHead sx={{ width: '176px', border: `1px solid ${palette.divider}` }}>
            <TableRow sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* 表头单元格 */}
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody ref={tbodyRef} sx={{
            display: 'flex', width: '616px', overflowX: 'auto',
            border: `1px solid ${palette.divider}`, borderLeft: 'none',
          }}>
            {list.map((row) => (
              <TableRow key={row.month} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* 表格主体单元格 */}
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ height: '56.8px' }}>{row[column.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
  </Box>
}