import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../store/accountSaga";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import styled from "styled-components";
import GreyHome from "../media/images/icons/GreyHome.png";
import BlueHome from "../media/images/icons/BlueHome.png";
import GreyCoin from "../media/images/icons/GreyCoin.png";
import BlueCoin from "../media/images/icons/BlueCoin.png";
import GreyGraph from "../media/images/icons/GreyGraph.png";
import BlueGraph from "../media/images/icons/BlueGraph.png";
import GreySetting from "../media/images/icons/GreySetting.png";
import BlueSetting from "../media/images/icons/BlueSetting.png";
import GreyPerson from "../media/images/icons/GreyPerson.png";
import BluePerson from "../media/images/icons/BluePerson.png";
import Exit from "../media/images/icons/Exit.png";

const NavBlock = styled.div`
  width: 4vw;
  height: 90vh;
  /* border: 3px solid green; */
  position: fixed;
  /* top: 0; */
  flex-direction: column;
  margin-left: 0.8vw;
  margin-top: 4vh;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background-color: #f3f3f3;
  border-radius: 50px;
`;

const NavItem = styled.div`
  width: 4vw;
  height: 7vh;
  background-size: 4vw 7vh;
  /* border: solid red 3px; */
  margin-top: 5vh;
  margin-left: 0.1vw;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  /* 홈 */
  &.home {
    background: ${(props) => (props.isActive ? `url(${BlueHome}) center no-repeat` : `url(${GreyHome}) center no-repeat`)};
    background-size: 3vw 6vh;
    :hover {
      background: url(${BlueHome}) center no-repeat;
      background-size: 3vw 6vh;
    }
  }

  /* 시세 */
  &.sise {
    background: ${(props) => (props.isActive ? `url(${BlueCoin}) center no-repeat` : `url(${GreyCoin}) center no-repeat`)};
    background-size: 6vmin 6vmin;
    :hover {
      background: url(${BlueCoin}) center no-repeat;
      background-size: 6vmin 6vmin;
    }
  }

  /* 명예의 전당 */
  &.honor {
    background: ${(props) => (props.isActive ? `url(${BlueGraph}) center no-repeat` : `url(${GreyGraph}) center no-repeat`)};
    background-size: 6vmin 6vmin;
    :hover {
      background: url(${BlueGraph}) center no-repeat;
      background-size: 6vmin 6vmin;
    }
  }

  /* 마이페이지 */
  &.myPage {
    background: ${(props) => (props.isActive ? `url(${BluePerson}) center no-repeat` : `url(${GreyPerson}) center no-repeat`)};
    background-size: 6vmin 6vmin;
    &:hover {
      background: url(${BluePerson}) center no-repeat;
      background-size: 6vmin 6vmin;
    }
  }

  /* 설정 페이지 */
  /* &.setting{
    background: url(${GreySetting}) center no-repeat;
    background-size: 6vmin 6vmin;
    :hover {
    background: url(${BlueSetting}) center no-repeat;
    background-size: 6vmin 6vmin;
    }} */
`;

const LoginOutItem = styled.div`
  width: 4.5vw;
  height: 7.5vh;
  background: url(${Exit}) center no-repeat;
  background-size: 7vmin 7vmin;
  /* border: solid red 3px; */
  margin-top: 35vh;
  margin-left: -0.3vw;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
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
    Swal.fire({
      title: "정말로 로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네!!!!",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAsync());
      } else {
        Swal.fire({
          text: "휴 당신이 방금 로그아웃 하는 줄 알았습니다",
        });
      }
    });
  };

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin]);

  return (
    <NavBlock>
      <Link to="/home">
        <NavItem className="home" isActive={window.location.pathname==="/home"}></NavItem>
        {/* <img style={{ width: "5vw", height: "7vh" }} src={Logo} alt="" /> */}
      </Link>

      {/* 시세 */}
      <Link to="/exchange">
        <NavItem className="sise" isActive={window.location.pathname==="/exchange"}></NavItem>
      </Link>
      {/* 명예의 전당 */}
      <Link to="/honor">
        <NavItem className="honor" isActive={window.location.pathname==="/honor"}></NavItem>
      </Link>

      {isLoggedin ? (
        <>
          {/* 마이페이지 */}
          <Link to="/mypage">
            <NavItem className="myPage" isActive={window.location.pathname==="/mypage"}></NavItem>
          </Link>

          <LoginOutItem onClick={onLogout}>{/* 로그아웃 */}</LoginOutItem>
        </>
      ) : (
        <>
          <NavItem>
            <Link to="/signup">회원가입</Link>
          </NavItem>
          <LoginOutItem Link to="/login"></LoginOutItem>
        </>
      )}
    </NavBlock>
  );
}

export default Navbar;
