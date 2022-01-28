import { AppStoreEnum } from "../actionTypes";

export interface DefaultState {
  test: string;
}
interface AppStore{
  type: 'ROUTESLIST' | 'SETPAGELOADING';
  value: any;
}

const defaultState: DefaultState = {
  test: "测试",
};

const routeMenu = (state = defaultState, action: AppStore) => {
  // let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case AppStoreEnum.ROUTESLIST:
  return { ...state,...action.value };
    case AppStoreEnum.SETPAGELOADING:
      return { ...state,...action.value };
    default:
      break;
  }
  return state;
};

export default routeMenu;
