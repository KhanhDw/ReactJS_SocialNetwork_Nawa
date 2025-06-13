
// layout 
import {HeaderOnly} from "../components/Layout/"

// modules

// pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Profile from "@/pages/Profile"
import Shopping from "../pages/Shopping"

//------------------------
// 
//------------------------

const publicRoutes = [
  // {path: "/", component: Home},
  {path: "/", component: Home, layout: HeaderOnly},
  {path: "/chat", component: Home, layout: HeaderOnly},
  {path: "/following", component: Home, layout: HeaderOnly},
  {path: "/learning", component: Home, layout: HeaderOnly},
  {path: "/community", component: Home, layout: HeaderOnly},
  {path: "/login", component: Signin, layout: null},
  {path: "/signup", component: Signup, layout: null},
  {path: "/shopping", component: Shopping, layout: HeaderOnly},
  {path: "/profile", component: Profile, layout: HeaderOnly},
  {path: "*", component: NotFound, layout: null},
]

const privateRoutes = []

export {publicRoutes, privateRoutes}