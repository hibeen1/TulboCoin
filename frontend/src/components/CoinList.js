import { memo, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";
import { selectCoin, selectNews } from "../store/coin";
import { newsAsync } from "../store/coinSaga";
import CustomTable from "./CustomTable";
import CoinDeal from "./CoinDeal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import CoinChart from "./CoinChart";
import CoinSummary from "./CoinSummary";

const CoinChartBlock = styled.div`
  width: 40vw;
  height: 50vh;
  border: 3px solid black;

`

const Coin = memo(function Coin({ socketData }) {
  const dispatch = useDispatch();
  const { marketCodes } = useFetchMarketCode();
  const [data, setData] = useState();
  const [ modal, setModal ] = useState('');
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedNews = useSelector((state) => state.coinReducer.selectedNews);
  const likedCoin = useSelector(state => state.coinReducer.likedCoin)
  // name, amount, like
  const [ whatTable, setWhatTable ] = useState('amount')

  useEffect(() => {
    if (whatTable === 'amount'){
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
          volume: coin.acc_trade_price_24h,
        };
      });
      newData.sort(function(a, b) {
        return b.volume - a.volume;
      })
      setData(newData.slice(0, 20));
    } else if (whatTable === 'name') {
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
        };
      });
      newData.sort(function(a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
      setData(newData);
    } else if (whatTable === 'like') {
      const newData = JSON.parse(likedCoin).map((coin) => {
        return {
          name: coin.coinName,
          code: coin.coinCode
        }})
      setData(newData);
    }
  }, [whatTable, socketData]);

  useEffect(() => {
    dispatch(newsAsync("비트코인"));
    setWhatTable('name')
  }, []);

  // 테이블 컬럼
  const columns = useMemo(
    () => [
      {
        name: "name", //simple recommended way to define a column
        header: "코인 이름",
      },
    ],
    []
  );
  // 테이블 컬럼 끝

  function selectDetailCoin(coin) {
    dispatch(selectCoin(coin));
    dispatch(newsAsync(coin.name));
  }

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

  const handleWhatTable = (what) => {
    setWhatTable(what)
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
      <button onClick={() => handleWhatTable('name')}>이름순</button>
      <button onClick={() => handleWhatTable('amount')}>거래대금순</button>
      <button onClick={() => handleWhatTable('like')}>관심코인</button>
      {data && <CustomTable data={data} columns={columns} rowFunction={(row)=>{selectDetailCoin({code: row.code, name: row.name})}}/>}
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
  const { socketData } = useUpbitWebSocket(targetMarketCode, "ticker", webSocketOptions);
  return (
    <>
      {socketData ? <Coin socketData={socketData} /> : <div>정보를 가져오고 있습니다...</div>}
      {/* {asdf ? <Coin socketData={asdf} /> : <div>정보를 가져오고 있습니다...</div>} */}
    </>
  );
}

export default memo(CoinPage);
