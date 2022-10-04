import { memo, useEffect, useState, useMemo } from "react";
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";
import MaterialReactTable from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { selectCoin, selectNews } from "../store/coin";
import { newsAsync } from "../store/coinSaga";
import CoinDeal from "./CoinDeal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomTable from "./CustomTable";
import styled from "styled-components";
import CoinChart from "./CoinChart";
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
const CoinChartBlock = styled.div`
  width: 40vw;
  height: 50vh;
  border: 3px solid black;

`





const CoinSummary = memo(function CoinSummary({ socketData, detailCoinData }) {
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
});

const Coin = memo(function Coin({ socketData }) {
  const dispatch = useDispatch();
  const { marketCodes } = useFetchMarketCode();
  const [data, setData] = useState();
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedNews = useSelector((state) => state.coinReducer.selectedNews);
  // console.log("뉴스으으으", selectedNews);
  const [ modal, setModal ] = useState('');
  const { sortBy, setSortBy } = useState();

  useEffect(() => {
    const newData = socketData.map((coin) => {
      let tmp = "";
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
        volume: Math.ceil(convertMillonWon(coin.acc_trade_price_24h)).toLocaleString("ko-KR"),
      };
    });
    setData(newData);
  }, [socketData]);

  useEffect(() => {
    dispatch(newsAsync("비트코인"));
  }, []);

  // 테이블 컬럼
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "name", //simple recommended way to define a column
  //       header: "코인 이름",
  //       // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
  //     },
  //     {
  //       accessorKey: "trade_price", //simple recommended way to define a column
  //       header: "현재 가격",
  //       enableColumnFilter: false,
  //       // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
  //     },
  //     {
  //       accessorKey: "volume", //simple recommended way to define a column
  //       header: "거래대금(백만)",
  //       enableColumnFilter: false,
  //       enableSorting: false,
  //     },
  //   ],
  //   []
  // );
  // 테이블 컬럼 끝

  function selectDetailCoin(coin) {
    dispatch(selectCoin(coin));
    dispatch(newsAsync(coin.name));
  }
  const convertMillonWon = (value) => {
    const MILLION = 1000000;
    const extractedValue = value / MILLION;
    return extractedValue;
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleModal = (e) => {
    setModal(e.target.name)
  }

  const modalClose = () => {
    setModal('')
  }
  return (
    <div>
      <div style={{marginBottom: '300px'}}>
        {selectedCoin ? (
          <>
            <button onClick={handleModal} name='sell' >코인 판매</button>
            <button onClick={handleModal} name='buy' >코인 구매</button>
            {modal && <CoinDeal deal={modal} modalClose={modalClose} socketData={socketData} detailCoinData={selectedCoin} />}
            <CoinSummary socketData={socketData} detailCoinData={selectedCoin} />
          </>
        ) : (
          <div>정보를 가져오고 있습니다...</div>
        )}
      </div>
      {/* {data && (
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => {
              selectDetailCoin({ code: row.original.code, name: row.original.name });
            },
          })}
          columns={columns}
          data={data}
          enableFullScreenToggle={false}
          enableGlobalFilter={false} //turn off a feature
          enableDensityToggle={false}
          enableHiding={false}
          initialState={{ density: 'compact' }}
        />
      )} */}
      {/* {data && <CustomTable data={data} columns={columns} />} */}
      <div>
        {selectedNews ? (
          <div className="carousel">
            <Slider {...settings}>
              {selectedNews.items.map((news) => (
                <div>
                  <a href={news.link}>
                    <div>{news.title}</div>
                    <div>{news.description}</div>
                  </a>
                  <hr />
                </div>
              ))}
            </Slider>
          </div>
        ) : null}
      </div>
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
    }
    // 2번째 인자 [isLoading, marketCodes]  -> 상태변경을 감지할 애들
  }, [isLoading, marketCodes]);

  // ticker socket state
  // throttle_time : socketData 업데이트 주기 max_length_queue : "trade" 유형에서 거래 내역 대기열의 최대 길이
  // throttle_time이 너무 낮으면(400ms 미만) 예기치 않은 버그가 발생할 수 있습니다. – max_length_queue가 너무 크면 메모리를 너무 많이 사용할 수 있습니다.
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  // const { socket, isConnected, socketData } = useUpbitWebSocket(
  const { socketData } = useUpbitWebSocket(targetMarketCode, "ticker", webSocketOptions);


  return (
    <>
      {socketData ? <Coin socketData={socketData} /> : <div>정보를 가져오고 있습니다...</div>}
    </>
  );
}

export default memo(CoinPage);
