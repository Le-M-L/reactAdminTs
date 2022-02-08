/**
 *  createStore 创建store
 *  applyMiddleware 添加插件
 */
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Reducer,
} from "redux";
import createSagaMiddleware from "redux-saga";
//纯函数
import rootSaga from "./sagas";
import { IStoreState, IAction } from "./types";
import { appReducer } from "./module/app";
// 持久化插件
// import storage from 'redux-persist/lib/storage';

const rootReducer: Reducer<
  IStoreState,
  IAction<any>
> = combineReducers<IStoreState>({
  // routeMenu,
  app: appReducer,
});

// 引入中间件
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
//创建redux
const store = createStore(rootReducer, enhancer);

// 必须有个run函数，才能可以访问
sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store)

export default store;
