import { NestChildrenProps } from "@/types";
import { AppBar, Box, SxProps, Theme, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import DataSourceSwitch from "./data-source-switch";
import ThemeSwitch from "./theme-switch";

type NavBarProps = Readonly<NestChildrenProps & {
  sx?: SxProps<Theme>,
}>

/**
 * 導航欄組件
 * @param props 
 * @returns 
 */
export default function NavBar(props: NavBarProps) {
  const router = useRouter();
  return <AppBar color="transparent" sx={{
    bgcolor: 'background.default',
    boxShadow: "none",
    ...props.sx
  }}>
    <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ width: '154px' }}>
        <Typography variant="h5" component='a'
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer' }}>Home</Typography>
      </Box>

      {props.children}
      <Box sx={{ display: 'flex' }}>
        <DataSourceSwitch />
        <ThemeSwitch />
      </Box>
    </Toolbar>
  </AppBar>
}