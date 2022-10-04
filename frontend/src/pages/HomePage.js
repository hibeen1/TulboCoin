import styled from "styled-components"
import Navbar from "../components/Navbar"
import WordCloud from "../utils/WordCloud"
import TurboHugging from "../media/images/TurboImg.png"

const HomePageBlock = styled.div`
  display: flex;
`

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  position: relative;
  display: flex;
  
`

const HomeBlock = styled.div`
background-color: #F3F3F3;
  border: solid black 3px;
  width: 94vw;
  height: 300vh;
  position: relative;
  /* display: flex; */
`

const TurboImg = styled.div`
  background: url(${TurboHugging}) no-repeat center;
  background-size: 80vmin 95vmin;
  width: 80vmin;
  height: 95vmin;
  border: 3px red solid;
  margin-left: 25vw;


`

const WordCloudBlock = styled.div`
  border: 3px purple solid;
  width: 50vw;
  height: 10vh;
  /* border: red solid 3px; */
  margin-top: 55vh;
  margin-left: 5vw;
  
`

function HomePage() {
  return(
  <HomePageBlock>
    <NavBlock>
      <Navbar></Navbar>
    </NavBlock>
    <HomeBlock>
    {/* <h1>워드클라우드 및 소개 페이지입니다</h1> */}
    <TurboImg>
      <WordCloudBlock><WordCloud></WordCloud></WordCloudBlock>
    </TurboImg>
    </HomeBlock>
  </HomePageBlock>
  )
}

export default HomePage;