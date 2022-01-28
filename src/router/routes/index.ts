import { lazy } from "react";
import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";
import { PageEnum } from "@/enums/pageEnum";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";

const modules = (require as any).context("./modules", false, /.ts$/);
const routeModuleList: AppRouteModule[] = [];
modules.keys().forEach((key: string) => {
  let mod = modules(key)?.default;
  routeModuleList.push(mod);
});

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const loginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  element: lazy(() => import("@/views/sys/Login")),
  meta: {
    title: "登录",
  },
};

export const basicRoutes = [
  loginRoute,
  RootRoute,
  ...routeModuleList,
  PAGE_NOT_FOUND_ROUTE,
];
