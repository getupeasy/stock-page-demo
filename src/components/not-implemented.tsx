import useGotoStock from "@/hooks/goto-stock";
import { Box, Link, Typography } from "@mui/material";

/**
 * 暫未實現的功能區的通用臨時填充組件的屬性
 */
type NotImplementedProps = {
  /**
   * 股票id
   */
  stockId: string;
  /**
   * 功能名
   */
  feature: string;
}
/**
 * 暫未實現的功能區的通用臨時填充組件
 */
export default function NotImplemented(props: NotImplementedProps) {
  const { gotoStock } = useGotoStock();
  return <Box sx={{
    width: '100%', minHeight: '100%', borderRadius: '8px',
    backgroundColor: 'background.default',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Box>
      <Typography variant="h4" component='div'>
        [{props.feature}]
        <br />
        該功能暫未實現
      </Typography>
      <Typography variant="h6" component='div'>
        您可查看已實現的<Link onClick={() => gotoStock(props.stockId, 'monthly-revenue')}>月入和年增率功能</Link>
      </Typography>
    </Box>
  </Box>;
}