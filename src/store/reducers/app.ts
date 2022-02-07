import { Reducer } from 'redux';
import { Persistent } from "@/utils/cache/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { AppStoreEnum } from "../actionTypes";
import { deepMerge } from '@/utils';
import type { ProjectConfig } from "#/config";
import { IAction } from './types';

export interface AppState {
  projectConfig: ProjectConfig | null;
}

const defaultState: AppState = {
  projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
};

const routeMenu: Reducer<AppState, IAction<any>>  = (state = defaultState, action: IAction<any>) => {
  // let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case AppStoreEnum.ROUTESLIST:
      return { ...state, ...action.value };
    case AppStoreEnum.SETPAGELOADING:
      return { ...state, ...action.value };
    case AppStoreEnum.SETPROJECTCONFIG:
      let projectConfig = deepMerge(state.projectConfig || {}, action.value)
      Persistent.setLocal(PROJ_CFG_KEY, projectConfig);
      return { ...state, projectConfig };
    default:
  }
  return state;
};

export default routeMenu;
