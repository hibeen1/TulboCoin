import { Link } from "react-router-dom";
import TulLogo from "../media/images/TulLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../store/accountSaga";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GreyHome from "../media/images/icons/GreyHome.png";
import GreyCoin from "../media/images/icons/GreyCoin.png";
import GreyGraph from "../media/images/icons/GreyGraph.png";
import GreySetting from "../media/images/icons/GreySetting.png";
import GreyPerson from "../media/images/icons/GreyPerson.png";
import Exit from "../media/images/icons/Exit.png";




const NavBlock = styled.div`
  width: 5vw;
  height: 90vh;
  border: 3px solid green;
  position: fixed;
  /* top: 0; */
  flex-direction: column;
  margin-left: 0.8vw;
  margin-top: 4vh;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background-color: #F3F3F3;
  border-radius: 50px;

`;

const NavItem =  styled.div`
  width: 4vw;
  height: 7vh;
  background: url(${GreyHome}) center no-repeat;
  background-size: 4vw 7vh;
  border: solid red 3px;
  margin-top: 3vh;
  margin-left: 0.3vw;
`;

const LoginOutItem = styled.div`
width: 4vw;
height: 7vh;
background: url(${Exit}) center no-repeat;
background-size: 4vw 7vh;
/* border: solid red 3px; */
margin-top: 39vh;
margin-left: 0.5vw;
`

const LogoBlock = styled.div`
  width: 4vw;
  height: 7vh;
  background: url(${GreyHome}) center no-repeat;
  background-size: 4vw 7vh;
  border: solid red 3px;
  margin-top: 3vh;
  margin-left: 0.3vw;
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
    <NavBlock>

        <Link to="/">
        <LogoBlock></LogoBlock>
          {/* <img style={{ width: "5vw", height: "7vh" }} src={Logo} alt="" /> */}
        </Link>

      <NavItem>
        <Link to="/sise">시세</Link>
        </NavItem>

        <NavItem>
        <Link to="/honor/*">명예의전당</Link>

        </NavItem>

        {isLoggedin ? (<>
          <NavItem>
            <Link to="/mypage">마이페이지</Link>
          </NavItem>
          <LoginOutItem onClick={onLogout}>
            {/* 로그아웃 */}
          </LoginOutItem>

          </>) : (<>

          <NavItem>
            <Link to="/signup">회원가입</Link>
            </NavItem>
          <LoginOutItem Link to="/login">
          </LoginOutItem>

          </>)}
      </NavBlock>

  );
        };


export default Navbar;
