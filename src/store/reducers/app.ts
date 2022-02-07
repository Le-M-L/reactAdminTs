import { Persistent } from "@/utils/cache/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { AppStoreEnum } from "../actionTypes";
import type { ProjectConfig } from "#/config";
export interface AppState {
  projectConfig: ProjectConfig | null;
}
interface AppStore {
  type: AppStoreEnum;
  value: any;
}

const defaultState: AppState = {
  projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
};

const routeMenu = (state = defaultState, action: AppStore) => {
  // let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case AppStoreEnum.ROUTESLIST:
      return { ...state, ...action.value };
    case AppStoreEnum.SETPAGELOADING:
      return { ...state, ...action.value };
    case AppStoreEnum.SETPROJECTCONFIG:
      console.log(action);
      return { ...state, ...action.value };
    default:
  }
  return state;
};

export default routeMenu;
