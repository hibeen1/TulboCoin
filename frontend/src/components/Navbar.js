import { Link } from "react-router-dom"
import Logo from "../logo.svg"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/account';



function Navbar() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { isLoggedin } = useSelector(state => ({
    isLoggedin: state.account.isLoggedin
  }));
  
  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onLogout = () => dispatch(logout());

  return <>
    <div style={ {background: 'green'} }>
      <Link to="/"><img style={ {width: '7vw', height: '7vh'} } src={Logo} alt="" /></Link>
      <p><Link to="sise">시세</Link></p>
      <p><Link to="info">정보집합소</Link></p>
      <p><Link to="honor/*">명예의전당</Link></p>
      {isLoggedin 
        ? <div>
            <p><Link to="mypage">마이페이지</Link></p>
            <p><button onClick={onLogout}>로그아웃</button></p>
          </div>
        : <div>
            <p><Link to="signup">회원가입</Link></p>
            <p><Link to="login">로그인</Link></p>
          </div>
      }
    </div>
  </>
}

export default Navbar