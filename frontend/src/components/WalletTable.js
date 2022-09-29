import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { useUpbitWebSocket } from "use-upbit-api";


function WalletTable({ wallet }) {
  const [ data, setData ] = useState([])
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const coinInWallet = JSON.parse(localStorage.getItem('wallet')).map(ele => ele.coinCode)
  console.log(coinInWallet)
  const { socketData } = useUpbitWebSocket(coinInWallet, "ticker", webSocketOptions);

  useEffect(() => {
    const newData = wallet.map((coin) => {
      const [tmp] = socketData.filter(ele => ele.code === coin.coinCode)
      return {
        name: `${coin.coinName}(${coin.coinCode})`,
        code: coin.coinCode,
        amount: coin.coinAmount,
        average: coin.coinAverage,
        percent: (tmp.signed_change_price / coin.coinAverage) * coin.coinAmount
      }
    });
    setData(newData)
  }, [socketData])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: '코인 이름',
        // muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorKey: 'amount', //simple recommended way to define a column
        header: '수량',
        enableColumnFilter: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: 'average', //simple recommended way to define a column
        header: '평균 매수 가격',
        enableColumnFilter: false,
        // Header: <span style={{ color: 'red' }}>수량</span>, //optional custom markup
      },
      {
        accessorKey: 'percent', //simple recommended way to define a column
        header: '수익률',
        enableColumnFilter: false,
      },
    ],
    [],
  );

  return (
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
  );
}

export default WalletTable