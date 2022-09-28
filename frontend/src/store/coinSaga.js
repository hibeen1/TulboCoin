import { call, takeLatest } from "redux-saga/effects";
import { buyApi } from "./api";
const BUY_ASYNC = "BUY_ASYNC";

export const buyAsync = (body) => ({ type: BUY_ASYNC, meta: body });

function* buySaga(action) {
  const body = action.meta;
  try {
    const response = yield call(buyApi, body);
    if (response.status === 200) {
      console.log("asdfasdfasdfasdfasdfasd", response.data);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* coinSaga() {
  yield takeLatest(BUY_ASYNC, buySaga);
}
