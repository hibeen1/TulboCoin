import { call, delay, put, takeLatest } from "redux-saga/effects";
import { buyApi } from "./api";
import { fetchWalletAsync, fetchUserAsync } from './accountSaga'

const BUY_ASYNC = "BUY_ASYNC";

export const buyAsync = (body) => ({ type: BUY_ASYNC, meta: body });

function* buySaga(action) {
  const body = action.meta;
  console.log('body', body)
  try {
    const response = yield call(buyApi, body);
    if (response.status === 200) {
      yield put(fetchUserAsync());
      yield delay(fetchWalletAsync(), 500)
    }
  } catch (error) {
    console.log(error);
  }
}

export function* coinSaga() {
  yield takeLatest(BUY_ASYNC, buySaga);
}
