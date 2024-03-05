
"use client"
import AnalysisList from "@/components/analysis-list";
import NavBar from "@/components/nav-bar";
import SearchStock from "@/components/search-stock";
import { useSecondBgColor } from "@/hooks/mui-theme";
import { Box } from "@mui/material";
import NotImplemented from "../../../components/not-implemented";
import MonthlyRevenue from "@/components/monthly-revenue";

type PageProps = Readonly<{
  params: {
    'stock-detail': string[]
  }
}>

export default function StockIdAnalysisPage(props: PageProps) {
  const stockDetail = props.params['stock-detail'];
  const stockId = stockDetail[0];
  const feature = stockDetail[1] || '';
  const content = feature === 'monthly-revenue'
    ? <MonthlyRevenue stockId={stockId} />
    : <NotImplemented feature={feature} stockId={stockId} />;
  const mainBgColor = useSecondBgColor();
  return <Box sx={{
    backgroundColor: mainBgColor,
    color: 'text.primary',
    minHeight: '100vh',
  }}>
    <NavBar>
      <SearchStock sx={{ width: '400px' }} />
    </NavBar>
    <Box sx={{
      paddingTop: '48px',
      width: '1100px',
      display: 'flex',
      margin: '0 auto',
    }}>
      <AnalysisList stockId={stockId} feature={feature}></AnalysisList>
      <Box sx={{ width: '100%', marginTop: '32px' }}>
        {content}
      </Box>
    </Box>
  </Box>
}