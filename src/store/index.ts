/**
 *  createStore 创建store
 *  applyMiddleware 添加插件
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
//纯函数
import rootReducer from './modules';
import rootSaga from './sagas';
// 持久化插件
// import storage from 'redux-persist/lib/storage';

// 引入中间件
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
//创建redux
const store = createStore(rootReducer, enhancer);

// 必须有个run函数，才能可以访问
sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store)

export default store;