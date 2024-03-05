"use client"
import { useState, useMemo, useEffect } from "react";
import { Roboto } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext } from 'react';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SnackbarProvider } from "notistack";

/**
 * 主題模式上下文内容格式
 */
type ThemeModeContextContent = {
  toggle: () => void
}
/**
 * 主題模式，明暗色
 */
type ThemeMode = 'light' | 'dark'

/**
 * 用戶選中的主題模式在本地存儲的key
 */
const MODE_KEY = 'mui-theme-mode';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

function getThemeByMode(mode: ThemeMode) {
  return createTheme({ ...theme, palette: { mode } });
}

/**
 * 获取客户端的主题模式
 * 1. 最优先使用客户之前选择的模式（localStorage）
 * 2. 如果没有则使用系统默认模式
 * 3. 如果仍没有则使用light
 * @returns 
 */
function getClientMode() {
  let initialMode: ThemeMode = 'light'
  const localValue = localStorage.getItem(MODE_KEY);
  if (localValue === 'dark' || localValue === 'light') {
    initialMode = localValue;
  } else if (window.matchMedia('(prefers-color-scheme: dark)')) {
    initialMode = 'dark';
  }
  return initialMode;
}

export const MuiThemeModeContext = createContext<ThemeModeContextContent>({
  toggle: () => { },
})

/**
 * 使用可切換的主題功能，切換后的主題會在本地存儲
 * @returns 
 */
function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = useMemo(() => getThemeByMode(mode), [mode]);
  const providerValue = useMemo(() => ({
    toggle: () => {
      setMode(prev => {
        const newMode = prev === 'light' ? 'dark' : 'light'
        localStorage.setItem(MODE_KEY, newMode);
        return newMode;
      });
    }
  }), []);
  useEffect(() => {
    setMode(getClientMode());
  }, [])
  return { theme, providerValue }
}


/**
 * 包含MUI主题和路由缓存的Provider
 * 并提供切换主题的功能，以及全局消息條功能
 * @returns 
 */
export default function MuiThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, providerValue } = useThemeMode();
  return <MuiThemeModeContext.Provider value={providerValue}>
    <ThemeProvider theme={theme}>
      <AppRouterCacheProvider>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </AppRouterCacheProvider>
    </ThemeProvider>
  </MuiThemeModeContext.Provider>
}