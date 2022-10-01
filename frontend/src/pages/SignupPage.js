
import styled from "styled-components"
import CoinChart from "../components/CoinChart";
import mainPage from "../media/images/mainHalf.png"
import TulLogo from "../media/images/TulLogo.png"
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import SignUpForm from "../components/SignUpForm";


const SignUpPageBlock = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`

const BgImgBlock = styled.div`
  display: flex;
  height: 100vh;
  width: 40vw;
  /* background-color: #352208; */
  background: url(${mainPage}) center no-repeat;
  background-size: 40vw 100vh;
`;

const SignUpBlock = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

/* border: 3px solid black; */
margin-left: 55vw;
/* margin-top: 2vh; */
width: 50vw;
margin-bottom: 10vh;
/* height: 70vh; */
`;

const LogoBlock = styled.div`
display: flex;
position: absolute;
/* position: relative; */
margin-left: 41vw;
margin-top: 2vh;
background: url(${TulLogo}) center no-repeat;
background-size: 5.5vw 10vh;
width: 5.5vw; 
height: 10vh;
/* border: 3px solid red; */

`

function SignupPage() {


  return (
    <>
    <SignUpPageBlock>
    <LogoBlock></LogoBlock>
      <BgImgBlock>
        <SignUpBlock>
          <SignUpForm></SignUpForm>
        </SignUpBlock>
      </BgImgBlock>
    </SignUpPageBlock>
    </>
  );
}

export default SignupPage;