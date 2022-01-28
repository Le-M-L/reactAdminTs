import { lazy } from "react";
import type { AppRouteRecordRaw } from "@/router/types";
import { PAGE_NOT_FOUND_NAME } from "@/router/constant";
// 404 页面
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "*",
  name: PAGE_NOT_FOUND_NAME,
  element: lazy(() => import("@/views/sys/exception")),
  meta: {
    title: "404页面",
  },
};
