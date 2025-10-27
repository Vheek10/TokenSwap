'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Box,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  SwapVert as SwapIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { ArrowDownUp, Zap, Moon, Sun } from 'lucide-react';
import TokenSelector from './TokenSelector';
import SettingsPanel from './SettingsPanel';
import { useTokens, useTokenPrice } from '@/hooks/useTokens';
import { useTheme } from '@/contexts/ThemeContext';

// DarkModeToggle component inline
const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleDarkMode}
        className={`
          transition-all duration-300 ease-in-out
          ${darkMode 
            ? 'text-yellow-400 hover:bg-yellow-400/10' 
            : 'text-purple-600 hover:bg-purple-600/10'
          }
        `}
        size="small"
      >
        {darkMode ? (
          <Sun size={20} className="transition-transform hover:rotate-45" />
        ) : (
          <Moon size={20} className="transition-transform hover:rotate-12" />
        )}
      </IconButton>
    </Tooltip>
  );
};

const SwapInterface = () => {
  const { darkMode } = useTheme();
  const { tokens, loading: tokensLoading } = useTokens();
  const [fromToken, setFromToken] = useState('ethereum');
  const [toToken, setToToken] = useState('usd-coin');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [slippage, setSlippage] = useState(1.0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [expertMode, setExpertMode] = useState(false);

  const { exchangeRate, loading: priceLoading } = useTokenPrice(fromToken, toToken);

  // ... rest of your SwapInterface component code remains the same
  // [Keep all the existing code from your SwapInterface component]