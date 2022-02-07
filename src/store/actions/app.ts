import { ROUTESLIST, SETPAGELOADING, SETPROJECTCONFIG } from "../actionTypes";
import { ProjectConfig } from "#/config";


// 设置 路由菜单
export const setRoutesList = (value: any) => ({
  type: ROUTESLIST,
  value,
});

export const setPageLoading = (value: any) => ({
  type: SETPAGELOADING,
  value,
});

// 设置项目配置
export const setProjectConfig = (value: DeepPartial<ProjectConfig>) => ({
  type: SETPROJECTCONFIG,
  value,
});
