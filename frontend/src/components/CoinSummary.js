import { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { coinLikeAsync, coinLikeDeleteAsync } from "../store/accountSaga";
import EmptyHeart from "../media/images/icons/Heart.png";
import FullHeart from "../media/images/icons/darkHeart.png";
import ReactTooltip from "react-tooltip";

const WholeCoinChartBlock = styled.div`
  width: 25vw;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid skyblue 3px; */
  flex-direction: column;
`;
const LogoAndName = styled.div`
  width: 25vw;
  height: 10vh;
  /* border: solid yellow 3px; */
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CoinLogo = styled.div`
  width: 10vmin;
  height: 10vmin;
  /* border: 3px solid grey; */
`;
const CoinName = styled.div`
  width: 70%;
  height: 10vmin;
  /* border: 3px solid grey; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinDetails = styled.div`
  width: 25vw;
  height: 45vh;
  /* border: 3px solid navy; */
  font-size: 2.5vmin;
`;

// const LikeButton = styled.div`
// width:5vw;
// height:10vmin;
// cursor: pointer;
// /* background:url(${EmptyHeart}) center no-repeat; */
// background-size: 5vw 10vmin;

// `

const EmptyButton = styled.div`
  width: 2.5vw;
  height: 5vmin;
  cursor: pointer;
  background: url(${EmptyHeart}) center no-repeat;
  background-size: 2.5vw 5vmin;
`;

const FullButton = styled.div`
  width: 2.5vw;
  height: 5vmin;
  cursor: pointer;
  background: url(${FullHeart}) center no-repeat;
  background-size: 2.5vw 5vmin;
`;
const HighPriceMsg = styled.div`
  :hover {
    /* background-color: red; */
    .hiddenMsg {
      display: block;
    }
  }
  .hiddenMsg {
    display: none;
    position: absolute;
  }
`;

function CoinSummary({ socketData, detailCoinData }) {
  const dispatch = useDispatch();
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  const likedCoin = JSON.parse(useSelector((state) => state.account.likedCoin));
  const isLikedCoin = likedCoin.some((coin) => coin.coinName === detailCoinData.name);

  const handleLikeDelete = () => {
    const body = { coinName: detailCoinData.name, coinCode: detailCoinData.code };
    dispatch(coinLikeDeleteAsync(body));
  };
  const handleLike = () => {
    const body = { coinName: detailCoinData.name, coinCode: detailCoinData.code };
    dispatch(coinLikeAsync(body));
  };
  return (
    <WholeCoinChartBlock>
      <LogoAndName>
        <CoinLogo>
          <img
            src={`https://static.upbit.com/logos/${detailCoinData.code.split("-")[1]}.png`}
            alt=""
            // width={`10vmin`}
            // height={`10vmin`}
          />
        </CoinLogo>
        <CoinName>{detailCoinData.name}</CoinName>
        {/* <LikeButton> */}
        {isLikedCoin ? (
          <EmptyButton onClick={handleLikeDelete}></EmptyButton>
        ) : (
          <FullButton onClick={handleLike}></FullButton>
        )}
      </LogoAndName>

      <CoinDetails>
        <div data-for="difYesterday" data-tip>
          전일대비 : {targetSocketData.signed_change_rate > 0 ? "+" : null}
          <ReactTooltip id="difYesterday" getContent={dataTip => "어제의 가격과 비교하여 차이나는 정도"} />
          {(targetSocketData.signed_change_rate * 100).toFixed(2)}% <br />
          {targetSocketData.signed_change_price > 0 ? "+" : null}
          {targetSocketData.signed_change_price}
        </div>
        <p data-for="highPrice" data-tip>
          고가 : {targetSocketData.high_price}
          <ReactTooltip id="highPrice" getContent={dataTip => "하루 중 가장 높은 가격을 뜻하는 용어"} />

        </p>
        <p data-for="lowPrice" data-tip>
          저가 : {targetSocketData.low_price}
          <ReactTooltip id="lowPrice" getContent={dataTip => "하루 중 가장 낮은 가격을 뜻하는 용어"} />
        </p>
        <p data-for="tradeAmount" data-tip>
          거래대금 : {(targetSocketData.acc_trade_price_24h * 1).toFixed(0)}
          <ReactTooltip id="tradeAmount" getContent={dataTip => "하루동안 거래된 금액의 양"} />
          </p>
        <p data-for="tradeCoinAmount" data-tip>
          거래량 : {(targetSocketData.acc_trade_volume_24h * 1).toFixed(0)}
          <ReactTooltip id="tradeCoinAmount" getContent={dataTip => "하루동안 거래된 코인의 수량"} />
          </p>
      </CoinDetails>
    </WholeCoinChartBlock>
  );
}

export default memo(CoinSummary);
