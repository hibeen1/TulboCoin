// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { signupApi, fetchUserApi } from './api'

import { login, fetchUser } from './account';


// 액션의 타입
const LOGIN_ASYNC = 'LOGIN_ASYNC';
const SIGNUP_ASYNC = 'SIGNUP_ASYNC'
const FETCH_USER_ASYNC = 'FETCH_USER_ASYNC'

// 액션 생성 함수 만들기
export const loginAsync = () => ({ type: LOGIN_ASYNC });
export const signupAsync = body => ({ type: SIGNUP_ASYNC, meta: body })
export const fetchUserAsync = (userId) => ({ type: FETCH_USER_ASYNC, meta: userId })

function* loginSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(login()); // put은 특정 액션을 디스패치 해줍니다.
}

// 회원가입 시작시키기
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
// 회원가입 끝

// 유저정보 받아오기
function* fetchUserSaga(action) {
  const userId = action.meta
  try{
    const response = yield call(fetchUserApi, userId)
    if (response.status === 200) {
      yield put(fetchUser(response.data))
    }
  } catch (error) {
    console.log(error)
  }
}
// 유저정보 받아오기 끝

export function* accountSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(LOGIN_ASYNC, loginSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(SIGNUP_ASYNC, signupSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(FETCH_USER_ASYNC, fetchUserSaga); // 가장 마지막으로 디스패치된 FETCH_USER_ASYNC 액션만을 처리
}