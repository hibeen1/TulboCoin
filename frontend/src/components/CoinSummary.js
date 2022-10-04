import { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
const WholeCoinChartBlock = styled.div`
  width: 60vw;
  height: 55vh;
  display: flex;
  justify-content: start;
  align-items: center; 
  border: solid skyblue 3px;
  flex-direction: column;
`
const CoinLogo = styled.div`
width: 5vmin;
height: 5vmin;
border: 3px solid grey;
  
`
const CoinName = styled.div`
width: 5vmin;
height: 5vmin;
border: 3px solid grey;
`

const CompareYesterDay = styled.div`
`



const CoinDetails = styled.div`
`

function CoinSummary({ socketData, detailCoinData }) {
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  return (
    <WholeCoinChartBlock>
        <CoinLogo>
        <img
          src={`https://static.upbit.com/logos/${detailCoinData.code.split("-")[1]}.png`}
          alt=""
          width={64}
          height={64}

        />
        </CoinLogo>
        <CoinName>
        {detailCoinData.name}
        </CoinName>

      <CompareYesterDay>
        전일대비 : {targetSocketData.signed_change_rate > 0 ? "+" : null}
        {(targetSocketData.signed_change_rate * 100).toFixed(2)}% <br />
        {targetSocketData.signed_change_price > 0 ? "+" : null}
        {targetSocketData.signed_change_price}
      </CompareYesterDay>
      <CoinDetails>
      <p>고가 : {targetSocketData.high_price}</p>
      <p>저가 : {targetSocketData.low_price}</p>
      <p>거래대금 : {(targetSocketData.acc_trade_price_24h * 1).toFixed(0)}</p>
      <p>거래량 : {(targetSocketData.acc_trade_volume_24h * 1).toFixed(0)}</p>
      </CoinDetails>
      </WholeCoinChartBlock>
  );
};

export default memo(CoinSummary)