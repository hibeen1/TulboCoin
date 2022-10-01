import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupAsync } from "../store/accountSaga";
import styled from "styled-components";

const SignUpPageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 5vh;
  flex-direction: column;
  margin-bottom: 5vh;
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
  width: 18vw;
  font-size: 3vmin;
  padding-bottom: 0;
  margin-top: 4vh;

  color: #ffffff;
  background-color: #3a53c0;
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

function SignupForm() {
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
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const eng = /[a-g]/g
  const num = /[0-9]/g
  const special = /[`~!@#$%^&*()_+-=/?<>|\\]/g
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
    if (signupForm.userId.length < 2 || signupForm.userId > 10) {
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
      error.userId = '아이디는 2~10글자의 영어, 숫자, 한글만 사용 가능합니다.'
    }
    if (!passwordCheck()) {
        error.password = '비밀번호는 8자리 이상 15자리 이하이고, 영어와 숫자, 특수문자가 반드시 포함되어야 합니다'
    }
    if (signupForm.password !== signupForm.passwordCheck) {
      error.passwordCheck = "비밀번호를 똑같이 한번 더 입력해 주세요";
    }
    if (!mail.test(signupForm.email)) {
      error.email = "정확한 이메일을 입력해주세요";
    }
    return error;
  };

  const handleSubmit = function (e) {
    const error = vaildate()
    setError(error);
    if (Object.values(error).some((v) => v)) {
      return;
    } else {
      const { userId, email, password, balance, imagePath } = signupForm;
      const body = { userId, email, password, balance, imagePath };
      dispatch(signupAsync(body));
      console.log(body);
    }
  };

  return <>
    <SignUpPageBlock>
      <h1>TULBO COIN</h1>
      {/* <h3>가입하세요!</h3> */}
      
      <form>
      <StyledContext>
      <div>
        <Styledlabel htmlFor="userId">아이디</Styledlabel>
        <br />
        <StyledInput id="userId" type="text" name="userId" onChange={handleChange} /><br />
        {error.userId && <p>{error.userId}</p>}
        
        <Styledlabel htmlFor="email">이메일</Styledlabel>
        <br />
        <StyledInput id="email" type="text" name="email" onChange={handleChange} /><br />
        {error.email && <p>{error.email}</p>}

        <Styledlabel htmlFor="password-check">비밀번호 확인</Styledlabel>
        <br />
        <StyledInput id="password-check" type="password" name="passwordCheck" onChange={handleChange} /><br />
        {error.passwordCheck && <p>{error.passwordCheck}</p>}
        </div>
        <StyledButton onClick={handleSubmit}>떠나볼까요?</StyledButton>
        </StyledContext>
      </form>

    </SignUpPageBlock>
  </>
}

export default SignupForm;
