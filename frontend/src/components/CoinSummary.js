import { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { coinLikeAsync, coinLikeDeleteAsync } from '../store/accountSaga'

const WholeCoinChartBlock = styled.div`
  width: 25vw;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center; 
  border: solid skyblue 3px;
  flex-direction: column;
`
const LogoAndName = styled.div`
  width: 25vw;
  height: 10vh;
  border: solid yellow 3px;
  flex-direction: row;
  display: flex;
  
`
const CoinLogo = styled.div`
width: 10vmin;
height: 10vmin;
border: 3px solid grey;
  
`
const CoinName = styled.div`
width: 70%;
height: 10vmin;
border: 3px solid grey;
display:flex;
justify-content: center;
align-items: center; 
`

const CoinDetails = styled.div`
  width: 25vw;
  height: 45vh;
  border: 3px solid navy;
  font-size: 2.5vmin;
`

const LikeButton = styled.div`
width:5vw;
height:10vmin;
cursor: pointer;
border: 3px solid purple;
  
`


function CoinSummary({ socketData, detailCoinData }) {
  const dispatch = useDispatch()
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  const likedCoin = JSON.parse(useSelector(state => state.account.likedCoin))
  const isLikedCoin = likedCoin.some(coin => coin.coinName===detailCoinData.name);

  const handleLikeDelete = () => {
    const body = {coinName: detailCoinData.name, coinCode: detailCoinData.code}
    dispatch(coinLikeDeleteAsync(body))
  }
  const handleLike = () => {
    const body = {coinName: detailCoinData.name, coinCode: detailCoinData.code}
    dispatch(coinLikeAsync(body))
  }
  return (
    <WholeCoinChartBlock>
      <LikeButton>
        {isLikedCoin ? 
          <button onClick={handleLikeDelete}>좋아요한 코인</button>  
          :
          <button onClick={handleLike}>좋아요 안한 코인</button>  
        }</LikeButton>
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