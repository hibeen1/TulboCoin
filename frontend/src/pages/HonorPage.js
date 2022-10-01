import styled from "styled-components"
import Navbar from "../components/Navbar"

const HonorPageBlock = styled.div`
  display: flex;
`

const NavBlock = styled.div`
  border: solid yellow 3px;
  width: 7vw;
  height: 100vh;
  position: relative;
  display: flex;
  
`

const HonorBlock = styled.div`
background-color: #F3F3F3;
  border: solid black 3px;
  width: 93vw;
  height: 100vh;
  position: relative;
  display: flex;
`



function Honor() {
  return <>
    <HonorPageBlock>
      <NavBlock>
        <Navbar></Navbar>
      </NavBlock>
      <HonorBlock>
        <h1>명예의전당 페이지입니다</h1>
      </HonorBlock>
  </HonorPageBlock>
  </>
}

export default Honor