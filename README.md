## 説明
仿照財報狗製作的股票頁面，基於[Typescript](https://www.typescriptlang.org/)、[Next.js App Router](https://nextjs.org/)、[Material UI](https://mui.com/material-ui/)和[Recharts](https://recharts.org/)製作，支持點擊頁面右上角的主題開關進行明暗主題切換。

不知什麽原因，finMind遠程api總需要很長時間才能請求成功，且經常超時無響應。所以我在本地服務端造了一些假數據，以便開發過程中快速請求到數據查看效果。
默認使用的是本地數據，可以在頁面右上角的數據源開關，進行本地/遠程數據源的切換。

關於本地數據：
1. 股票信息來源於finMind網站中下載的TaiwanStockInfo資料集的csv文件
2. 月入數據是隨機模擬股市變化自動生成的假數據
3. 切換數據源后頁面數據仍會保持，下次請求才會使用新的數據源。
4. 輸入框中搜索時，本地數據源支持股票id和股票名的模糊匹配搜索，遠程數據源只支持股票id的完整搜索。

## 使用

### 本地試用
同常規Next.js項目一樣

先在.env中填入自己的FIN_MIND_TOKEN

使用npm/yarn/pnpm安裝依賴
```shell
pnpm install
```

本地開發模式查看效果
```shell
pnpm dev # 啓動后瀏覽器訪問http://localhost:3000
```

本地發佈模式查看效果
```shell
pnpm build
pnpm start # 啓動後瀏覽器訪問http://localhost:3000
```

### 自行部署
内容較多，此處不敘述，參照[Next.js的部署文檔](https://nextjs.org/docs/app/building-your-application/deploying#managed-nextjs-with-vercel)

### 已部署好的頁面
不方便本機試用和自行部署的話，可訪問我部署在Vercel上的頁面：
+ 主頁：https://stock-page-demo.vercel.app
+ 圖表頁：https://stock-page-demo.vercel.app/analysis/2330/monthly-revenue
