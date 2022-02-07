import { combineReducers, Reducer } from "redux";
import { IStoreState, IAction } from "./types"
import appState from "./app";


// import routeMenu from "./routeMenu"
const rootReducer: Reducer<IStoreState, IAction<any>> = {
  // routeMenu,
  app:appState,
};

export const createReducer = (asyncReducers: any) =>
  combineReducers({
    ...rootReducer,
    ...asyncReducers,
  });
export default combineReducers(rootReducer);
