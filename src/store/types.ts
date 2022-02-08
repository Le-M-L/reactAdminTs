import { AppState } from "./module/app/types";

export interface IStoreState {
  app: AppState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
