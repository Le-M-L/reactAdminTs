import { AppStoreEnum } from "../actionTypes";

// 设置 路由菜单
export const setRoutesList = (value:any) => ({
  type: AppStoreEnum.ROUTESLIST,
  value,
});

export const setPageLoading = (value: any) => ({
  type: AppStoreEnum.SETPAGELOADING,
  value,
});
