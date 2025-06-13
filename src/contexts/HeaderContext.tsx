// src/contexts/HeaderContext.tsx
import { createContext, type ReactNode } from 'react';

export interface HeaderScrollProps {
  isScrolled_top: number;
  isScrolled_height: string;
}

const HeaderContext = createContext<HeaderScrollProps | undefined>(undefined);

export const HeaderProvider: React.FC<HeaderScrollProps & { children: ReactNode }> = ({
  children,
  isScrolled_top,
  isScrolled_height,
}) => (
  <HeaderContext.Provider value={{ isScrolled_top, isScrolled_height }}>
    {children}
  </HeaderContext.Provider>
);

export default HeaderContext;