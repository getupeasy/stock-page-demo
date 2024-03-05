

import { Box, List, ListItem, SxProps } from "@mui/material";
import { SubItem, TopItem, getCurrentItem, getItemPath, menuDataList } from "./structure";
import { useMemo } from "react";
import useGotoStock from "@/hooks/goto-stock";

/**
 * 數據分析頁面左邊選單組件屬性
 */
type AnalysisMenuProps = Readonly<{
  /**
   * 當前活動的股票id
   */
  stockId: string,
  /**
   * 當前活動的功能
   */
  feature: string
}>

/**
 * 數據分析頁面左邊選單組件
 * @param props 
 * @returns 
 */
export default function AnalysisList(props: AnalysisMenuProps) {
  const { stockId, feature } = props
  const { top: currentTop, sub: currentSub } = useMemo(() => {
    return getCurrentItem(menuDataList, feature)
  }, [feature])
  const subList = currentTop?.children;
  const { gotoStock } = useGotoStock();
  const onSelectItem = (item: TopItem | SubItem) => {
    const path = getItemPath(item);
    gotoStock(stockId, path);
  }

  const getItemCommonDynamicStyle = (item: TopItem | SubItem, current: TopItem | SubItem | null): SxProps => {
    return {
      cursor: 'pointer',
      borderLeft: '3px solid',
      borderColor: item.name === current?.name ? 'primary.main' : 'transparent',
    };
  }
  const getTopItemDynamicStyle = (item: TopItem, current: TopItem | null): SxProps => {
    return {
      ...getItemCommonDynamicStyle(item, current),
      '&:hover': {
        color: 'primary.main',
        transition: 'color 0.3s',
      }
    }
  }

  const getSubItemDynamicStyle = (item: SubItem, current: SubItem | null): SxProps => {
    return {
      ...getItemCommonDynamicStyle(item, current),
      '&:hover': {
        borderColor: 'primary.main',
      }
    }
  }
  return <Box data-com='analysis-list' sx={{ fontSize: '13px', display: 'flex', marginTop: '32px' }}>
    <List data-part='top'>
      {
        menuDataList.map(top => {
          return <ListItem key={top.name}
            onClick={() => onSelectItem(top)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '105px',
              paddingTop: 0,
              paddingBottom: 0,
              marginBottom: '16px',
              ...getTopItemDynamicStyle(top, currentTop),
            }}>
            <top.icon sx={{ color: top.iconColor || 'text.primary', }} />
            {top.name}
          </ListItem>
        })
      }
    </List>
    {subList && <List data-part='sub' sx={{ width: '195px' }}>
      {
        subList.map(sub => {
          return <ListItem key={sub.name}
            onClick={() => onSelectItem(sub)}
            sx={{
              lineHeight: '24px',
              ...getSubItemDynamicStyle(sub, currentSub),
            }}>
            {sub.name}
          </ListItem>
        })
      }
    </List>}
  </Box>
}