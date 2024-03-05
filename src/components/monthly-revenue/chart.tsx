import useBlockCommonStyle from "@/hooks/block-common-style";
import { MonthlyRevenueRefinedData } from "@/types";
import { Box, Button, MenuItem, Select } from "@mui/material";
import ChartBody from "./chart-body";

/**
 * 月入和增長率的圖標區域組件屬性
 */
type Props = Readonly<{
  /**
   * 年份範圍
   */
  yearRange: number;
  /**
   * 年份範圍變化的回調函數
   * @param yearRange 新的年份範圍
   * @returns 
   */
  // eslint-disable-next-line no-unused-vars
  onChangeYearRange: (yearRange: number) => void;
  /**
   * 月入和增長率的數據
   */
  list: MonthlyRevenueRefinedData[];
  /**
   * 數據加載時的狀態信息
   */
  message: string
}>;

/**
 * 月入和增長率的圖標區域組件
 * @param props 
 * @returns 
 */
export default function MonthlyRevenueChart(props: Props) {
  return <Box sx={{
    ...useBlockCommonStyle(),
    padding: '16px 16px'
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button variant="contained">每月營收</Button>
      <Select
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          "& .MuiSelect-select": {
            paddingTop: '8px', paddingBottom: '8px',
          },
          "& .MuiSvgIcon-root": {
            color: 'primary.contrastText'
          }
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.yearRange}
        onChange={(e) => props.onChangeYearRange(Number(e.target.value))}
      >
        <MenuItem value={3}>近3年</MenuItem>
        <MenuItem value={5}>近5年</MenuItem>
        <MenuItem value={8}>近8年</MenuItem>
      </Select>
    </Box>
    <ChartBody data={props.list} message={props.message}/>
  </Box>;
}