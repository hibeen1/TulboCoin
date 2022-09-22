// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션의 타입
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOGIN_ASYNC = 'LOGIN_ASYNC';

// 액션 생성 함수 만들기
export const login = () => ({ type: LOGIN })
export const logout = () => ({ type: LOGOUT })
export const loginAsync = () => ({ type: LOGIN_ASYNC });

function* loginSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(login()); // put은 특정 액션을 디스패치 해줍니다.
}

export function* accountSaga() {
  yield console.log('어싱크')
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(LOGIN_ASYNC, loginSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 초기 값
const initialState = {
  isLoggedin: false,
  token: ''
}

// 리듀서 선언
export default function account(state = initialState, action) {
  console.log('리듀서')
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedin: !state.isLoggedin
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedin: !state.isLoggedin
      };
    default:
      return state;
  }
}