import { combineReducers } from 'redux';
import account, { accountSaga } from './account';
import {testSagaModule} from './test'
import { all } from 'redux-saga/effects';
import axios from "axios";


// let BASE_URL = 'https://j7e203.p.ssafy.io/'
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://localhost:8080/'
// }
const BASE_URL = 'http://localhost:8080/api/'

const DEFAULT_ACCEPT_TYPE = 'application/json'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE


const rootReducer = combineReducers({
  account
});
export function* rootSaga() {
  yield all([accountSaga(), testSagaModule()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;