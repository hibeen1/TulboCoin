import { useState } from "react"
import axios from 'axios'

function SignupPage() {
  const [ signupForm, setSignupForm ] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    idCheck: false
  })

  const [ error, setError ] = useState({
    id: '',
    password: '',
    passwordCheck: ''
  })

  const handleIdChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name] : e.target.value,
      idCheck: false
    })
  }

  const handleChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name] : e.target.value
    })
  }

  const eng = /[a-g]/g
  const ENG = /[A-Z]/g
  const num = /[0-9]/g
  const special = /[`~!@#$%^&*()_+-=/?<>|\\]/g
  const passwordCheck = () => {
    if (signupForm.password.length < 8) {
      return false
    } else if (!!!signupForm.password.match(eng) || !!!signupForm.password.match(ENG) || !!!signupForm.password.match(special) || !!!signupForm.password.match(num)) {
      return false
    } else {
      return true
    }
  }

  const vaildate = () => {
    const error = {
      id: '',
      password: '',
      passwordCheck: ''
    }
    if (!signupForm.idCheck) {
      error.id = '아이디 중복검사를 해주세요'
    }
    if (!passwordCheck()) {
        error.password = '비밀번호는 8자리 이상, 영어 대문자와 특수문자가 반드시 포함되어야 합니다'
      }
    if (signupForm.password !== signupForm.passwordCheck) {
      error.passwordCheck = '비밀번호를 똑같이 한번 더 입력해 주세요'
    }
    return error
  }

  const handleSubmit = function (e) {
    const error = vaildate()
    setError(error)
    if (Object.values(error).some(v => v)) {
      return
    } else {
      // axios.post(url)
    }
  }


  return <>
    <h1>회원가입페이지입니다.</h1>
    <p>{signupForm.idCheck}</p>
    <form>
      <label htmlFor="id">아이디 : </label>
      <input id="id" type="text" name="id" onChange={handleIdChange} /><br />
      {error.id && <p>{error.id}</p>}

      <label htmlFor="password">비밀번호 : </label>
      <input id="password" type="password" name="password" onChange={handleChange} /><br />
      {error.password && <p>{error.password}</p>}
      
      <label htmlFor="password-check">비밀번호 확인 : </label>
      <input id="password-check" type="password" name="passwordCheck" onChange={handleChange} /><br />
      {error.passwordCheck && <p>{error.passwordCheck}</p>}
    </form>
    <button onClick={handleSubmit}>회원가입</button>
  </>
}

export default SignupPage