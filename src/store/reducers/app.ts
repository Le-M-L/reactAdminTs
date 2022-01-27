import { AppEnum } from "../actionTypes";

export interface DefaultState {
  test: string;
}

interface AppAction {
  type: AppEnum;
  value: any;
}

const defaultState: DefaultState = {
  test: "测试",
};

const routeMenu = (state = defaultState, action: AppAction) => {
  // let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case AppEnum.ROUTESLIST:
  return { ...state,...action.value };
    case AppEnum.SETPAGELOADING:
      return { ...state,...action.value };
    default:
      break;
  }
  return state;
};

export default routeMenu;
