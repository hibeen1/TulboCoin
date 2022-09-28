import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync } from '../store/accountSaga';
import { useNavigate } from 'react-router-dom';


function LoginComponent() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const isLoggedin = useSelector(state => state.account.isLoggedin);

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  // const onLogin = () => dispatch(login());
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedin) {
      navigate('/', true)
    }
  }, [isLoggedin])

  const [ loginForm, setLoginForm ] = useState({
    userId: '',
    password: '',
  })
  const handleOnChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAsync(loginForm));
  }
  return <>
    <h1>로그인페이지입니다</h1>
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="userId">아이디</label>
      <input type="text" name="userId" id="userId" onChange={handleOnChange} /><br />
      <label htmlFor="password">비밀번호</label>
      <input type="password" name="password" id="password" onChange={handleOnChange} /><br />
      <button>로그인</button>
    </form>
  </>
}

export default LoginComponent;