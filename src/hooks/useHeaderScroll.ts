// src/hooks/useHeaderScroll.ts
import { useContext } from 'react';
import HeaderContext, { type HeaderScrollProps } from '../contexts/HeaderContext';

export const useHeaderScroll = (): HeaderScrollProps => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderScroll must be used within a HeaderProvider');
  }
  return context;
};