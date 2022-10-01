import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { historyAsync, rankingAsync, fetchOtherUserAsync } from "../store/accountSaga";
import { useSelector } from "react-redux";
import MaterialReactTable from "material-react-table";
const OtherUser = () => {
  const historylist = useSelector((state) => state.account.historylist);
  const otheruser = useSelector((state) => state.account.otheruser);
  return (
    <>
      {/* <h1>명예의전당 페이지입니다</h1> */}
      {/* <div>{rankinglist.map((rank) => rank.user.userId)}</div>
      <div>{historylist.map((history) => history.historyTime)}</div> */}
      <h1>{otheruser.userId}님의 정보입니다.</h1>
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
  // console.log("랭킹 리스트", rankinglist);
  // console.log("거래내역 리스트", historylist);
  function selectUser(userId) {
    dispatch(historyAsync(userId));
    dispatch(fetchOtherUserAsync(userId));
  }
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
      {/* <h1>명예의전당 페이지입니다</h1> */}
      {/* <div>{rankinglist.map((rank) => rank.user.userId)}</div>
      <div>{historylist.map((history) => history.historyTime)}</div> */}
      {/* {otheruser.userId}
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
      </table> */}
      <OtherUser></OtherUser>
      {rankinglist && (
        <MaterialReactTable
          muiTableBodyRowProps={({ row }) => ({
            onClick: (event) => selectUser(row.original.user.userId),
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
    </>
  );
}

export default Honor;
