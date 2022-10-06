import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetWalletAsync, fetchMyHistoryAsync } from "../store/accountSaga";
import { selectCoin } from "../store/coin";
import React, { memo, useMemo } from "react";
import { useUpbitWebSocket } from "use-upbit-api";
import Navbar from "../components/Navbar";
import ChangeMyInfoModal from "../components/ChangeMyInfoModal";
import Swal from "sweetalert2";
import styled from "styled-components";
import GreySetting from "../media/images/icons/GreySetting.png";
import BlueSetting from "../media/images/icons/BlueSetting.png";
import GreyRefresh from "../media/images/icons/GreyRefresh1.png";
import BlueRefresh from "../media/images/icons/BlueRefresh.png";
import PiggyBank from "../media/images/PiggyBank.png";
import DoughnutChart from "../components/DoughnutChart";
import CustomTable from "../components/CustomTable";
import BlueCoin from "../media/images/icons/BlueCoin.png";
import buy from "../media/images/buy.png";
import sell from "../media/images/sell.png";
import ReactTooltip from "react-tooltip";
import MoneyImg from "../media/images/MoneyImg.png";

const MyPageBlock = styled.div`
  display: flex;
`;

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  /* position: relative; */
  display: flex;
`;

const MyBlock = styled.div`
  background-color: #f3f3f3;
  /* border: solid black 3px; */
  max-width: 94vw;
  height: 100vh;
  /* position: relative; */
  display: flex;
  flex-direction: column;
`;

const ProfileBlock = styled.div`
  /* background-color: #F3F3F3; */
  /* border: solid green 3px; */
  width: 91vw;
  height: 10vh;
  /* margin-left: 1vw;
  margin-top: 1vw; */
  display: flex;
  flex-direction: row;

  h1 {
    /* border: solid black 3px; */
  }
`;

const StyledImg = styled.img`
  width: 10vmin;
  height: 10vmin;
`;

const WalletBlock = styled.div`
  /* border: solid red 3px; */
  margin-bottom: 4vh;
  width: 91vw;
  height: 41vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    background-color: #f3f3f3;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background-color: #697ed9;
  } */
  /* margin-left: 1vw;
  margin-top: 5vw; */
`;

// 잔액 표시된 하얀 네모
const CashBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 12vh;
  // margin-top: 5vh;
  flex-direction: row;
  display: flex;
  justify-content: center;
  border: 0.911773px solid #e7e8f2;
  border-radius: 5.47064px;
  align-items: center;
`;
const PiggyBankImg = styled.div`
  width: 10vw;
  height: 8vh;
  background: url(${PiggyBank}) no-repeat center;
  background-size: 8.5vmin 8.5vmin;
  /* margin-right: 1vw; */
`;

const MoneyBlock = styled.div`
  width: 10vw;
  height: 8vh;
  background: url(${MoneyImg}) no-repeat center;
  background-size: 8.5vmin 8.5vmin;
  /* margin-right: 1vw; */
`;

const TulboCoinImg = styled.div`
  width: 8.5vmin;
  height: 8.5vmin;
  background: url(${BlueCoin}) no-repeat center;
  background-size: 6.5vmin 6.5vmin;
  margin-left: 1vw;
`;

const BalanceRefreshBtn = styled.button`
  width: 1.5vw;
  height: 3vh;
  background: url(${GreyRefresh}) no-repeat center;
  background-size: 1.5vw 3vh;
  margin-left: 3vw;
  /* display: inline; */
  /* border: 3px black solid; */
  :hover {
    /* background: url(${BlueRefresh}) center no-repeat;
    background-size: 1.5vw 3vh; */
    transform: scale(1.1);
  }
`;

const EmptySpace = styled.div`
  width: 1.5vw;
  height: 3vh;
  /* background: url(${GreyRefresh}) no-repeat center; */
  background-size: 1.5vw 3vh;
  margin-left: 3vw;
  /* display: inline; */
  
`
//  원그래프 블럭
const GraphBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 30vh;

  /* margin-top: 2.5vh; */
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.911773px solid #e7e8f2;
  border-radius: 5.47064px;
`;
const BalanceBackGround = styled.div`
  margin-left: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 40vh;
  /* border: 2px solid red; */
  border-radius: 20px;
  background-color: #d0e8fa;
`;
const GraphBackground = styled.div`
  /* margin-right: 3vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 40vh;
  margin-right: 3vw;
  /* border: 2px solid red; */
  background-color: #d0e8fa;
  border-radius: 20px;
`;
const BalanceAndGraphBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  /* border: 3px purple solid; */
  height: 41vh;
  width: 91vw;
  flex-direction: row;
`;
// 좋은 하루 되세요
const GreetingMsg = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 4vmin;
  font-weight: bold;
  padding: 0.1vh 1vw;
`;

const GreetingProfitMsg = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 3vmin;
  font-weight: bold;
  padding: 0.1vh 1vw;
`;

const EmailMsg = styled.div`
  width: 20vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vmin;
`;
const ProfileImg = styled.div`
  width: 5vw;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.1vh 1vw;
`;

// 회원정보 수정하기 버튼
const SettingButton = styled.div`
  width: 5vmin;
  height: 5vmin;
  background: url(${GreySetting}) no-repeat center;
  background-size: 5vmin 5vmin;
  width: 15vw;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.1vh 1vw;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

// 회원정보 수정하기 버튼
// const SettingButton = styled.div`
//   width: 5vmin;
//   height: 5vmin;
//   background: url(${GreySetting}) no-repeat center;
//   background-size: 5vmin 5vmin;
//   width: 15vw;
//   height: 100%;
//   display: flex;
//   justify-content: end;
//   align-items: center;
//   cursor: pointer;
//   /* border: 3px black solid; */
//   :hover {
//     background: url(${BlueSetting}) center no-repeat;
//     background-size: 5vmin 5vmin;
//   }
// `;

const BalanceMsg = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  text-align: center;
  height: 30vh;
  /* margin-right: 15vw; */
`;

const MyCoinBlock = styled.div`
  width: 40vw;
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* border: 2px solid blue; */
  border-radius: 20px;
  background-color: #d0e8fa;
  /* padding-left: 1vw; */
  overflow: auto;
  margin-left: 3vw;
  :hover {
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    background-color: #f3f3f3;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background-color: #697ed9;
  }
  p {
    font-size: 20px;
  }
`;
const MyCoinMsg = styled.div`
  width: 30vw;
  height: 5vh;
  border-radius: 5.47064px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 20px;
`;
const MyHistoryMsg = styled.div`
  width: 30vw;
  height: 5vh;
  padding-top: 1vh;
  padding-bottom: 1vh;
  /* border: 2px solid black; */
  border-radius: 5.47064px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 20px;
`;
const MyHistoryBlock = styled.div`
  margin-right: 3vw;
  width: 40vw;
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 2px solid blue; */
  border-radius: 20px;
  overflow: auto;
  background-color: #d0e8fa;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    background-color: #f3f3f3;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background-color: #697ed9;
  }
  p {
    font-size: 20px;
  }
`;

const BalanceText = styled.div`
font-size: 20px;
  
`

function MypagePage() {
  const tableStyle = { tableStyle: { backgroundColor: "red" }, theadStyle: {} };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.account.isLoggedin);
  const user = JSON.parse(useSelector((state) => state.account.user));
  const [isChangeForm, setIsChangeForm] = useState(false);
  const myHistory = useSelector((state) => state.account.myHistory);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin]);

  useEffect(() => {
    dispatch(fetchMyHistoryAsync(user.userId));
  }, []);

  useEffect(() => {
    const historyData = myHistory.map(function (ele) {
      if (ele.historyType === "BUY") {
        return {
          ...ele,
          historyCoinAmount: ele.historyCoinAmount.toLocaleString("ko-KR"),
          historyCoinPrice: ele.historyCoinPrice.toLocaleString("ko-KR"),
          historyTime: ele.historyTime.substring(0, 10) + " " + ele.historyTime.substring(11, 16),
          historyType: <img src={buy} alt="" width="60%" height="60%" />,
        };
      } else {
        return {
          ...ele,
          historyCoinAmount: ele.historyCoinAmount.toLocaleString("ko-KR"),
          historyCoinPrice: ele.historyCoinPrice.toLocaleString("ko-KR"),
          historyTime: ele.historyTime.substring(0, 10) + " " + ele.historyTime.substring(11, 16),
          historyType: <img src={sell} alt="" width="60%" height="60%" />,
        };
      }
    });
    setHistoryData(historyData);
  }, [myHistory]);
  
  // 수정하기 버튼 누르면 모달창이 뜸
  const handlePageToForm = () => {
    setIsChangeForm(!isChangeForm);
  };
  
  const wallet = JSON.parse(useSelector((state) => state.account.wallet));
  // const [data, setData] = useState(null);
  // const [cash, setCash] = useState(0);


  const handleBalanceReset = () => {
    Swal.fire({
      title: "투자 초기화",
      text: "지금까지의 투자를 초기화하겠습니까?(다시는 되돌릴 수 없습니다)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네!!!!",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetWalletAsync());
      } else {
        Swal.fire({
          text: "휴 당신은 털보와 함께한 시간을 버릴뻔 했습니다",
        });
      }
    });
  };

  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const [coinInWallet, setCoinInWallet] = useState([]);
  const { socketData } = useUpbitWebSocket(coinInWallet, "ticker", webSocketOptions);
  
  useEffect(() => {
    if (wallet) {
      const tmp = wallet.map((ele) => ({ market: ele.coinCode }));
      setCoinInWallet(tmp);
    }
  }, []);
  let data = null
  let cash = 0

  if (socketData && wallet) {
    try {
      let newCash = 0;
      const newData = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code);
        newCash += coin.trade_price * tmp.coinAmount;
        return {
          name: tmp.coinName,
          code: coin.code,
          amount: tmp.coinAmount.toLocaleString("ko-KR"),
          average: tmp.coinAverage.toLocaleString("ko-KR"),
          percent: `${((coin.trade_price / tmp.coinAverage - 1) * 100).toFixed(2)} %`,
        };
      });
      cash = newCash
      data = newData
    } catch (e) {
      cash = 0;
      data = null;
    }
  }

  // useEffect(() => {
  //   if (socketData && wallet) {
  //     try {
  //       let newCash = 0;
  //       const newData = socketData.map((coin) => {
  //         const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code);
  //         newCash += coin.trade_price * tmp.coinAmount;
  //         return {
  //           name: tmp.coinName,
  //           code: coin.code,
  //           amount: tmp.coinAmount.toLocaleString("ko-KR"),
  //           average: tmp.coinAverage.toLocaleString("ko-KR"),
  //           percent: `${((coin.trade_price / tmp.coinAverage - 1) * 100).toFixed(2)} %`,
  //         };
  //       });
  //       setCash(newCash.toLocaleString("ko-KR"));
  //       setData(newData)
  //     } catch (e) {
  //       setCash(0);
  //       setData(null);
  //     }
  //   }
  // }, [socketData, wallet]);

  function selectDetailCoin(coin) {
    dispatch(selectCoin(coin));
    navigate("/exchange");
  }

  const customCoinColumns = useMemo(
    () => [
      {
        name: "name", //simple recommended way to define a column
        header: "코인 이름",
        columnStyle: {
          textAlign: "center",
          width: "15vw",
        },
        // columnStyle: {}
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        name: "amount", //simple recommended way to define a column
        header: "수량",
        columnStyle: {
          textAlign: "center",
          width: "5vw",
        },
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        name: "average", //simple recommended way to define a column
        header: "평균 매수 가격",
        columnStyle: {
          textAlign: "center",
          width: "15vw",
        },
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        name: "percent", //simple recommended way to define a column
        header: "수익률",
        columnStyle: {
          textAlign: "center",
          width: "5vw",
        },
      },
    ],
    []
  );

  const customHistoryColumns = useMemo(
    () => [
      {
        name: "historyTime", //simple recommended way to define a column
        header: "날짜",
        columnStyle: {
          textAlign: "center",
          width: "14vw",
        },
      },
      {
        name: "historyCoinName", //simple recommended way to define a column
        header: "이름",
        columnStyle: {
          textAlign: "center",
          width: "10vw",
        },
      },
      {
        name: "historyCoinAmount", //simple recommended way to define a column
        header: "수량",
        columnStyle: {
          textAlign: "center",
          width: "4vw",
        },
      },
      {
        name: "historyCoinPrice", //simple recommended way to define a column
        header: "거래가격",
        columnStyle: {
          textAlign: "center",
          width: "8vw",
        },
      },
      {
        name: "historyType", //simple recommended way to define a column
        header: "거래종류",
        columnStyle: {
          width: "5vw",
          paddingLeft: "2.5vw",
          justifyContent: "center",
        },
      },
    ],
    []
  );

  return (<>
  
    <MyPageBlock>
      <NavBlock>
        <Navbar></Navbar>
      </NavBlock>
      <MyBlock>
        {isChangeForm && (
          <>
            <ChangeMyInfoModal user={user} handlePageToForm={handlePageToForm} />
          </>
        )}
        <ProfileBlock>
          <GreetingMsg>좋은 하루 되세요 {user.userId}님!</GreetingMsg>
          <EmailMsg>{user.email}</EmailMsg>
          {/* 회원정보 수정하기 버튼 */}
          <SettingButton onClick={handlePageToForm}></SettingButton>
          <ProfileImg>
            <StyledImg
              src={`${process.env.PUBLIC_URL}/profile/profile${user.imagePath}.png`}
              alt={`프로필 이미지${user.imagePath}`}
            />
          </ProfileImg>
        </ProfileBlock>
        <br />

        <BalanceAndGraphBlock>
          <BalanceBackGround>
            <BalanceMsg>
              <CashBlock>
                <PiggyBankImg></PiggyBankImg>
                <div>
                  <BalanceText data-for="balance" data-tip>
                    보유 현금 자산 : {user.balance.toLocaleString("ko-KR")} 원
                    <ReactTooltip
                      id="balance"
                      getContent={(dataTip) => "현재 보유하고 있는 현금"}
                    />
                  </BalanceText>
                </div>
                {/* 잔액 초기화 버튼 */}
                <div>
                  <BalanceRefreshBtn onClick={handleBalanceReset}></BalanceRefreshBtn>
                </div>
              </CashBlock>
              <CashBlock>
              <MoneyBlock></MoneyBlock>
                <div>
                  <BalanceText data-for="assets" data-tip>
                    총 평가 금액 : {cash} 원
                    <ReactTooltip id="assets" getContent={dataTip => "현재 보유한 코인의 가격 총합"} />
                    </BalanceText>
                </div>
                <div>
                  <EmptySpace onClick={handleBalanceReset}></EmptySpace>
                </div>
              </CashBlock>
            </BalanceMsg>
          </BalanceBackGround>

          <GraphBackground>
            <GraphBlock>
              {data ? (
                <DoughnutChart socketData={socketData} wallet={wallet} />
              ) : (
                <div>아무것도 없음</div>
              )}
            </GraphBlock>
          </GraphBackground>
        </BalanceAndGraphBlock>
        <br />
        <WalletBlock>
          <MyCoinBlock>
            <MyCoinMsg>나의 보유 코인</MyCoinMsg>
            <hr />
            {data && (
              <>
                <CustomTable
                  data={data}
                  columns={customCoinColumns}
                  rowFunction={(row) => {
                    selectDetailCoin({ code: row.code, name: row.name });
                  }}
                />
              </>
            )}
          </MyCoinBlock>
          <MyHistoryBlock>
            <MyHistoryMsg>나의 코인 거래 기록</MyHistoryMsg>
            <hr />
            {myHistory && (
              <>
                <CustomTable
                  tableStyle={tableStyle}
                  data={historyData}
                  columns={customHistoryColumns}
                />
              </>
            )}
          </MyHistoryBlock>
        </WalletBlock>
      </MyBlock>
    </MyPageBlock>
    </>);
}
export default MypagePage;
