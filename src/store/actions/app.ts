import { AppEnum } from "../actionTypes";

// 设置 路由菜单
export const setRoutesList = (value: any) => ({
  type: AppEnum.ROUTESLIST,
  value,
});

export const setPageLoading = (value: any) => ({
  type: AppEnum.SETPAGELOADING,
  value,
});
