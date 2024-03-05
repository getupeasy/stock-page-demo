import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * 使用router驅動跳轉到指定的股票分析頁面的功能
 * @returns 
 */
export default function useGotoStock() {
  const router = useRouter();
  const gotoStock = useCallback((stockId: string, feature?: string) => {
    let path = `/analysis/${stockId}`;
    // 指定了feature，使用指定的feature，没指定feature，尝试保留当前的feature
    if (feature === undefined) {
      const match = location.pathname.match(/analysis\/([^/]+)\/(.+)$/);
      if (match) {
        feature = match[2];
      }
    }
    if (feature !== undefined) {
      path += `/${feature}`
    }
    router.push(path);
  }, [router])
  return { gotoStock }
}