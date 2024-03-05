import { useSecondBorderColor } from "./mui-theme";

/**
 * 使用通用區塊樣式，主要是爲了配合主題切換。
 * @returns 
 */
export default function useBlockCommonStyle() {
  return {
    backgroundColor: 'background.default',
    border: `1px solid ${useSecondBorderColor()}`,
    borderRadius: '4px',
  }
}