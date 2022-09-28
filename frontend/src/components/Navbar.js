import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../store/accountSaga";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { isLoggedin } = useSelector((state) => ({
    isLoggedin: state.account.isLoggedin,
  }));
  const navigate = useNavigate()

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onLogout = () => {
    dispatch(logoutAsync());
    navigate('/')
  }
  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <img style={{ width: "7vw", height: "7vh" }} src={Logo} alt="" />
        </Link>
        <ul>
          <li>
            <Link to="sise">시세</Link>
          </li>
          <li>
            <Link to="info">정보집합소</Link>
          </li>
          <li>
            <Link to="honor/*">명예의전당</Link>
          </li>
          {/* <li>
            <Link to="test">테스트</Link>
          </li> */}
          {isLoggedin ? (
            <>
              <li>
                <Link to="mypage">마이페이지</Link>
              </li>
              <li>
                <button onClick={onLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="signup">회원가입</Link>
              </li>
              <li>
                <Link to="login">로그인</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Navbar;
