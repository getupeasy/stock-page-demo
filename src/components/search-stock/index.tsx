"use client";
import { styled, SxProps, Theme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, LinearProgress, Snackbar } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchStockResultList from './result-list';
import { useSecondBorderColor, useSecondBgColor } from '@/hooks/mui-theme';
import { Stock } from '@/types';
import { getStocks } from '@/utils/fetch';
import { useSnackbar } from 'notistack';

type SearchInputProps = {
  sx?: SxProps<Theme>
}


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

/**
 * 使用點擊搜索組件之外，就關閉搜索結果的功能
 * @param requestClose 接受請求關閉列表的回調函數
 * @returns 
 */
function useStockListOutsideClick(requestClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  // 处理外部点击清除结果列表
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const box = ref.current;
      if (!box) {
        return;
      }
      const target = e.target as Node;
      if (target !== box && !box.contains(target)) {
        requestClose();
      }
    }
    window.addEventListener('click', handleOutsideClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleOutsideClick, { capture: true });
    }
  }, [requestClose]);
  return { ref };
}
/**
 * 使用搜索股票的功能
 * @param keyword 關鍵字
 * @returns 
 */
function useSearchStocks(keyword: string) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // 处理输入框内容debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 250);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    if (!debouncedKeyword) {
      setStocks([]);
      return;
    }
    setLoading(true);
    const req = getStocks(debouncedKeyword);
    req.promise.then(res => {
      if (res.err) {
        enqueueSnackbar('請求數據失敗', { variant: 'error' });
      } else if (!res.data || !res.data.length) {
        enqueueSnackbar('未找到相關股票', { variant: 'info' });
      } else {
        setStocks(res.data);
      }
      setLoading(false);
    });
    return () => {
      req.abort()
    };
  }, [debouncedKeyword, enqueueSnackbar]);
  return { stocks, setStocks, loading };
}


/**
 * 股票搜索功能組件
 * @param props 
 * @returns 
 */
export default function SearchStock(props: SearchInputProps) {
  const [keyword, setKeyword] = useState('');
  const { stocks, loading, setStocks } = useSearchStocks(keyword);
  const clearStocks = useCallback(() => setStocks([]), [setStocks]);
  const { ref } = useStockListOutsideClick(clearStocks);

  const searchResult = (stocks && stocks.length === 0) ? null :
    <SearchStockResultList stocks={stocks} />

  return (
    <Box sx={{ position: 'relative', ...props.sx }} ref={ref}>
      <Snackbar />
      <Box sx={{
        position: 'relative',
        border: `1px solid ${useSecondBorderColor()}`,
        bgcolor: useSecondBgColor(),
        borderRadius: '4px',
      }}>
        <StyledInputBase
          placeholder="輸入台/美股代號，查看公司價值"
          inputProps={{ 'aria-label': 'search' }}
          value={keyword}
          onFocus={() => setKeyword('')}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        {loading && <LinearProgress sx={{ height: '1px' }} />}
      </Box>
      {searchResult}
    </Box >
  );
}
