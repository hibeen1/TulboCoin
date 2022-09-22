// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { signupApi } from '../store/api'

// 액션의 타입
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOGIN_ASYNC = 'LOGIN_ASYNC';
const SIGNUP_ASYNC = 'SIGNUP_ASYNC'

// 액션 생성 함수 만들기
export const login = () => ({ type: LOGIN })
export const logout = () => ({ type: LOGOUT })
export const loginAsync = () => ({ type: LOGIN_ASYNC });
export const signupAsync = body => ({ type: SIGNUP_ASYNC, meta: body })

function* loginSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(login()); // put은 특정 액션을 디스패치 해줍니다.
}

function* signupSaga(action) {
  const body = action.meta
  try{
    const response = yield call(signupApi, body)
    if (response.status === 200) {
      alert('회원가입 성공')
    }
  } catch (error) {
    console.log(error)
  }
}

export function* accountSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(LOGIN_ASYNC, loginSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(SIGNUP_ASYNC, signupSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 초기 값
const initialState = {
  isLoggedin: false,
  token: ''
}

// 리듀서 선언
export default function account(state = initialState, action) {
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