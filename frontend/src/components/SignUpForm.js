import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../store/accountSaga";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../media/images/TulboCoin.png"
import alert from "../media/images/Alert.png"

const SignUpPageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 5vh;
  flex-direction: column;
  margin-top: 25vh;
  /* border: 3px solid black; */

  h1 {
    font-size: 8vmin;
  }
`;


const StyledInput = styled.input`
  border-radius: 40px;
  height: 5vh;
  border: 1px solid #7a7a7a;
  margin-top: 0.5vh;
  margin-bottom: 1vh;
  ::placeholder {
    font-size: 1.2rem;
    color: #7a7a7a;
  }
`;
// 떠나볼까요
const StyledButton = styled.button`
  border-radius: 40px;
  height: 6vh;
  width: 15vw;
  font-size: 3vmin;
  padding-bottom: 0;
  margin-top: 4vh;
  margin-left: 0.5vw;
  font-family: "Jua", sans-serif;

  color: #ffffff;
  background-color: #3a53c0;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
// 이미 계정이 있어요
const StyledText = styled.div`
  margin-top: 10vh;
  font-size: 3vmin;
  color: #7a7a7a;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const Styledlabel = styled.label`
  font-size: 2vmin;
  color: #697ed9;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const StyledContext = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LogoBlock = styled.div`
width: 20vw;
height: 10vh;
margin-bottom: 78vh;
margin-right: 1vw;
background: url(${logo}) center no-repeat;
background-size: 20vw 10vh;
/* border: solid black 5px; */
display: flex;
position: absolute;
 `

const ErrorBlock = styled.div`
display: flex;
position: absolute;
width: 20vw;
height: 35vh;
margin-right: 35vw;
margin-bottom: 12vh;
/* background: url(${alert}) center no-repeat; */
/* background-color: #faa2c2; */
background-size: 20vw 35vh;
flex-direction: column;
border-radius: 40px;
padding: 10px;
color: #f25b96;
`



function SignupForm() {
  const isLoggedin = useSelector(state => state.account.isLoggedin)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedin) {
      navigate(-1, true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedin) {
      navigate('/home', true)
    }
  }, [isLoggedin])

  const [signupForm, setSignupForm] = useState({
    userId: "",
    password: "",
    passwordCheck: "",
    email: "",
    balance: 10000000,
    imagePath: '1',
  })
  const dispatch = useDispatch()

  const [error, setError] = useState({
    userId: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const handleChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const eng = /[a-g]/g
  const num = /[0-9]/g
  const special = /[`~!@#$%^&*()_+\-=/?<>|\\]/g
  const passwordCheck = () => {
    if (signupForm.password.length < 8) {
      return false
    } else if (signupForm.password.length > 15) {
      return false
    } else if (!!!signupForm.password.match(eng) || !!!signupForm.password.match(special) || !!!signupForm.password.match(num)) {
      return false
    } else {
      return true
    }
  }
  
  const userIdCheck = () => {
    if (signupForm.userId.length < 2 || signupForm.userId.length > 10) {
      return false
    } else if (!!signupForm.userId.match(special)) {
      return false
    } else {
      return true;
    }
  };

  const mail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const vaildate = () => {
    const error = {
      userId: '',
      password: '',
      passwordCheck: '',
      email: ''
    }
    if (!userIdCheck()) {
      error.userId = '아이디는 2~10자의 영어, 숫자, 한글만 가능해요.'
    }
    if (!passwordCheck()) {
        error.password = '비밀번호는 영어, 숫자, 특수문자를 포함한 8 ~ 15자여야 해요.'
    }
    if (signupForm.password !== signupForm.passwordCheck) {
      error.passwordCheck = "비밀번호를 한번 더 입력해 주세요";
    }
    if (!mail.test(signupForm.email)) {
      error.email = "정확한 이메일을 입력해주세요";
    }
    return error;
  };

  const handleSubmit = function (e) {
    e.preventDefault()
    const error = vaildate()
    setError(error);
    if (Object.values(error).some((v) => v)) {
      return;
    } else {
      const { userId, email, password, balance, imagePath } = signupForm;
      const body = { userId, email, password, balance, imagePath };
      dispatch(signupAsync(body));
    }
  };

  return <>
    <SignUpPageBlock>
      {/* <h1>TULBO COIN</h1> */}
      <LogoBlock></LogoBlock>
      {/* <h3>가입하세요!</h3> */}
      
      <form>
      <StyledContext>
      <div>
        <Styledlabel htmlFor="userId" placeholder="2~10자의 영어, 숫자, 한글">아이디</Styledlabel>
        <br />
        <StyledInput id="userId" type="text" name="userId" onChange={handleChange} /><br />
        
        
        <Styledlabel htmlFor="email">이메일</Styledlabel>
        <br />
        <StyledInput id="email" type="text" name="email" onChange={handleChange} /><br />


        <Styledlabel htmlFor="password">비밀번호</Styledlabel>
        <br />
        <StyledInput id="password" type="password" name="password" onChange={handleChange} /><br />


        <Styledlabel htmlFor="password-check">비밀번호 확인</Styledlabel>
        <br />
        <StyledInput id="password-check" type="password" name="passwordCheck" onChange={handleChange} /><br />

        </div>
        <ErrorBlock>
          {error.userId && <p>{error.userId}</p>}
          {error.email && <p>{error.email}</p>}

          {error.password && <p>{error.password}</p>}
          {error.passwordCheck && <p>{error.passwordCheck}</p>}
        </ErrorBlock>
        <Link to="/" style={{ textDecoration: 'none', marginLeft: '0.8vw'}}><StyledText>나는 이미 계정이 있어요!!</StyledText></Link>
        <StyledButton onClick={handleSubmit}>떠나볼까요?</StyledButton>
        </StyledContext>
      </form>
      


    </SignUpPageBlock>
  </>
}


export default SignupForm;
