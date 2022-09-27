// 액션의 타입
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const FETCH_USER = 'FETCH_USER'
const CHANGE_IS_LOGGED_IN = 'CHANGE_IS_LOGGEN_IN'

// 액션 생성 함수 만들기
export const changeIsLoggedIn = (data) => ({ type: CHANGE_IS_LOGGED_IN, meta: data })
export const login = (data) => ({ type: LOGIN, meta: data })
export const logout = () => ({ type: LOGOUT })
export const fetchUser = (user) => ({ type: FETCH_USER, meta: user})

// 초기 값
const initialState = {
  isLoggedin: false,
  token: '',
  user: {}
}

// 리듀서 선언
export default function account(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedin: action.meta,
      }
    case LOGIN:
      localStorage.setItem('token', action.meta.accessToken)
      localStorage.setItem('user', JSON.stringify(action.meta.user))
      return {
        ...state
      };
    case LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.meta
      }
    default:
      return state;
  }
}