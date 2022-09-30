import { Link } from "react-router-dom";
import Logo from "../media/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../store/accountSaga";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const NavBlock = styled.div`
  width: 10vw;
  height: 100vh;
  border: 3px blue solid;
  position: fixed;
  /* top: 0; */
  flex-direction: column;
  margin-left: 2vw;
  margin-top: 3vh;
  align-items: center;
  justify-content: space-between;

  .Link {
    margin-top: 3vh;
  }
`;

const LogoBlock = styled.div`
  width: 5vw;
  height: 7vh;
  background-image: url(${Logo});
  background-size: 5vw 7vh;
`;

function Navbar() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { isLoggedin } = useSelector((state) => ({
    isLoggedin: state.account.isLoggedin,
  }));
  const navigate = useNavigate();

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onLogout = () => {
    dispatch(logoutAsync());
    navigate("/");
  };
  return (
    <>
      <NavBlock>
        <Link to="/">
          <LogoBlock></LogoBlock>
          {/* <img style={{ width: "5vw", height: "7vh" }} src={Logo} alt="" /> */}
        </Link>
        <br />
        <Link to="/sise">시세</Link>
        {/* <br /> */}
        {/* <Link to="/info">정보집합소</Link> */}
        <br />
        <Link to="/honor/*">명예의전당</Link>
        <br />

        {isLoggedin ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <br />

            <button onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/signup">회원가입</Link>

            <Link to="/login">로그인</Link>
          </>
        )}
      </NavBlock>
    </>
  );
}

export default Navbar;
