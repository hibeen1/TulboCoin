import { combineReducers } from "redux";
import account from "./account";
import coinReducer from "./coin";
import { accountSaga } from "./accountSaga";
import { all } from "redux-saga/effects";
import axios from "axios";
import { coinSaga } from "./coinSaga";

let BASE_URL = "https://j7e203.p.ssafy.io/api/";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8080/api/";
  // BASE_URL = "http://localhost:3000/";
}

const DEFAULT_ACCEPT_TYPE = "application/json";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Content-Type"] = DEFAULT_ACCEPT_TYPE;

const rootReducer = combineReducers({
  account,
  coinReducer,
});
export function* rootSaga() {
  yield all([accountSaga(), coinSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
