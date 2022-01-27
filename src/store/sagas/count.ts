import { put, takeEvery } from "redux-saga/effects";

import { AppEnum } from "../actionTypes";
/**
 * takeEvery 用于监听 redux
 */

function test() {
  return new Promise((r) => {
    setTimeout(() => {
      r({
        data: [{}],
      });
    }, 2000);
  });
}

// 监听 INCREASE 然后异步触发的函数
function* fetchUser(): any {
  // 模拟异步操作
  let getAjax = yield test();
  console.log("saga=========", getAjax);
  // let actions = {
  //     type: INCREASE,
  //     data: getAjax.data.list,
  // };
  // 提交这个actions 到store里面，和在reducer里面提交是一样的
  // put 用来发起 dispatch 触发 reducer
  // yield put({ type: DECREASE, data:1 });
}

export default function* countSaga() {
  // 很重要的一点，进行捕获 组件里面发出的tyepe类型
  yield takeEvery(AppEnum.ROUTESLIST, fetchUser);
}
