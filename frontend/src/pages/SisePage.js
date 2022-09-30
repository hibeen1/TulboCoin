import CoinList from "../components/CoinList";
import CoinChart from "../components/CoinChart";
import Navbar from "../components/Navbar"
import styled from "styled-components";

const SisePageBlock = styled.div`
  display: flex;
`



const NavBlock = styled.div`
  border: solid yellow 3px;
  width: 10vw;
  height: 100vh;
  position: relative;
  display: flex;
  
`

const SiseBlock = styled.div`
  border: solid black 3px;
  width: 70vw;
  height: 100vh;
  position: relative;
  display: flex;
`


function Sise() {
  return (
    <>
    <SisePageBlock>
      <NavBlock>
      <Navbar></Navbar>
      </NavBlock>
      <SiseBlock>
        <h1>시세페이지입니다</h1>
        <CoinChart></CoinChart>
        <CoinList></CoinList>
      </SiseBlock>
    </SisePageBlock>
    </>
  );
}

export default Sise;
