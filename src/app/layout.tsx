
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import MuiThemeProvider from "../providers/mui-theme";

export const metadata: Metadata = {
  title: "Stock",
  description: "All the stock info you need.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden' }}>
        <span style={{ display: 'none' }}>sign:b</span>
        <CssBaseline>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </CssBaseline>
      </body>
    </html >
  );
}
