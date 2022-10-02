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
  height: 100vh;
  position: relative;
  display: flex;
`;
const OtherUser = () => {
  const historylist = useSelector((state) => state.account.historylist);
  const otheruser = useSelector((state) => state.account.otheruser);
  return (
    <>
      <h1>{otheruser.userId}님의 정보입니다.</h1>
      <p>
        프로필 사진 :{" "}
        <img
          src={`${process.env.PUBLIC_URL}/profile/profile${otheruser.imagePath}.png`}
          alt={`프로필 이미지${otheruser.imagePath}`}
        />
      </p>
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
              <td>{history.historyTime}</td>
              <td>{history.historyCoinName}</td>
              <td>{history.historyCoinAmount}</td>
              <td>{history.historyCoinPrice}</td>
              <td>{history.historyType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
function Honor() {
  useEffect(() => {
    dispatch(rankingAsync());
  }, []);
  const dispatch = useDispatch();
  const rankinglist = useSelector((state) => state.account.rankinglist);
  // const otheruser = useSelector((state) => state.account.otheruser);
  const historylist = useSelector((state) => state.account.historylist);
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
    dots: false,
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
      {rankinglist && (
        <div className="carousel">
          <Slider {...settings}>
            {rankinglist.slice(0, 6).map((data, idx) => (
              <div>
                <h1>{idx + 1} 등</h1>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/profile/profile${data.user.imagePath}.png`}
                    alt={`프로필 이미지${data.user.imagePath}`}
                    width={64}
                    height={64}
                  />
                  <h1>{data.user.userId}</h1>
                  <h2>수익률 : {data.percent}%</h2>
                  <h2>
                    가입날짜 : {data.user.investStartTime.substring(0, 10)} <></>
                    {data.user.investStartTime.substring(11, 19)}
                  </h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <HonorPageBlock>
        <NavBlock>
          <Navbar></Navbar>
        </NavBlock>
        <HonorBlock>
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
          <h1>명예의전당 페이지입니다</h1>
          <div>
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
          </div>
        </HonorBlock>
      </HonorPageBlock>
    </>
  );
}
export default Honor;
