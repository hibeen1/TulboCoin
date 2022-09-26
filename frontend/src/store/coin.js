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