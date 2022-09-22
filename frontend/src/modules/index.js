import { combineReducers } from 'redux';
import account, { accountSaga } from './account';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  account
});
export function* rootSaga() {
  yield all([accountSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;