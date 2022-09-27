<<<<<<< HEAD
// 액션(대문자로)
const SELECT_COIN = "SELECT_COIN";
const SELECT_TIME = "SELECT_TIME";

// 액션 생성 함수(밖에서도 사용할거니까 export)
export const selectCoin = (selectedCoin) => ({ type: SELECT_COIN, meta: selectedCoin });
export const selectTime = (selectedTime) => ({ type: SELECT_TIME, meta: selectedTime });
const initialState = {
  selectedCoin: "KRW-BTC",
  selectedTime: "minutes/1",
};

// 리듀서 설정(인자 2개, state, action)
export default function coinReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_COIN:
      return {
        ...state,
        selectedCoin: action.meta,
      };
    case SELECT_TIME:
      return {
        ...state,
        selectedTime: action.meta,
      };
    default:
      return state;
  }
}
=======
// 액션
const COIN_SELECT = 'COIN_SELECT'

// 액션을 반환하는 객체(작동을 시작시킬 녀석)
export const coinSelect = (selectedCoin) => ({ type: COIN_SELECT, meta: selectedCoin })

// 스테이트
const initialState = {
  selectedCoin: 'KRW-BTC'
}

// 액션을 실행할 리듀서(함수, 스테이트를 변화시킬 함수)
export default function coinReducer(state=initialState, action) {
  switch (action.type) {
    case COIN_SELECT:
      return {
        ...state,
        selectedCoin: action.meta
      }
    default:
      return state
  }
}
>>>>>>> c0b9694b9f061d90ef368e65a66e64563495a998
