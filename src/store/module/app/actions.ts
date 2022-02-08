import { AppStoreEnum } from "./actionType";
import type { ProjectConfig } from "#/config";

/** 设置路由菜单 */
export const setRoutesList = (payload: any) => ({
  type: AppStoreEnum.ROUTESLIST,
  payload,
});
/** 设置页面加载 */
export const setPageLoading = (payload: any) => ({
  type: AppStoreEnum.SETPAGELOADING,
  payload,
});

/** 设置项目配置 */
export const setProjectConfig = (payload: DeepPartial<ProjectConfig>) => ({
  type: AppStoreEnum.SETPROJECTCONFIG,
  payload,
});
