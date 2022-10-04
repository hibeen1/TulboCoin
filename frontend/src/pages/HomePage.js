import styled from "styled-components";
import Navbar from "../components/Navbar";
import WordCloud from "../utils/WordCloud";

const HomePageBlock = styled.div`
  display: flex;
`;

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

const HomeBlock = styled.div`
  background-color: #f3f3f3;
  border: solid black 3px;
  width: 94vw;
  height: 300vh;
  position: relative;
  /* display: flex; */
`;

function HomePage() {
  return (
    <HomePageBlock>
      <NavBlock>
        <Navbar></Navbar>
      </NavBlock>
      <HomeBlock>
        {/* <h1>워드클라우드 및 소개 페이지입니다</h1> */}
        <WordCloud></WordCloud>
      </HomeBlock>
    </HomePageBlock>
  );
}

export default HomePage;
