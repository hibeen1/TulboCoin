import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetWalletAsync } from "../store/accountSaga";
import React, { memo, useMemo } from "react";
import { useUpbitWebSocket } from "use-upbit-api";
import MaterialReactTable from "material-react-table";
import Navbar from "../components/Navbar";
import ChangeMyInfoModal from "../components/ChangeMyInfoModal";
import styled from "styled-components";
import GreySetting from "../media/images/icons/GreySetting.png";
import BlueSetting from "../media/images/icons/BlueSetting.png";
import GreyRefresh from "../media/images/icons/GreyRefresh1.png";
import BlueRefresh from "../media/images/icons/BlueRefresh.png";
import PiggyBank from "../media/images/PiggyBank.png";
import DoughnutChart from "../components/DoughnutChart";
import CustomTable from "../components/CustomTable";

const MyPageBlock = styled.div`
  display: flex;
`;

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

const MyBlock = styled.div`
  background-color: #f3f3f3;
  /* border: solid black 3px; */
  width: 94vw;
  height: 100vh;
  /* position: relative; */
  display: flex;
  flex-direction: column;
`;

const ProfileBlock = styled.div`
  /* background-color: #F3F3F3; */
  border: solid green 3px;
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
  border: solid red 3px;
  width: 91vw;
  height: 50vh;
  /* margin-left: 1vw;
  margin-top: 5vw; */
`;
// 회원정보 수정하기 버튼
const SettingButton = styled.div`
  width: 10vmin;
  height: 10vmin;
  background: url(${GreySetting}) no-repeat center;
  background-size: 10vmin 10vmin;
  width: 15vw; 
height: 100%;
display: flex;
justify-content: center;
align-items: center; 
  cursor: pointer;
  /* border: 3px black solid; */
  :hover {
    background: url(${BlueSetting}) center no-repeat;
    background-size: 1.5vw 3vh;

  }
`;

// 잔액 표시된 하얀 네모
const CashBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 20vh;
  margin-top: 5vh;
  flex-direction: row;
  display: flex;
  border: 0.911773px solid #e7e8f2;
  border-radius: 5.47064px;
`;
const PiggyBankImg = styled.div`
  width: 6vw;
  height: 8.5vh;
  background: url(${PiggyBank}) no-repeat center;
  background-size: 6vw 8.5vh;
  margin-top: 2vh;
  margin-left: 1vw;
`;

const BalanceRefreshBtn = styled.button`
  width: 1.5vw;
  height: 3vh;
  background: url(${GreyRefresh}) no-repeat center;
  background-size: 1.5vw 3vh;
  margin-left: 3vw;
  margin-top: 2vh;
  display: inline;
  position: fixed;
  /* border: 3px black solid; */
  :hover {
    /* background: url(${BlueRefresh}) center no-repeat;
      background-size: 1.5vw 3vh; */
    transform: scale(1.1);
  }
`;
//  원그래프 블럭
const GraphBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 20vh;
  margin-top: 5vh;
  flex-direction: row;
  display: flex;
  border: 0.911773px solid #e7e8f2;
  border-radius: 5.47064px;
`;

const BalanceAndGraphBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 3px purple solid;
  height: 35vh;
  width: 91vw;
`;

const GreetingMsg = styled.div`
width: 30vw; 
height: 100%;
display: flex;
justify-content: center;
align-items: center; 
font-size: 3vmin;
`

const EmailMsg = styled.div`
width: 40vw; 
height: 100%;
display: flex;
justify-content: center;
align-items: center; 
font-size: 3vmin;
`
const ProfileImg = styled.div`
width: 15vw; 
height: 100%;
display: flex;
justify-content: center;
align-items: center; 
  
`

// ==============================================================
function MypagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.account.isLoggedin);
  const user = JSON.parse(useSelector((state) => state.account.user));
  const [isChangeForm, setIsChangeForm] = useState(false);

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin]);

  // 수정하기 버튼 누르면 모달창이 뜸
  const handlePageToForm = () => {
    setIsChangeForm(!isChangeForm);
  };

  const wallet = JSON.parse(useSelector(state => state.account.wallet))
  const [ data, setData ] = useState([])
  const [ cash, setCash ] = useState(0)
  const handleBalanceReset = () => {
    dispatch(resetWalletAsync());
  };

  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const [coinInWallet, setCoinInWallet] = useState([]);
  const { socketData } = useUpbitWebSocket(
    coinInWallet,
    "ticker",
    webSocketOptions
  );

  useEffect(() => {
    if (wallet.length > 0) {
      const tmp = wallet.map((ele) => ({ market: ele.coinCode }));
      setCoinInWallet(tmp);
    }
  }, []);
  useEffect(() => {
    if (socketData) {
      let newCash = 0
      const newData = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code)
        newCash += coin.trade_price * tmp.coinAmount
        return {
          name: `${tmp.coinName}(${coin.code})`,
          code: coin.code,
          amount: tmp.coinAmount,
          average: tmp.coinAverage,
          percent: `${(
            (coin.trade_price / tmp.coinAverage) *
            tmp.coinAmount
          ).toFixed(2)} %`,
        };
      });
      setCash(newCash)
      setData(newData)
    }
  }, [socketData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "코인 이름",
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorKey: "amount", //simple recommended way to define a column
        header: "수량",
        enableColumnFilter: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: "average", //simple recommended way to define a column
        header: "평균 매수 가격",
        enableColumnFilter: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: "percent", //simple recommended way to define a column
        header: "수익률",
        enableColumnFilter: false,
      },
    ],
    []
  );
  const customColumns = useMemo(
    () => [
      {
        name: 'name', //simple recommended way to define a column
        header: '코인 이름',
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        name: 'amount', //simple recommended way to define a column
        header: '수량',
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        name: 'average', //simple recommended way to define a column
        header: '평균 매수 가격',
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        name: 'percent', //simple recommended way to define a column
        header: '수익률',
      },
    ],
    [],
  );
  console.log(cash)
  return (
    <MyPageBlock>
      <NavBlock>
        <Navbar></Navbar>
      </NavBlock>
      <MyBlock>
        {isChangeForm && (
          <>
            <ChangeMyInfoModal
              user={user}
              handlePageToForm={handlePageToForm}
            />
          </>
        )}
        <ProfileBlock>
          <GreetingMsg>좋은 하루 되세요 {user.userId}님!</GreetingMsg>
          <EmailMsg>{user.email}</EmailMsg>
          {/* 회원정보 수정하기 버튼 */}
          <SettingButton onClick={handlePageToForm}></SettingButton>
          <ProfileImg>
            <StyledImg src={`${process.env.PUBLIC_URL}/profile/profile${user.imagePath}.png`} alt={`프로필 이미지${user.imagePath}`}/>
          </ProfileImg>
        </ProfileBlock>
        <BalanceAndGraphBlock>
          <h3>잔고</h3>


            <CashBlock>
              <PiggyBankImg></PiggyBankImg>
              <div>
                <p>잔액 : {user.balance} 원</p>
              </div>
              {/* 잔액 초기화 버튼 */}
              <div>
                <BalanceRefreshBtn
                  onClick={handleBalanceReset}
                ></BalanceRefreshBtn>
              </div>
            </CashBlock>
          <GraphBlock>
            {data.length >= 1 && (
              <DoughnutChart socketData={socketData} wallet={wallet} />
            )}
          </GraphBlock>
        </BalanceAndGraphBlock>
        <br />
        <WalletBlock>
          <p>나의 보유 코인</p>
          <hr />
          {(data.length >= 1) && 
            <MaterialReactTable
              muiTableBodyRowProps={({ row }) => ({
                onClick: (event) => {
                  console.info(event, row.id);
                }
                })}
              columns={columns}
              data={data}
              enableFullScreenToggle={false}
              enableGlobalFilter={false} //turn off a feature
              enableDensityToggle={false}
              enableHiding={false}
              initialState={{ density: 'compact' }}
              />
            }
          <hr />
          {data && <CustomTable data={data} columns={customColumns} />}
        </WalletBlock>
      </MyBlock>
    </MyPageBlock>
  );
              }
export default MypagePage;