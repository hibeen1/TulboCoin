import { memo, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";
import { selectCoin, selectNews } from "../store/coin";
import { newsAsync } from "../store/coinSaga";
import CoinDeal from "../components/CoinDeal";
import Slider from "react-slick";
import Swal from "sweetalert2";
import CustomTable from "../components/CustomTable";
import CoinSummary from "../components/CoinSummary";
import CoinChart from "../components/CoinChart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import BlueButton from "../media/images/icons/SearchButton.png";

const SisePageBlock = styled.div`
  display: flex;
`;

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  display: flex;
`;

const SiseBlock = styled.div`
  background-color: #f3f3f3;
  /* border: solid black 3px; */
  max-width: 94vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
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
  /* border: solid green 3px; */
  flex-direction: row;
`;

const SearchBlock = styled.form`
  width: 91vw;
  height: 10vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  /* border: solid red 3px; */
`;
const CoinSearchBar = styled.input`
  width: 65vw;
  height: 5vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  border: solid #061e8c 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.borderChange ? "0px" : "10px")};
  border-bottom-right-radius: ${(props) => (props.borderChange ? "0px" : "10px")};
  margin-left: 10vw;
  background-color: #f0f6fc;
  /* width: 5vw;
    height: 4vh; */
  /* border-radius: 5px; */
  font-family: "Jua", sans-serif;
  font-size: 25px;
`
const AutoSearch = styled.div`
  width: 65.3vw;
  max-height: 40vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    background-color: #f0f6fc;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background-color: #697ed9;
  }
  border-left: 3px solid #061e8c;
  border-right: 3px solid #061e8c;
  border-bottom: 3px solid #061e8c;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f0f6fc;
  position: absolute;
  top: 19.2vh;
  left: 16.5vw;
  z-index: 100;
`;
// 검색 버튼
const BlueSearchButton = styled.button`
  width: 6vmin;
  height: 6vmin;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  /* border: solid blue 3px; */
  border-radius: 50px;
  background: url(${BlueButton}) center no-repeat;
  background-size: 6vmin 6vmin;
  margin-left: 1vw;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
const CenterBlock = styled.div`
  width: 91vw;
  height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 4vmin;
  font-weight: bold;
  /* padding: 0.1vh 1vw; */
  /* border: solid black 3px; */
  flex-direction: row;
`;
const CenterLeftBlock = styled.div`
  width: 20vw;
  height: 50vh;
  border-radius: 20px;
  display: flex;
  margin-left: 1vw;
  justify-content: start;
  align-items: center;
  /* border: solid orange 3px; */
  flex-direction: column;
  background-color: white;
`;
// 이름순 거래대금순 코인이름순을 묶은 디브
const ChangeChartBtnBlock = styled.div`
  width: 20vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid blue 3px; */
  flex-direction: row;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
// 거래대금 순 차트
const MoneyAmountChart = styled.div`
  width: 18vw;
  height: 40vh;
  display: flex;
  justify-content: start;
  align-items: start;
  margin-bottom: 1vw;
  /* border: solid purple 3px; */
  flex-direction: column;
  font-size: 3vmin;
  overflow: auto;
  :hover {
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background-color: #697ed9;
  }
  /* margin-left: 4vw; */
  /* margin-top: 5vh; */
`;
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
  flex-direction: column;
`;

// 이름순 거래대금순 관심코인순
const ChangeChartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* border: 3px yellow solid; */
  font-size: 2.5vmin;
  width: 7vw;
  height: 5vh;
`;
const CoinSummaryDealBlock = styled.div`
  display: flex;
  height: 50vh;
  border-radius: 20px;
  flex-direction: column;
  background-color: white;
  /* border: 2px solid blue; */
`;
const CoinDealButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    width: 6vw;
    height: 4vh;
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 15px;
  }
`;
const NewsItem = styled.div`
  margin-left: 1vw;
  font-size: 13px;
  width: 28vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  /* border: 2px solid black; */
  border-radius: 20px;
  background-color: white;
`;
const NewsMsg = styled.div`
  font-size: 30px;
  margin-left: 2vw;
`;

function Sise() {
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
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [modal, setModal] = useState("");
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedNews = useSelector((state) => state.coinReducer.selectedNews);
  const likedCoin = JSON.parse(useSelector((state) => state.account.likedCoin));
  // name, amount, like
  const [whatTable, setWhatTable] = useState("name");

  useEffect(() => {
    if (socketData) {
      if (whatTable === "amount") {
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
            volume: coin.acc_trade_price_24h.toLocaleString("ko-KR"),
          };
        });
        newData.sort(function (a, b) {
          return b.volume - a.volume;
        });
        setData(newData.slice(0, 20));
      } else if (whatTable === "name") {
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
        newData.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        setData(newData);
      } else if (whatTable === "like") {
        const newData = likedCoin.map((coin) => {
          return {
            name: coin.coinName,
            code: coin.coinCode,
          };
        });
        setData(newData);
      }
    }
  }, [whatTable, socketData]);

  useEffect(() => {
    dispatch(newsAsync(selectedCoin.name));
    setWhatTable("name");
  }, []);

  // 테이블 컬럼
  const columns = useMemo(
    () => [
      {
        name: "name", //simple recommended way to define a column
        // header: "코인 이름",
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
    arrows: false,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleModal = (e) => {
    setModal(e.target.name);
  };

  const modalClose = () => {
    setModal("");
  };

  const handleWhatTable = (what) => {
    setWhatTable(what);
  };

  const [searchWord, setSearchWord] = useState("");
  const [matchWord, setMatchWord] = useState([]);
  const [ borderChange, setBorderChange] = useState(false)

  useEffect(() => {
    if (searchWord) {
      const matchWord = targetMarketCode
        .filter((coin) => coin.korean_name.includes(searchWord))
        .map((coin) => {
          return {
            name: coin.korean_name,
            code: coin.market,
          };
        });
      setMatchWord(matchWord);
    } else setMatchWord([]);
  }, [searchWord]);

  const handleSearchInput = (e) => {
    const searchWord = e.target.value;
    setSearchWord(searchWord);
  };
  useEffect(() => {
    if (matchWord.length > 0) {
      setBorderChange(true)
    } else setBorderChange(false)
  }, [matchWord])

  const handleSearchForm = (e) => {
    e.preventDefault();
    const [targetWord] = targetMarketCode.filter((coin) => coin.korean_name === searchWord);
    if (targetWord) {
      selectDetailCoin({ name: targetWord.korean_name, code: targetWord.market });
      setSearchWord("");
    } else {
      Swal.fire({
        text: "코인 이름이 이상한데요?",
        icon: "warning",
      });
      return;
    }
  };


  const handleSearchWordClick = (coin) => {
    selectDetailCoin(coin);
    setSearchWord("");
  };

  return (
    <>
      <SisePageBlock>
        <NavBlock>
          <Navbar></Navbar>
        </NavBlock>
        <SiseBlock>
          <GreetingMsg>궁금한 코인을 검색해보세요!</GreetingMsg>
          <SearchBlock onSubmit={handleSearchForm}>
            <CoinSearchBar onChange={handleSearchInput} value={searchWord} borderChange={borderChange} />
            <BlueSearchButton />
            {/* 자동완성으로 추천되는 검색어(코인이름) */}
            {matchWord.length > 0 && (
              <AutoSearch>
                {matchWord.map((coin) => {
                  return <div onClick={(e) => handleSearchWordClick(coin)}>{coin.name}</div>;
                })}
              </AutoSearch>
            )}
          </SearchBlock>
          <CenterBlock>
            {/* 차트 두개 세로로 나열 */}
            <CenterLeftBlock>
              <ChangeChartBtnBlock>
                <ChangeChartBtn onClick={() => handleWhatTable("name")}>이름순</ChangeChartBtn>
                <ChangeChartBtn onClick={() => handleWhatTable("amount")}>
                  거래대금순
                </ChangeChartBtn>
                <ChangeChartBtn onClick={() => handleWhatTable("like")}>관심코인</ChangeChartBtn>
              </ChangeChartBtnBlock>
              <div>
                <MoneyAmountChart>
                  {data && (
                    <CustomTable
                      data={data}
                      columns={columns}
                      rowFunction={(row) => {
                        selectDetailCoin({ code: row.code, name: row.name });
                      }}
                    />
                  )}
                </MoneyAmountChart>
              </div>
            </CenterLeftBlock>

            {/* coinChart Block */}
            {/* <CoinChartBlock> */}
            {/* <CoinList></CoinList> */}

            {/* coinChart Block */}
            {/* <CoinChartBlock> */}
            {/* <CoinList></CoinList> */}

            {/* <div>코인 그래프</div> */}
            {selectedCoin && socketData ? (
              <>
                {modal && (
                  <CoinDeal
                    deal={modal}
                    modalClose={modalClose}
                    socketData={socketData}
                    detailCoinData={selectedCoin}
                  />
                )}
                <CoinSummaryDealBlock>
                  <CoinSummary socketData={socketData} detailCoinData={selectedCoin} />
                  <CoinDealButton>
                    <button onClick={handleModal} name="sell">
                      코인 판매
                    </button>
                    <button onClick={handleModal} name="buy">
                      코인 구매
                    </button>
                  </CoinDealButton>
                </CoinSummaryDealBlock>
              </>
            ) : (
              <div>정보를 가져오고 있습니다...</div>
            )}
            <CoinChart></CoinChart>
            {/* </CoinChartBlock> */}
          </CenterBlock>

          <NewsBlock>
            {/* <div>해당 뉴스를 확인하세요</div> */}
            <NewsMsg>
              <div>뉴스 정보</div>
            </NewsMsg>
            {/* <div className="carousel"> */}
            <Slider {...settings}>
              {selectedNews.items
                ? selectedNews.items.map((news) => {
                    return (
                      <div>
                        <NewsItem>
                          <a href={news.link}>{news.title}</a>
                          {/* <p>{news.title}</p> */}
                          <p>{news.description}</p>
                          {/* <a href={news.link}>링크</a> */}
                        </NewsItem>
                      </div>
                    );
                  })
                : null}
            </Slider>
            {/* </div> */}
          </NewsBlock>
        </SiseBlock>
      </SisePageBlock>
    </>
  );
}

export default Sise;
