
// layout 
import {HeaderOnly} from "../components/Layout/"

// modules
import type { JSX, ReactNode } from "react";

// pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import About from "../pages/About"

//------------------------
// 
//------------------------

export type RouteType = {
  path: string;
  component: () => JSX.Element;
  layout?: (({ children }: { children: ReactNode }) => JSX.Element) | null;
};

const publicRoutes = [
  {path: "/", component: Home},
  {path: "/About", component: About, layout: HeaderOnly},
  {path: "/login", component: Login, layout: null},
  {path: "*", component: NotFound},
]

const privateRoutes = []

export {publicRoutes, privateRoutes}