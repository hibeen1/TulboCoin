import { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { historyAsync, rankingAsync } from "../store/accountSaga";
import { useSelector } from "react-redux";
import MaterialReactTable from "material-react-table";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { fetchOtherUser } from "../store/account";
import Modal from "../components/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { nodeName } from "jquery";
// import Carousel from "../components/Carousel";

const HonorPageBlock = styled.div`
  display: flex;
`;

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

const HonorBlock = styled.div`
  background-color: #f3f3f3;
  border: solid black 3px;
  width: 94vw;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;

  h1 {
    padding-left: 25px;
  }
  h2 {
    padding-left: 25px;
  }
  img {
    padding-left: 25px;
  }
`;
// const RankingTable = styled.div`
//   width: auto;
//   display: flex;
//   justify-content: center;
// `;
const RankingCard = styled.div`
  width: 20vw;
  height: auto;
  /* border: 2px solid green; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 5vmin; */
`;
const RankingCardItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 25vw;
  height: 30vh;
  border: 3px solid #98a8ea;
  border-radius: 10px;
  margin: 3vmax;
  background-color: white;
  :hover {
    border-color: #061e8c;
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
  }
  cursor: pointer;
`;
const RankingProfile = styled.div`
  display: flex;
  justify-content: center;
  width: 10vw;
  height: 10vh;
  position: absolute;
  top: -5vh;
  left: 7vw;
  /* border: 2px solid black; */
`;
function Honor() {
  useEffect(() => {
    dispatch(rankingAsync());
  }, []);
  const dispatch = useDispatch();
  const rankinglist = useSelector((state) => state.account.rankinglist);
  // const otheruser = useSelector((state) => state.account.otheruser);
  const historylist = useSelector((state) => state.account.historylist);
  const user = JSON.parse(useSelector((state) => state.account.user));
  // function selectUser(data) {
  //   dispatch(fetchOtherUser(data));
  //   dispatch(historyAsync(data.user.userId));
  //   // dispatch(fetchOtherUserAsync(userId));
  // }
  const [isOpenModal, setOpenModal] = useState(false);
  const [userInformation, setUserInformation] = useState();
  const onClickToggleModal = useCallback(
    (data) => {
      setOpenModal(!isOpenModal);
      setUserInformation(data);
      dispatch(historyAsync(data.user.userId));
      console.log(data);
      console.log(data.user.userId);
    },
    [isOpenModal]
  );
  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "user.userId", //simple recommended way to define a column
        header: "사용자",
        enableColumnFilter: false,
        enableSorting: false,
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorKey: "user.balance", //simple recommended way to define a column
        header: "자산",
        enableColumnFilter: false,

        enableSorting: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: "percent", //simple recommended way to define a column
        header: "수익률",
        // enableColumnFilter: false,
        // enableSorting: false,
      },
    ],
    []
  );
  return (
    <>
      <HonorPageBlock>
        <NavBlock>
          <Navbar></Navbar>
        </NavBlock>
        <HonorBlock>
          <h1>
            {rankinglist.map(
              (data, idx) =>
                data.user.userId === user.userId && (
                  <div>
                    {user.userId}님은 {idx + 1} 등입니다.
                  </div>
                )
            )}
          </h1>
          <h2>고수들의 픽을 확인해보세요!! </h2>
          {rankinglist && (
            <div className="carousel">
              <Slider {...settings}>
                {rankinglist.slice(0, 6).map((data, idx) => (
                  <RankingCard onClick={() => onClickToggleModal(data)}>
                    <RankingCardItem>
                      <RankingProfile>
                        <img
                          src={`${process.env.PUBLIC_URL}/profile/profile${data.user.imagePath}.png`}
                          alt={`프로필 이미지${data.user.imagePath}`}
                          width={100}
                          height={100}
                        />
                      </RankingProfile>
                      <div>
                        <h1>{idx + 1} 등</h1>
                        <h1>{data.user.userId}</h1>
                        <h2>수익률 : {data.percent}%</h2>
                        <h2>
                          가입날짜 : {data.user.investStartTime.substring(0, 10)} <></>
                          {/* {data.user.investStartTime.substring(11, 16)} */}
                        </h2>
                      </div>
                    </RankingCardItem>
                  </RankingCard>
                ))}
              </Slider>
            </div>
          )}
          {isOpenModal && (
            <Modal onClickToggleModal={onClickToggleModal}>
              <h1>{userInformation.user.userId}</h1>
              <h1>
                <img
                  src={`${process.env.PUBLIC_URL}/profile/profile${userInformation.user.imagePath}.png`}
                  alt={`프로필 이미지${userInformation.user.imagePath}`}
                  width={64}
                  height={64}
                />
              </h1>
              <h2>{userInformation.user.userId}님의 거래내역입니다</h2>
              <table>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>코인 이름</th>
                    <th>양</th>
                    <th>가격</th>
                    <th>타입</th>
                  </tr>
                </thead>
                <tbody>
                  {historylist.map((history) => (
                    <tr key={history.historyTime}>
                      <td>
                        {history.historyTime.substring(0, 10)} <></>
                        {history.historyTime.substring(11, 19)}
                      </td>
                      <td>{history.historyCoinName}</td>
                      <td>{history.historyCoinAmount}</td>
                      <td>{history.historyCoinPrice}</td>
                      <td>{history.historyType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal>
          )}
          <br />
          {/* <RankingTable> */}
          {rankinglist && (
            <MaterialReactTable
              muiTableBodyRowProps={({ row }) => ({
                onClick: (event) => onClickToggleModal(row.original),
              })}
              columns={columns}
              data={rankinglist}
              enableFullScreenToggle={false}
              enableGlobalFilter={false} //turn off a feature
              enableDensityToggle={false}
              enableHiding={false}
              enablePagination={false}
              initialState={{ density: "compact" }}
            />
          )}
          {/* </RankingTable> */}
        </HonorBlock>
      </HonorPageBlock>
    </>
  );
}
export default Honor;
