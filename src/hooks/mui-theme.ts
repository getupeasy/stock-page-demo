import { useTheme } from "@mui/material";

/**
 * 使用配合主題切換的次要背景色
 * @returns 
 */
export function useSecondBgColor() {
  const theme = useTheme();
  return theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200];
}
/**
 * 使用配合主題切換的次要邊框顔色
 * @returns 
 */
export function useSecondBorderColor() {
  const theme = useTheme();
  return theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300];
}