import { combineReducers } from "redux";
import app from "./app";

export interface RootReducer {
  app: any;
}

// import routeMenu from "./routeMenu"
const rootReducer: RootReducer = {
  // routeMenu,
  app,
};

export const createReducer = (asyncReducers: any) =>
  combineReducers({
    ...rootReducer,
    ...asyncReducers,
  });
export default combineReducers(rootReducer);
