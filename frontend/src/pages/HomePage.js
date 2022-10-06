import styled from "styled-components";
import Navbar from "../components/Navbar";
import WordCloud from "../utils/WordCloud";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wordCouldAsync } from "../store/coinSaga";
import CloudImg from "../media/images/Cloud.png";

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

  /* border: solid black 3px; */
  width: 94vw;
  height: 300vh;
  position: relative;
  /* display: flex; */
`;

const Cloud = styled.div`
  background: url(${CloudImg}) no-repeat center;
  background-size: 94vmax 100vmin;
  width: 100%;
  height: 100vmin;
  /* border: 3px red solid; */
  /* margin-left: 25vw; */
`;
// const TurboImg = styled.div`
//   background: url(${TurboHugging}) no-repeat center;
//   background-size: 80vmin 95vmin;
//   width: 80vmin;
//   height: 95vmin;
//   border: 3px red solid;
//   margin-left: 25vw;
// `;

const WordCloudBlock = styled.div`
  /* border: 3px purple solid; */
  width: 90vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: red solid 3px; */
  /* margin-top: 55vh;
  margin-left: 5vw; */
`;
const HomeMsg = styled.div`
  margin-left: 3vmin;
  button {
    width: 5vw;
    height: 5vh;
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 25px;
    margin: 2vh;
    padding: 0;
  }
`;
function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.account.isLoggedin);
  const [period, setPeriod] = useState(10);
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(wordCouldAsync(period));
  }, [period]);

  const handlePeriod = (period) => {
    setPeriod(period);
  };

  return (
    <HomePageBlock>
      <NavBlock>
        <Navbar></Navbar>
      </NavBlock>
      <HomeBlock>
        <HomeMsg>
          <h1>지난 {period}분간 가장 뜨거운 코인입니다</h1>
          <button onClick={() => handlePeriod(10)}>10</button>
          <button onClick={() => handlePeriod(60)}>60</button>
          <button onClick={() => handlePeriod(180)}>180</button>
        </HomeMsg>
        <Cloud>
          <WordCloudBlock>
            <WordCloud></WordCloud>
          </WordCloudBlock>
        </Cloud>
      </HomeBlock>
    </HomePageBlock>
  );
}

export default HomePage;
