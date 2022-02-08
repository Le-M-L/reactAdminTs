import { Reducer } from "redux";
import { Persistent } from "@/utils/cache/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { IAction } from "../../types";
import { deepMerge } from "@/utils";
import type { AppState } from "./types";
import { AppStoreEnum } from "./actionType"

/** 初始状态 */
const appState: AppState = {
  projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
};

/** 处理函数 */
const appReducer: Reducer<AppState, IAction<any>> = (
  state = appState,
  action: IAction<any>
) => {
  const { type, payload } = action;
  switch (type) {
    case AppStoreEnum.ROUTESLIST:
      return { ...state, ...payload };
    case AppStoreEnum.SETPAGELOADING:
      return { ...state, ...payload };
    case AppStoreEnum.SETPROJECTCONFIG:
      let projectConfig = deepMerge(state.projectConfig || {}, payload);
      Persistent.setLocal(PROJ_CFG_KEY, projectConfig);
      return { ...state, projectConfig };
    default:
  }

  return {
    ...state,
  };
};

export default appReducer;
