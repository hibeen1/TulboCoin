// 액션의 타입
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const FETCH_USER = 'FETCH_USER'

// 액션 생성 함수 만들기
export const login = () => ({ type: LOGIN })
export const logout = () => ({ type: LOGOUT })
export const fetchUser = (user) => ({ type: FETCH_USER, meta: user})

// 초기 값
const initialState = {
  isLoggedin: false,
  token: '',
  user: {
    // balance: null,
    // email: "",
    // imagePath: "",
    // password: "",
    // userId: "",
    // userSeq: null,
    // walletList: [
    //   {
    //     coinAmount: null,
    //     coinAverage: null,
    //     coinName: "",
    //     walletSeq: null
    //   }
    // ]
  }
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
    case FETCH_USER:
      return {
        ...state,
        user: action.meta
      }
    default:
      return state;
  }
}