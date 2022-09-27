// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { signupApi, fetchUserApi, loginApi } from './api'

import { login, logout, fetchUser, changeIsLoggedIn } from './account';


// 액션의 타입
const LOGIN_ASYNC = 'LOGIN_ASYNC';
const LOGOUT_ASYNC = 'LOGOUT_ASYNC'
const SIGNUP_ASYNC = 'SIGNUP_ASYNC'
const FETCH_USER_ASYNC = 'FETCH_USER_ASYNC'
const CATCH_LOGIN = 'CATCH_LOGIN' // token이 있는지 확인해서 로그인 여부 변경


// 액션 생성 함수 만들기
export const loginAsync = (form) => ({ type: LOGIN_ASYNC, meta: form });
export const logoutAsync = () => ({ type: LOGOUT_ASYNC })
export const signupAsync = body => ({ type: SIGNUP_ASYNC, meta: body })
export const fetchUserAsync = (userId) => ({ type: FETCH_USER_ASYNC, meta: userId })
export const catchLogin = () => ({ type: CATCH_LOGIN })

// 로그인 되었는지 확인
function* catchLoginSaga() {
  if (localStorage.token !== undefined) {
    yield put(changeIsLoggedIn(true))
  } else {
    yield put(changeIsLoggedIn(false))
  }
}
// 로그인 되었는지 확인 끝

// 로그인 시작
function* loginSaga(action) {
  const body = action.meta
  try{
    const response = yield call(loginApi, body)
    if (response.status === 200) {
      console.log(response.data)
      yield put(login(response.data)); // put은 특정 액션을 디스패치 해줍니다.
    }
  } catch (error) {
    console.log(error)
  }
  yield put(catchLogin())
}
// 로그인 끝

// 로그아웃
function* logoutSaga() {
  yield put(logout())
  yield put(catchLogin())
}
// 로그아웃 끝

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
  yield takeLatest(CATCH_LOGIN, catchLoginSaga)
  yield takeLatest(LOGOUT_ASYNC, logoutSaga)
}