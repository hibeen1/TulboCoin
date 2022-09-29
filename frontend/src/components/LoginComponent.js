import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync } from '../store/accountSaga';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageBlock = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 30vw;
height: 40vh;
flex-direction: column;
  
`

const StyledInput = styled.input`
border-radius: 40px;
height: 8vh;
border: 1px solid #7A7A7A;
::placeholder {
    font-size: 1.2rem;    
    color: #7A7A7A;
  }


`

const StyledButton = styled.button`
  border-radius: 40px;
  height: 8vh;
  color: #ffffff;
  background-color: #3A53C0;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`

const Styledlabel = styled.label`
  font-size: 2.5vmin;
  color: #697ed9;
  margin-left: 3px;
`

const StyledContext = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const StyledText = styled.div`
margin-bottom: 3vh;
font-size: 3vmin;
color: #7A7A7A;
cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

`;


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
  }, [])
  
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
  <LoginPageBlock>
    <h1>Tulbo Coin</h1>
    <form onSubmit={handleOnSubmit}>
      <StyledContext>
        <div>
        <Styledlabel htmlFor="userId">아이디</Styledlabel>
        <br></br>
        <StyledInput type="text" name="userId" id="userId" onChange={handleOnChange} /><br />
        <Styledlabel htmlFor="password">비밀번호</Styledlabel>
        <br></br>
        <StyledInput type="password" name="password" id="password" onChange={handleOnChange} /><br />
        <br></br>
        </div>
        <StyledText>아직 계정이 없나요?</StyledText>
        <StyledText></StyledText>

        <StyledButton>떠나볼까요?</StyledButton>
      </StyledContext>
    </form>
  </LoginPageBlock>
  </>
}

export default LoginComponent;