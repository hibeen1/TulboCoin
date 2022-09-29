// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { signupApi, fetchUserApi, loginApi, putUserApi, deleteApi, fetchWalletApi } from './api'
import { logout, fetchUser, changeIsLoggedIn, token, fetchWallet } from './account';

// 액션의 타입
const CATCH_LOGIN = 'CATCH_LOGIN' // token이 있는지 확인해서 로그인 여부 변경
const LOGIN_ASYNC = 'LOGIN_ASYNC';
const LOGOUT_ASYNC = 'LOGOUT_ASYNC'
const SIGNUP_ASYNC = 'SIGNUP_ASYNC'
const PUT_USER_ASYNC = 'PUT_USER_ASYNC' // 유저 정보 수정
const FETCH_USER_ASYNC = 'FETCH_USER_ASYNC'
const DELETE_USER_ASYNC = 'DELETE_USER_ASYNC' // 회원탈퇴
const FETCH_WALLET_ASYNC = 'FETCH_WALLET_ASYNC' // 지갑정보 가져오기


// 액션 생성 함수 만들기
export const loginAsync = (form) => ({ type: LOGIN_ASYNC, meta: form });
export const logoutAsync = () => ({ type: LOGOUT_ASYNC })
export const signupAsync = body => ({ type: SIGNUP_ASYNC, meta: body })
export const catchLogin = () => ({ type: CATCH_LOGIN })
export const putUserAsync = (form) => ({ type: PUT_USER_ASYNC, meta: form })
export const fetchUserAsync = () => ({ type: FETCH_USER_ASYNC })
export const deleteUserAsync = () => ({ type: DELETE_USER_ASYNC })
export const fetchWalletAsync = () => ({ type: FETCH_WALLET_ASYNC })

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
      yield put(token(response.data))
      yield put(fetchUser(response.data)); // put은 특정 액션을 디스패치 해줍니다.
      yield put(fetchWalletAsync())
      yield delay(window.location.replace('/sise'), 1000)
    }
  } catch (error) {
    alert(error.response.data.message)
    // console.log(error.data.message)
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
    alert(error.response.data.message)
  }
}
// 회원가입 끝

// 내 정보 수정
function* putUserSaga(action) {
  const body = action.meta
  console.log(body)
  try{
    const response = yield call(putUserApi, body)
    if (response.status === 200) {
      yield put(fetchUserAsync())
      yield delay(window.location.reload(), 1000)
    }
  } catch (error) {
    alert(error.response.data.message)
    // console.log(error)
  }
}
// 내 정보 수정 끝

// 내 정보 받아오기
function* fetchUserSaga() {
  console.log('fetchUserAsync가 작동')
  try{
    const response = yield call(fetchUserApi)
    if (response.status === 200) {
      yield put(fetchUser(response.data))
    }
  } catch (error) {
    alert(error.response.data.message)
  }
}
// 내 정보 받아오기 끝

// 회원탈퇴
function* deleteUserSaga() {
  if (window.confirm('정말로 회원탈퇴 하시겠습니까?')) {
    try{
      const response = yield call(deleteApi)
      if (response.status === 200) {
        yield put(logoutAsync())
        yield alert('회원탈퇴되었습니다')
        yield window.location.replace('/')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  } else {
    alert('당신은 방금 털보를 배신할 뻔 했습니다.')
  }
}
// 회원탈퇴 끝

// 지갑 정보 가져오기
function* fetchWalletSaga() {
  try{
    const response = yield call(fetchWalletApi)
    if (response.status === 200) {
      yield put(fetchWallet(response.data))
    }
  } catch (error) {
    console.log(error)
  }
}
// 지갑 정보 가져오기 끝

export function* accountSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(LOGIN_ASYNC, loginSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(SIGNUP_ASYNC, signupSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(FETCH_USER_ASYNC, fetchUserSaga); // 가장 마지막으로 디스패치된 FETCH_USER_ASYNC 액션만을 처리
  yield takeLatest(CATCH_LOGIN, catchLoginSaga)
  yield takeLatest(LOGOUT_ASYNC, logoutSaga)
  yield takeLatest(PUT_USER_ASYNC, putUserSaga) // 유저정보 수정
  yield takeLatest(DELETE_USER_ASYNC, deleteUserSaga) // 회원탈퇴
  yield takeLatest(FETCH_WALLET_ASYNC, fetchWalletSaga) // 회원탈퇴
}