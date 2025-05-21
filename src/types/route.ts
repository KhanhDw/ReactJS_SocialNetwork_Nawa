// modules
import type { JSX, ReactNode } from "react";

export type RouteType = {
  path: string;
  component: () => JSX.Element;
  layout?: (({ children }: { children: ReactNode }) => JSX.Element) | null;
};