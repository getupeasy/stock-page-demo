import { Campaign, Description, Medication, Paid, VerifiedUser, SignalCellularAlt, Scale, Person, BugReport, PieChart } from '@mui/icons-material'
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

/**
 * 分析頁面子選單數據類型
 */
export type SubItem = {
  /**
   * 對應的功能路徑名
   */
  path: string;
  /**
   * 選單名
   */
  name: string;
}
/**
 * 分析頁面顶部選單數據類型
 */
export type TopItem = SubItem & {
  /**
   * 使用圖標組件
   */
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  /**
   * 圖標顔色
   */
  iconColor?: string;
  /**
   * 子選單
   */
  children?: SubItem[];
}

/**
 * 靜態配置好的分析頁面選單數據
 */
export const menuDataList: TopItem[] = [
  {
    path: "",
    name: "最新動態",
    icon: Campaign
  },
  {
    path: "stock-health-check",
    name: "股票健診",
    icon: Medication
  },
  {
    path: "",
    name: "財務報表",
    icon: Description,
    children: [
      {
        path: "monthly-revenue",
        name: "每月營收"
      },
      {
        path: "eps",
        name: "每股盈餘"
      },
      {
        path: "nav",
        name: "每股淨值"
      },
      {
        path: "income-statement",
        name: "損益表"
      },
      {
        path: "assets",
        name: "總資產"
      },
      {
        path: "liabilities-and-equity",
        name: "負債和股東權益"
      },
      {
        path: "cash-flow-statement",
        name: "現金流量表"
      },
      {
        path: "dividend-policy",
        name: "股利政策"
      },
      {
        path: "e-report",
        name: "電子書"
      }
    ]
  },
  {
    path: "",
    name: "獲利能力",
    icon: Paid,
    iconColor: "red",
    children: [
      {
        path: "profit-margin",
        name: "利潤比率"
      },
      {
        path: "operating-expense-ratio",
        name: "營業費用率拆解"
      },
      {
        path: "non-operating-income-to-profit-before-tax",
        name: "業外佔稅前淨利比例"
      },
      {
        path: "roe-roa",
        name: "ROE / ROA"
      },
      {
        path: "du-pont-analysis",
        name: "杜邦分析"
      },
      {
        path: "turnover-ratio",
        name: "經營週轉能力"
      },
      {
        path: "turnover-days",
        name: "營運週轉天數"
      },
      {
        path: "dividend-payout-ratio",
        name: "現金股利發放率"
      }
    ]
  },
  {
    path: "",
    name: "安全性分析",
    icon: VerifiedUser,
    iconColor: "green",
    children: [
      {
        path: "financial-structure-ratio",
        name: "財務結構比率"
      },
      {
        path: "current-ratio-and-quick-ratio",
        name: "流速動比率"
      },
      {
        path: "interest-coverage-ratio",
        name: "利息保障倍數"
      },
      {
        path: "cash-flow-analysis",
        name: "現金流量分析"
      },
      {
        path: "operating-cash-flow-to-net-income-ratio",
        name: "營業現金流對淨利比"
      },
      {
        path: "reinvestment-rate",
        name: "盈餘再投資比率"
      }
    ]
  },
  {
    path: "",
    name: "成長力分析",
    icon: SignalCellularAlt,
    iconColor: "orange",
    children: [
      {
        path: "monthly-revenue-growth-rate",
        name: "月營收成長率"
      },
      {
        path: "revenue-growth-rate",
        name: "營收成長率"
      },
      {
        path: "gross-profit-growth-rate",
        name: "毛利成長率"
      },
      {
        path: "operating-income-growth-rate",
        name: "營業利益成長率"
      },
      {
        path: "net-income-growth-rate",
        name: "稅後淨利成長率"
      },
      {
        path: "eps-growth-rate",
        name: "每股盈餘成長率"
      }
    ]
  },
  {
    path: "",
    name: "價值評估",
    icon: Scale,
    iconColor: "blue",
    children: [
      {
        path: "pe",
        name: "本益比評價"
      },
      {
        path: "pe-band",
        name: "本益比河流圖"
      },
      {
        path: "pb",
        name: "股價淨值比評價"
      },
      {
        path: "pb-band",
        name: "股價淨值比河流圖"
      },
      {
        path: "dividend-yield",
        name: "現金股利殖利率"
      },
      {
        path: "average-dividend-yield",
        name: "平均現金股息殖利率"
      },
      {
        path: "average-dividend-yield-band",
        name: "平均現金股息河流圖"
      }
    ]
  },
  {
    path: "",
    name: "董監與籌碼",
    icon: Person,
    children: [
      {
        path: "broker-trading",
        name: "分點籌碼動向"
      },
      {
        path: "board-members-and-supervisors-shares-to-shares-outstanding-ratio",
        name: "董監持股比例"
      },
      {
        path: "pledging-ratio-of-board-members-and-supervisors",
        name: "董監持股質押比例"
      }
    ]
  },
  {
    path: "",
    name: "關鍵指標",
    icon: BugReport,
    iconColor: "purple",
    children: [
      {
        path: "long-term-and-short-term-monthly-revenue-yoy",
        name: "長短期月營收年增率"
      },
      {
        path: "average-long-term-and-short-term-monthly-revenue",
        name: "長短期月營收平均值"
      },
      {
        path: "croic",
        name: "自由現金流報酬率"
      },
      {
        path: "piotroski-f-score",
        name: "Piotroski F 分數"
      },
      {
        path: "financial-borrowing",
        name: "長短期金融借款"
      },
      {
        path: "cash-conversion-cycle",
        name: "現金週轉循環"
      },
      {
        path: "peter-lynch-valuation",
        name: "彼得林區評價"
      },
      {
        path: "dividend-discount-valuation",
        name: "股利折現評價"
      },
      {
        path: "dcf-valuation",
        name: "現金流折現評價"
      },
      {
        path: "majority-shareholders-share-ratio",
        name: "大股東持股比率"
      }
    ]
  },
  {
    path: "",
    name: "產品組合",
    icon: PieChart,
    iconColor: "blue",
    children: [
      {
        path: "product-sales-figure",
        name: "產品銷售額"
      },
      {
        path: "product-sales-volume",
        name: "產品銷售量"
      },
      {
        path: "product-unit-price",
        name: "產品單價"
      },
      {
        path: "production-capacity",
        name: "產能與產量"
      },
      {
        path: "production-capacity-utilization",
        name: "產能利用率"
      },
      {
        path: "product-regional-sales",
        name: "區域銷售額"
      }
    ]
  }
]

/**
 * 根據路徑取得選項
 * @param list 選單列表數據
 * @param pathname 路徑
 * @returns 
 */
export function getCurrentItem(list: TopItem[], pathname: string) {
  let top: TopItem | null = null;
  let sub: SubItem | null = null;
  for (let topTemp of list) {
    if (topTemp.path === pathname) {
      top = topTemp;
      break;
    }
    if (topTemp.children) {
      for (let subTemp of topTemp.children) {
        if (subTemp.path === pathname) {
          top = topTemp;
          sub = subTemp;
          break;
        }
      }
    }
  }
  return { top, sub }
}
/**
 * 獲得某個選單選型對應的路徑
 * @param item 
 * @returns 
 */
export function getItemPath(item: TopItem | SubItem) {
  if (item.path) {
    return item.path;
  }
  if ('children' in item && item.children) {
    return item.children[0].path;
  }
  return '';
}


