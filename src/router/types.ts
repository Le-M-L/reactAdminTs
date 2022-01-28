export interface RouteMeta {
  title: string;
  icon?: string;
}
export interface AppRouteRecordRaw {
  path: string; // 路由路径
  name: string;
  meta: RouteMeta;
  element?: any; // 路由地址或者组件
  redirect?: string;
  auth?: boolean;
  children?: AppRouteRecordRaw[];
}

export type AppRouteModule = AppRouteRecordRaw;
