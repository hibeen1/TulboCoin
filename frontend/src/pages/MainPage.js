
import styled from "styled-components"
import CoinChart from "../components/CoinChart";
import mainPage from "../media/images/mainHalf.png"
import logo from "../media/images/logo.png"
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";


const MainPageBlock = styled.div`
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

const LoginPageBlock = styled.div`
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
margin-left: 42vw;
margin-top: 2vh;
size: 20vw 40vh;
background-image: url(${logo}) center no-repeat;
background-size: 20vw 40vh;
border: 3px solid black;

`

function Main() {


  return (
    <>
    <MainPageBlock>
    <LogoBlock></LogoBlock>
      <BgImgBlock>
        <LoginPageBlock>
          <LoginComponent></LoginComponent>
        </LoginPageBlock>
        
      </BgImgBlock>
    </MainPageBlock>
    </>
  );
}

export default Main;
