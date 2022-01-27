import { lazy } from "react";
export interface RouterBase {
  // 路由路径
  path: string;
  // 路由组件
  element?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export const routers: RouterBase[] = [
  {
    path: "/dd",
    element: lazy(() => import("../views/error")),
    meta: {
      title: "系统路由",
    },
  },
];
