import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rankingAsync } from "../store/accountSaga";
function Honor() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rankingAsync());
  });
  return (
    <>
      <h1>명예의전당 페이지입니다</h1>
    </>
  );
}

export default Honor;
