import { combineReducers } from 'redux';
import account, { accountSaga } from './account';
import { all } from 'redux-saga/effects';
import axios from "axios";

// const BASE_URL = 'https://j7e203.p.ssafy.io/'
const BASE_URL = 'http://localhost:8080/'
const DEFAULT_ACCEPT_TYPE = 'application/json'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE


const rootReducer = combineReducers({
  account
});
export function* rootSaga() {
  yield all([accountSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;