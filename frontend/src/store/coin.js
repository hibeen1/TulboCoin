// 액션(대문자로)
const SELECT_COIN = "SELECT_COIN";
const SELECT_TIME = "SELECT_TIME";

// 액션 생성 함수(밖에서도 사용할거니까 export)
export const selectCoin = (selectedCoin) => ({ type: SELECT_COIN, meta: selectedCoin });
export const selectTime = (selectedTime) => ({ type: SELECT_TIME, meta: selectedTime });
const initialState = {
  selectedCoin: {name:"비트코인", code:"KRW-BTC"},
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
