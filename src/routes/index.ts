
// layout 
import {HeaderOnly} from "../components/Layout/"

// modules

// pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import About from "../pages/About"

//------------------------
// 
//------------------------

const publicRoutes = [
  {path: "/", component: Home},
  {path: "/login", component: Login, layout: null},
  {path: "/About", component: About, layout: HeaderOnly},
  {path: "*", component: NotFound},
]

const privateRoutes = []

export {publicRoutes, privateRoutes}