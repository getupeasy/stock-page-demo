"use client"
import { MuiThemeModeContext } from "@/providers/mui-theme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { FormControlLabel, useTheme } from "@mui/material";
import { useContext } from "react";

/**
 * 主題切換組件
 * @returns 
 */
export default function ThemeSwitch() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const modeContext = useContext(MuiThemeModeContext);
  return <FormControlLabel sx={{ width: '64px' }}
    onClick={modeContext?.toggle}
    control={
      isDarkMode ? <Brightness4 sx={{ marginLeft: '8px' }} /> : <Brightness7 sx={{ marginLeft: '8px' }} />
    } label={isDarkMode ? 'Dark ' : 'Light'} labelPlacement="start" />
}