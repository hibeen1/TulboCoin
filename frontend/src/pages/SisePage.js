import CoinList from "../components/CoinList";
import CoinChart from "../components/CoinChart";
import Navbar from "../components/Navbar"
import styled from "styled-components";

const SisePageBlock = styled.div`
  display: flex;
`

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  display: flex;
`

const SiseBlock = styled.div`
  background-color: #F3F3F3;
  /* border: solid black 3px; */
  width: 94vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
// 궁금한 코인을 검색해보세요
const GreetingMsg = styled.div`
  width: 91vw;
  height: 10vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  font-size: 4vmin;
  font-weight: bold;
  padding: 0.1vh 1vw;
  border: solid green 3px;
  flex-direction: row;
`

const SearchBlock = styled.div`
  width: 91vw;
  height: 10vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  flex-direction: row;
  border: solid red 3px;
  
`

const CoinSearchBar = styled.input`
  width: 65vw;
  height: 5vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  flex-direction: row;
  border: solid red 3px;
  border-radius: 50px;
  margin-left: 10vw;
  background-color: #f0f6fc;

`
// 검색 버튼
const SearchButton = styled.div`
  width: 5.5vmin;
  height: 5.5vmin;
  display: flex;
  justify-content: start;
  align-items: center; 
  flex-direction: row;
  border: solid blue 3px;
  border-radius: 50px;
  background-color: #fff;
  margin-left: 1vw;
  cursor: pointer;
  
`
const CenterBlock = styled.div`
  width: 91vw;
  height: 55vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  font-size: 4vmin;
  font-weight: bold;
  /* padding: 0.1vh 1vw; */
  border: solid yellow 3px;
  flex-direction: row;
  
`
const CenterLeftBlock = styled.div`
  width: 30vw;
  height: 55vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  border: solid orange 3px;
  flex-direction: column;
  
`
// 가나다순 차트
const AlphabetChart = styled.div`
  width: 30vw;
  height: 10vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  border: solid blue 3px;
  flex-direction: column;
  margin-top:2vh;
  
`
// 거래대금 순 차트
const MoneyAmountChart = styled.div`
  width: 30vw;
  height: 40vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  border: solid purple 3px;
  flex-direction: column;
  /* margin-top: 5vh; */
`
// 코인 이름 정보 + 코인 차트
// const CoinChartBlock = styled.div`
//   width: 60vw;
//   height: 55vh;
//   display: flex;
//   justify-content: start;
//   align-items: center; 
//   border: solid skyblue 3px;
//   flex-direction: column;
// `
// const CoinNameMsg = styled.div`
//   width: 60vw;
//   height: 15vh;
//   display: flex;
//   border: solid yellow 3px;
  
// `
// const ChartBlock = styled.div`
//   width: 60vw;
//   height: 55vh;
//   display: flex;
//   border: solid pink 3px;
  
// `

const NewsBlock = styled.div`
  width: 91vw;
  height: 20vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  border: solid purple 3px;
  flex-direction: column;
`



function Sise() {
  return (
    <>
    <SisePageBlock>
      <NavBlock>
      <Navbar></Navbar>
      </NavBlock>
      <SiseBlock>
        <GreetingMsg>궁금한 코인을 검색해보세요!</GreetingMsg>
        <SearchBlock><CoinSearchBar></CoinSearchBar><SearchButton></SearchButton></SearchBlock>
        <CenterBlock>
          {/* 차트 두개 세로로 나열 */}
          <CenterLeftBlock>
            <AlphabetChart>차트 제목</AlphabetChart>
            <div><MoneyAmountChart>거래대금 순 차트</MoneyAmountChart></div>
          </CenterLeftBlock>

          {/* coinChart Block */}
          {/* <CoinChartBlock> */}
           <CoinList></CoinList>


            {/* <div>코인 그래프</div> */}
            <CoinChart></CoinChart>
          {/* </CoinChartBlock> */}

        </CenterBlock>


        <NewsBlock>
          <div>해당 뉴스를 확인하세요</div>
          <div>뉴스 정보</div>

        </NewsBlock>

        <CoinList></CoinList>
      </SiseBlock>
    </SisePageBlock>
    </>
  );
}

export default Sise;
