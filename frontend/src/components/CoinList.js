import { memo, useEffect, useState, useMemo } from "react";
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";
import MaterialReactTable from 'material-react-table';
import { useDispatch, useSelector } from "react-redux";
import { selectCoin } from "../store/coin";
import { buyAsync } from "../store/coinSaga";
import { sellAsync } from "../store/coinSaga";
import { fetchUserAsync } from "../store/accountSaga";
import { fetchWalletAsync } from "../store/accountSaga";

const CoinSell = memo(function CoinSell({ socketData, detailCoinData }) {
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  const [sellForm, setSellForm] = useState({
    sellCoinAmount: 0,
    sellCoinName: detailCoinData,
    sellCoinPrice: targetSocketData.trade_price,
  });

  const handleChange = (e) => {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    setSellForm({
      ...sellForm,
      [e.target.name]: Number(e.target.value),
    });
  };

  useEffect(() => {
    setSellForm({
      ...sellForm,
      sellCoinName: detailCoinData.name,
      sellCoinCode: detailCoinData.code,
      sellCoinPrice: targetSocketData.trade_price,
    });
  }, [socketData, detailCoinData]);

  const dispatch = useDispatch();
  const handleSell = function (e) {
    const { sellCoinAmount, sellCoinName, sellCoinPrice, sellCoinCode } = sellForm;
    const body = { sellCoinAmount, sellCoinName, sellCoinPrice, sellCoinCode };
    // console.log(body);
    dispatch(sellAsync(body));
    setTimeout(() => {
      dispatch(fetchWalletAsync());
      dispatch(fetchUserAsync());
    }, 300);
    // dispatch(fetchWalletAsync());
    // dispatch(fetchUserAsync());
  };
  return (
    <div>
      <form>
        {/* <p>{JSON.stringify(buyForm)}</p> */}
        <div>
          <label>판매가능수량</label>
          <div>
            {JSON.parse(localStorage.getItem("wallet")).map((coin) =>
              coin.coinName === detailCoinData ? coin.coinAmount : null
            )}
          </div>
        </div>
        <div>
          <label>매도가격(KRW)</label> <br />
          <label>{targetSocketData.trade_price}</label>
        </div>
        <div>
          <label htmlFor="sellCoinAmount">판매수량</label>
          <input id="sellCoinAmount" type="number" name="sellCoinAmount" onChange={handleChange} />
        </div>
        <div>
          <p htmlFor="sellCoinPrice">판매총액</p>
          <p id="sellCoinPrice" name="sellCoinPrice" onChange={handleChange}>
            {sellForm.sellCoinAmount * targetSocketData.trade_price}
          </p>
        </div>
      </form>
      <button onClick={handleSell}>매도</button>
    </div>
  );
});

const CoinBuy = memo(function CoinBuy({ socketData, detailCoinData }) {
  // console.log(detailCoinData);
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }

  const [buyForm, setBuyForm] = useState({
    buyCoinAmount: 1,
    buyCoinName: detailCoinData.name,
    buyCoinPrice: targetSocketData.trade_price,
    buyCoinCode: detailCoinData.code
  });
  
  const handleChange = (e) => {
    setBuyForm({
      ...buyForm,
      [e.target.name]: Number(e.target.value),
    });
  };
  
  useEffect(() => {
    setBuyForm({
      ...buyForm,
      buyCoinName: detailCoinData.name,
      buyCoinCode: detailCoinData.code,
      buyCoinPrice: targetSocketData.trade_price,
    });
  }, [socketData, detailCoinData]);

  const dispatch = useDispatch();
  const handleBuy = function (e) {
    const { buyCoinAmount, buyCoinName, buyCoinPrice, buyCoinCode } = buyForm;
    const body = { buyCoinAmount, buyCoinName, buyCoinPrice, buyCoinCode };
    // console.log(body);
    dispatch(buyAsync(body));
    setTimeout(() => {
      dispatch(fetchWalletAsync());
      dispatch(fetchUserAsync());
    }, 300);
    // 유저정보 요청보내기
    // dispatch(fetchWalletAsync());
    // dispatch(fetchUserAsync());
  };
  return (
    <div>
      <form>
        {/* <p>{JSON.stringify(buyForm)}</p> */}
        <div>
          <label>주문가능</label>
          <label>{JSON.parse(localStorage.getItem("user")).balance}KRW</label>
        </div>
        <div>
          <label>매수가격(KRW)</label> <br />
          <label>{targetSocketData.trade_price}</label>
        </div>
        <div>
          <label htmlFor="buyCoinAmount">주문수량</label>
          <input id="buyCoinAmount" type="number" name="buyCoinAmount" onChange={handleChange} />
        </div>
        <div>
          <p htmlFor="buyCoinPrice">주문총액</p>
          <p id="buyCoinPrice" name="buyCoinPrice" onChange={handleChange}>
            {buyForm.buyCoinAmount * targetSocketData.trade_price}
          </p>
        </div>
      </form>
      <button onClick={handleBuy}>매수</button>
    </div>
  );
});

const CoinSummary = memo(function CoinSummary({ socketData, detailCoinData }) {
  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  return (
    <div>
      <h1>{detailCoinData.name}</h1>
      <h3>
        전일대비 : {targetSocketData.signed_change_rate > 0 ? "+" : null}
        {(targetSocketData.signed_change_rate * 100).toFixed(2)}% <br />
        {targetSocketData.signed_change_price > 0 ? "+" : null}
        {targetSocketData.signed_change_price}
      </h3>
      <p>고가 : {targetSocketData.high_price}</p>
      <p>저가 : {targetSocketData.low_price}</p>
      <p>거래대금 : {(targetSocketData.acc_trade_price_24h * 1).toFixed(0)}</p>
      <p>거래량 : {(targetSocketData.acc_trade_volume_24h * 1).toFixed(0)}</p>
    </div>
  );
});

const Coin = memo(function Coin({ socketData }) {
  const dispatch = useDispatch();
  const { marketCodes } = useFetchMarketCode()
  const [ data, setData ] = useState()
  const selectedCoin = useSelector(state => state.coinReducer.selectedCoin)

  useEffect(() => {
    const newData = socketData.map((coin) => {
      let tmp = ''
      for (let i = 0; i < marketCodes.length; i += 1) {
        if (marketCodes[i].market === coin.code) {
          tmp = marketCodes[i].korean_name;
          break;
        }
      }
      return {
        name: tmp,
        code: coin.code,
        trade_price: coin.trade_price,
        volume: Math.ceil(convertMillonWon(coin.acc_trade_price_24h)).toLocaleString("ko-KR")
      }
    });
    setData(newData)
  }, [socketData])
  // 테이블 컬럼
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: '코인 이름',
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'trade_price', //simple recommended way to define a column
        header: '현재 가격',
        enableColumnFilter: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: 'volume', //simple recommended way to define a column
        header: '거래대금(백만)',
        enableColumnFilter: false,
        enableSorting: false
      },
    ],
    [],
  );
  // 테이블 컬럼 끝
    
  function selectDetailCoin(coin) {
    dispatch(selectCoin(coin));
  }
  const convertMillonWon = (value) => {
    const MILLION = 1000000;
    const extractedValue = value / MILLION;
    return extractedValue;
  };
  return (
    <div>
      <div>
        {selectedCoin ? (
          <>
            <CoinSell socketData={socketData} detailCoinData={selectedCoin} />
            <CoinBuy socketData={socketData} detailCoinData={selectedCoin} />
            <CoinSummary socketData={socketData} detailCoinData={selectedCoin} />
          </>
        ) : (
          <div>Ticker Loading...</div>
        )}
      </div>
      {data &&
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              selectDetailCoin({code:row.original.code, name:row.original.name})
            }
          })}
          columns={columns}
          data={data}
          enableFullScreenToggle={false}
          enableGlobalFilter={false} //turn off a feature
          enableDensityToggle={false}
          enableHiding={false}
          enablePagination={false}
          initialState={{ density: 'compact' }}
        />
      }
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
      // console.log("여기입니다", marketCodes);
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
      {/* {socketData ? <NewCoinSummary socketData={socketData} /> : <div>Ticker Loading...</div>} */}
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
