import React from "react"

function Login({ isLoggedin, onLogin }) {
  return <>
    <h1>로그인페이지입니다</h1>
    <button onClick={onLogin}>로그인버튼</button>
  </>
}

export default Login