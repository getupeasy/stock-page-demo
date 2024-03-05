import { MonthlyRevenueRefinedData } from "@/types";
import { Bar, ComposedChart, Legend, Label, Tooltip, XAxis, YAxis, Line, CartesianGrid } from "recharts";
import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";

/**
 * 圖表組件屬性
 */
type Props = Readonly<{
  /**
   * 數據
   */
  data: MonthlyRevenueRefinedData[],
  /**
   * 數據加載狀態消息
   */
  message: string
}>

/**
 * 獲取縱軸刻度，會保證最大值在刻度範圍内的前提下調整以保證刻度被均分到合適的，人易讀的效果
 * @param max 最大值
 * @returns 
 */
function getScale(max: number) {
  const stepCount = 5;
  const maxStr = String(Math.floor(max) + 1);
  const pow = maxStr.length - 2;
  let keep = Number(maxStr.slice(0, 2));
  // 必須要能整除stepCount，如果後面不能補零了，還要能整除50
  while (keep % stepCount !== 0 || (pow === 0 && keep % (stepCount * 10) !== 0)) {
    keep++;
  }
  const step = keep / 5 * Math.pow(10, pow);
  const steps: number[] = [0];
  while (steps[steps.length - 1] < max || steps.length < stepCount + 1) {
    steps.push(steps[steps.length - 1] + step);
  }
  return { steps, domain: [steps[0], steps[steps.length - 1]] };
}

/**
 * 獲取增長率的縱軸刻度，因爲可能出現負增長率，需要額外處理
 * @param min 最小值
 * @param max 最大值
 * @returns 
 */
function getGrowthScale(min: number, max: number) {
  if (min >= 0) {
    return getScale(max)
  } else {
    const range = max - min;
    const scale = getScale(range);
    const downStep = 5;
    let down = downStep;
    while (-down > min) {
      down += downStep;
    }
    const mapper = (n: number) => n - down;
    return {
      steps: scale.steps.map(mapper),
      domain: scale.domain.map(mapper)
    }
  }
}

/**
 * 獲取圖表用的數據，
 * 月入轉成千元的方式，同時基於真題數據計算出月入和增長率的縱軸刻度
 * @param data 原始數據
 * @returns 
 */
function useChartData(data: MonthlyRevenueRefinedData[]) {
  const chartData = useMemo(() => {
    let maxRevenue = 0;
    let maxGrowthRate = 0;
    let minGrowthRate = 0;
    const parsedList = data.map((item) => {
      maxGrowthRate = Math.max(maxGrowthRate, item.monthOnYearGrowthRate);
      minGrowthRate = Math.min(minGrowthRate, item.monthOnYearGrowthRate);
      const newData = {
        ...item,
        revenue: item.revenue / 1000
      }
      maxRevenue = Math.max(maxRevenue, newData.revenue);
      return newData;
    })
    const revenueScale = getScale(maxRevenue)
    const growthScale = getGrowthScale(minGrowthRate, maxGrowthRate)

    return {
      list: parsedList,
      revenueScale,
      growthScale
    }
  }, [data]);
  return chartData;
}

/**
 * 月入和增長率的圖表組件
 * @param props 
 * @returns 
 */
export default function ChartBody(props: Props) {
  const { message, data } = props;
  const theme = useTheme();
  const { list, revenueScale, growthScale } = useChartData(data);
  if (message) {
    return <Box sx={{
      width: '764px', height: '480px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center'
    }}>{message}</Box>
  }

  return <Box sx={{
    padding: '40px 24px',
    "& .recharts-surface": {
      overflow: 'visible'
    },
    "& .recharts-default-tooltip": {
      backgroundColor: `${theme.palette.background.default}!important`,
    }
  }} >
    <ComposedChart data={list} width={716} height={400}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis yAxisId='revenue' domain={revenueScale.domain} ticks={revenueScale.steps}>
        <Label position='top' offset={20}>千元</Label>
      </YAxis>
      <YAxis yAxisId='growth' orientation='right' domain={growthScale.domain} ticks={growthScale.steps}>
        <Label position='top' offset={20}>%</Label>
      </YAxis>
      <Tooltip />
      <Legend verticalAlign="top" align="center" />
      <Bar dataKey="revenue" fill={theme.palette.warning.light}
        stroke={theme.palette.warning.dark} name='每月營收' yAxisId='revenue' unit='千元' />
      <Line dataKey="monthOnYearGrowthRate" stroke={theme.palette.error.main}
        strokeWidth={3} name='單月營收年增率' yAxisId='growth' unit='%'></Line>
    </ComposedChart>
  </Box>
}