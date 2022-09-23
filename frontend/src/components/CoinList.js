import { memo, useEffect, useState } from "react";
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";

const CoinSummary = memo(function CoinSummary({ detailCoinData }) {
  const { marketCodes } = useFetchMarketCode();
  return (
    <div>
      <h1>
        {marketCodes.map(
          (ele) =>
            ele.market === detailCoinData.code && (
              <div>
                {ele.korean_name}({detailCoinData.code})
              </div>
            )
        )}
      </h1>
      <h3>
        전일대비 : {detailCoinData.signed_change_rate > 0 && "+"}
        {(detailCoinData.signed_change_rate * 100).toFixed(2)}% <br />
        {detailCoinData.signed_change_price > 0 && "+"}
        {detailCoinData.signed_change_price}
      </h3>
      <p>고가 : {detailCoinData.high_price}</p>
      <p>저가 : {detailCoinData.low_price}</p>
      <p>거래대금 : {(detailCoinData.acc_trade_price_24h * 1).toFixed(0)}</p>
      <p>거래량 : {(detailCoinData.acc_trade_volume_24h * 1).toFixed(0)}</p>
    </div>
  );
});

const Coin = memo(function Coin({ socketData }) {
  const [selectedCoin, setSelectedCoin] = useState([]);
  function selectDetailCoin(data) {
    setSelectedCoin(data);
    console.log(`${data}`);
  }
  const { marketCodes } = useFetchMarketCode();
  const convertMillonWon = (value) => {
    const MILLION = 1000000;
    const extractedValue = value / MILLION;
    return extractedValue;
  };
  return (
    <div>
      <div>
        {socketData ? <CoinSummary detailCoinData={selectedCoin} /> : <div>Ticker Loading...</div>}
      </div>
      <table>
        <thead>
          <tr>
            <th>코인</th>
            <th>현재가</th>
            <th>전일대비</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {socketData.map((data) => (
            <tr key={data.code} onClick={() => selectDetailCoin(data)}>
              {marketCodes.map(
                (ele) =>
                  ele.market === data.code && (
                    <td>
                      {ele.korean_name}({ele.market})
                    </td>
                  )
              )}
              <td>{data.trade_price}</td>
              <td>
                {data.signed_change_rate > 0 && "+"}
                {/* 소수점 2째자리 까지 표현 */}
                {(data.signed_change_rate * 100).toFixed(2)}%
              </td>
              <td>
                {/* Math.ceil - 올림, toLocaleString -> 현지화 하는거 여기서는 ko-KR 이니까 한국기준으로 */}
                {Math.ceil(convertMillonWon(data.acc_trade_price_24h)).toLocaleString("ko-KR")}백만
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function CoinPage() {
  // fetch all marketcode custom hook
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState([]);

  useEffect(() => {
    // 변경시 호출
    if (!isLoading && marketCodes) {
      setTargetMarketCode(marketCodes.filter((ele) => ele.market.includes("KRW")));
      console.log("여기입니다", marketCodes);
    }
    // 2번째 인자 [isLoading, marketCodes]  -> 상태변경을 감지할 애들
  }, [isLoading, marketCodes]);

  // ticker socket state
  // throttle_time : socketData 업데이트 주기 max_length_queue : "trade" 유형에서 거래 내역 대기열의 최대 길이
  // throttle_time이 너무 낮으면(400ms 미만) 예기치 않은 버그가 발생할 수 있습니다. – max_length_queue가 너무 크면 메모리를 너무 많이 사용할 수 있습니다.
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  // const { socket, isConnected, socketData } = useUpbitWebSocket(
  const { socketData } = useUpbitWebSocket(targetMarketCode, "ticker", webSocketOptions);

  // 연결 컨트롤 버튼 이벤트 핸들러
  // const connectButtonHandler = (evt) => {
  //   if (isConnected && socket) {
  //     socket.close();
  //     console.log("이거는", socketData);
  //   }
  // };

  return (
    <>
      {/* <div>RealTimePrice Example</div>
      <div>Connected : {isConnected ? "🟢" : "🔴"}</div>
      <button onClick={connectButtonHandler}>{"연결종료"}</button> */}
      {/* <h3>Ticker</h3> */}
      {socketData ? <Coin socketData={socketData} /> : <div>Ticker Loading...</div>}
      {/* {marketCodes.map((element) =>
        element.market.includes("KRW") ? (
          <div>
            한국 포함 : {element.korean_name} {element.market}
          </div>
        ) : null
      )} */}
    </>
  );
}

export default memo(CoinPage);
