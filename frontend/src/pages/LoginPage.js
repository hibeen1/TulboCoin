import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";

function LoginPage() {
  const navigate = useNavigate()
  const isLoggedin = useSelector(state => state.account.isLoggedin);
  useEffect(() => {
    if (isLoggedin) {
      navigate(-1)
    }
  }, [])

  return <>
    <LoginComponent/>
  </>
}

export default LoginPage