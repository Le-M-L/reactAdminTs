import { all } from 'redux-saga/effects';
// import count from "./count"

// 监听多个 saga
export default function* rootSaga() {
    yield all([
        // count(),
    ])
  }