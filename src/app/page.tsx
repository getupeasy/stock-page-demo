"use client";
import SearchStock from "@/components/search-stock";
import { Box, Button, Container } from "@mui/material";
import NavBar from "@/components/nav-bar";
import useGotoStock from "@/hooks/goto-stock";

const recommendedStocks = [
  {
    id: '2330',
    name: '台積電'
  },
  {
    id: '2317',
    name: '鴻海'
  },
  {
    id: '2308',
    name: '台達電'
  }
]

export default function Home() {
  const { gotoStock } = useGotoStock();
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      color: 'text.primary',
      minHeight: '100vh',
    }} data-com='home'>
      <NavBar>
        <Box></Box>
      </NavBar>
      <Container sx={{ paddingTop: '48px' }}>
        <Box sx={{ width: '400px', margin: '20vh auto 0' }}>
          <SearchStock />
          <Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {
              recommendedStocks.map(stock => {
                return <Button variant="contained"
                  onClick={() => gotoStock(stock.id)}
                  sx={{ borderRadius: '16px' }}
                  key={stock.id}>{stock.name + ' ' + stock.id}</Button>
              })
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
