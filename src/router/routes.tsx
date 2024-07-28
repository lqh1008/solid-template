import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import { Navigate } from '@solidjs/router';
// const navigate =  useNavigate()

export const routes: RouteDefinition[] = [
  {
    path: "/",
    // preload:()=>{
    //   console.log(1111);
    //   // navigate('/users')
    // }
    component: () =>
      <Navigate href={() => {
        return "/users"
      }} />
  },
  {
    path: "/users",
    component: lazy(() => import("@/pages/users.tsx")),
  },
  {
    path: "/users/:id",
    component: lazy(() => import("@/pages/users/[id].tsx")),
    children: [
      {
        path: "/",
        component: lazy(() => import("@/pages/users/[id]/index.tsx")),
      },
      {
        path: "/settings",
        component: lazy(() => import("@/pages/users/[id]/settings.tsx")),
      },
      // {
      //   path: "/*all",
      //   component: lazy(() => import("/pages/users/[id]/[...all].js")),
      // },
    ],
  },
  //   {
  //     path: "/",
  //     component: lazy(() => import("/pages/index.js")),
  //   },
  //   {
  //     path: "/*all",
  //     component: lazy(() => import("/pages/[...all].js")),
  //   },
];