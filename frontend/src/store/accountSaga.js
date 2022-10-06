// delay : ms간 대기
// put : 특정 액션 디스패치
// takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
// takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리
import { call, delay, put, takeLatest } from "redux-saga/effects";
import Swal from 'sweetalert2'
import {
  signupApi,
  fetchUserApi,
  loginApi,
  putUserApi,
  deleteApi,
  fetchWalletApi,
  resetWalletApi,
  rankingApi,
  historyApi,
  fetchOtherUserApi,
  fetchLikedCoinApi,
  coinLikeApi,
  coinLikeDeleteApi
} from "./api";
import {
  logout,
  fetchUser,
  changeIsLoggedIn,
  token,
  fetchWallet,
  fetchRanking,
  fetchHistory,
  fetchOtherUser,
  fetchMyHistory,
  fetchLikedCoin
} from "./account";

// 액션의 타입
const CATCH_LOGIN = "CATCH_LOGIN"; // token이 있는지 확인해서 로그인 여부 변경
const LOGIN_ASYNC = "LOGIN_ASYNC";
const LOGOUT_ASYNC = "LOGOUT_ASYNC";
const SIGNUP_ASYNC = "SIGNUP_ASYNC";
const PUT_USER_ASYNC = "PUT_USER_ASYNC"; // 유저 정보 수정
const FETCH_USER_ASYNC = "FETCH_USER_ASYNC";
const DELETE_USER_ASYNC = "DELETE_USER_ASYNC"; // 회원탈퇴
const FETCH_WALLET_ASYNC = "FETCH_WALLET_ASYNC"; // 지갑정보 가져오기
const RESET_WALLET_ASYNC = "RESET_WALLET_ASYNC";
const RANKING_ASYNC = "RANKING_ASYNC";
const HISTORY_ASYNC = "HISTORY_ASYNC";
const FETCH_OTHER_USER_ASYNC = "FETCH_OTHER_USER_ASYNC";
const FETCH_MY_HISTORY_ASYNC = 'FETCH_MY_HISTORY_ASYNC'
const FETCH_LIKED_COIN_ASYNC = 'FETCH_LIKED_COIN_ASYNC'
const COIN_LIKE_ASYNC = 'COIN_LIKE_ASYNC'
const COIN_LIKE_DELETE_ASYNC = 'COIN_LIKE_DELETE_ASYNC'

// 액션 생성 함수 만들기
export const loginAsync = (form) => ({ type: LOGIN_ASYNC, meta: form });
export const logoutAsync = () => ({ type: LOGOUT_ASYNC });
export const signupAsync = (body) => ({ type: SIGNUP_ASYNC, meta: body });
export const catchLogin = () => ({ type: CATCH_LOGIN });
export const putUserAsync = (form) => ({ type: PUT_USER_ASYNC, meta: form });
export const fetchUserAsync = () => ({ type: FETCH_USER_ASYNC });
export const deleteUserAsync = () => ({ type: DELETE_USER_ASYNC });
export const fetchWalletAsync = () => ({ type: FETCH_WALLET_ASYNC });
export const resetWalletAsync = () => ({ type: RESET_WALLET_ASYNC });
export const rankingAsync = () => ({ type: RANKING_ASYNC });
export const historyAsync = (body) => ({ type: HISTORY_ASYNC, meta: body });
export const fetchOtherUserAsync = (body) => ({ type: FETCH_OTHER_USER_ASYNC, meta: body });
export const fetchMyHistoryAsync = (userId) => ({ type: FETCH_MY_HISTORY_ASYNC, meta:userId})
export const fetchLikedCoinAsync = () => ({ type: FETCH_LIKED_COIN_ASYNC })
export const coinLikeAsync = (body) => ({ type: COIN_LIKE_ASYNC, meta: body})
export const coinLikeDeleteAsync = (body) => ({ type: COIN_LIKE_DELETE_ASYNC, meta: body})


// 로그인 되었는지 확인
function* catchLoginSaga() {
  if (localStorage.token !== undefined) {
    yield put(changeIsLoggedIn(true));
  } else {
    yield put(changeIsLoggedIn(false));
  }
}
// 로그인 되었는지 확인 끝

// 로그인 시작
function* loginSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(loginApi, body);
    if (response.status === 200) {
      yield put(token(response.data));
      yield put(fetchWalletAsync());
      yield put(fetchLikedCoinAsync())
      yield put(fetchUser(response.data)); // put은 특정 액션을 디스패치 해줍니다.
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
  yield put(catchLogin());
}
// 로그인 끝

// 로그아웃
function* logoutSaga() {
  yield put(logout());
  yield put(catchLogin());
}
// 로그아웃 끝

// 회원가입 시작시키기
function* signupSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(signupApi, body);
    if (response.status === 200) {
      yield Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
      })
      yield put(loginAsync({userId: body.userId, password: body.password}))
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 회원가입 끝

// 내 정보 수정
function* putUserSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(putUserApi, body);
    if (response.status === 200) {
      yield put(fetchUserAsync());
      yield Swal.fire({
        icon: 'success',
        title: '변신 완료!!',
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 내 정보 수정 끝

// 내 정보 받아오기
function* fetchUserSaga() {
  try {
    const response = yield call(fetchUserApi);
    if (response.status === 200) {
      yield put(fetchUser(response.data));
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 내 정보 받아오기 끝

// 회원탈퇴
function* deleteUserSaga() {
  try {
    const response = yield call(deleteApi);
    if (response.status === 200) {
      yield put(logoutAsync());
      yield Swal.fire(
        '탈퇴완료',
        '회원탈퇴되었습니다',
        'success'
        )
      }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 회원탈퇴 끝
  
// 지갑 정보 가져오기
function* fetchWalletSaga() {
  try {
    const response = yield call(fetchWalletApi);
    if (response.status === 200) {
      yield put(fetchWallet(response.data));
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 지갑 정보 가져오기 끝

// 지갑 리셋
function* resetWalletSaga() {
  try {
    const response = yield call(resetWalletApi);
    if (response.status === 200) {
      yield put(fetchUserAsync())
      yield put(fetchWalletAsync())
      yield put(fetchMyHistoryAsync(JSON.parse(localStorage.getItem('user')).userId))
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '오류!!',
      text: `${error.response.data.message}`,
    })
  }
}
// 지갑 리셋 끝

function* rankingSaga() {
  try {
    const response = yield call(rankingApi);
    if (response.status === 200) {
      yield put(fetchRanking(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* historySaga(action) {
  const body = action.meta;
  try {
    const response = yield call(historyApi, body);
    if (response.status === 200) {
      yield put(fetchHistory(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchOtherUserSaga(action) {
  const body = action.meta;
  try {
    const response = yield call(fetchOtherUserApi, body);
    if (response.status === 200) {
      yield put(fetchOtherUser(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

// 내 거래기록
function* fetchMyHistorySaga(action) {
  try{
    const response = yield call(historyApi, action.meta)
    if (response.status === 200) {
      yield put(fetchMyHistory(response.data))
    }
  } catch(error) {
    console.log(error)
  }
}
// 내 거래기록 끝

// 관심코인 가져오기
function* fetchLikedCoinSaga() {
  try{
    const response = yield call(fetchLikedCoinApi)
    if (response.status === 200) {
      yield put(fetchLikedCoin(response.data))
    }
  } catch(error) {
    console.log(error)
  }
}
// 관심코인 가져오기 끝

// 관심코인 등록
function* coinLikeSaga(action) {
  const body = action.meta
  try{
    const response = yield call(coinLikeApi, body)
    if (response.status === 200) {
      yield put(fetchLikedCoinAsync())
    }
  } catch(error) {
    console.log(error)
  }
}
// 관심코인 등록 끝

// 관심코인 삭제
function* coinLikedDeleteSaga(action) {
  const body = action.meta
  try{
    const response = yield call(coinLikeDeleteApi, body)
    if (response.status === 200) {
      yield put(fetchLikedCoinAsync())
    }
  } catch(error) {
    console.log(error)
  }
}
// 관심코인 삭제 끝

export function* accountSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(LOGIN_ASYNC, loginSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(SIGNUP_ASYNC, signupSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
  yield takeLatest(FETCH_USER_ASYNC, fetchUserSaga); // 가장 마지막으로 디스패치된 FETCH_USER_ASYNC 액션만을 처리
  yield takeLatest(CATCH_LOGIN, catchLoginSaga);
  yield takeLatest(LOGOUT_ASYNC, logoutSaga);
  yield takeLatest(PUT_USER_ASYNC, putUserSaga); // 유저정보 수정
  yield takeLatest(DELETE_USER_ASYNC, deleteUserSaga); // 회원탈퇴
  yield takeLatest(FETCH_WALLET_ASYNC, fetchWalletSaga); // 지갑정보 다시 불러오기
  yield takeLatest(RESET_WALLET_ASYNC, resetWalletSaga); // 지갑 리셋
  yield takeLatest(RANKING_ASYNC, rankingSaga); // 지갑 리셋
  yield takeLatest(HISTORY_ASYNC, historySaga); // 지갑 리셋
  yield takeLatest(FETCH_OTHER_USER_ASYNC, fetchOtherUserSaga); // 지갑 리셋
  yield takeLatest(FETCH_MY_HISTORY_ASYNC, fetchMyHistorySaga)
  yield takeLatest(FETCH_LIKED_COIN_ASYNC, fetchLikedCoinSaga)
  yield takeLatest(COIN_LIKE_ASYNC, coinLikeSaga)
  yield takeLatest(COIN_LIKE_DELETE_ASYNC, coinLikedDeleteSaga)
}