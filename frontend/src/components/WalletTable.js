import React, { memo, useMemo } from 'react';
import { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';


function WalletTable({ wallet, socketData }) {
  const [ data, setData ] = useState([])
  useEffect(() => {
    if (wallet) {
      const newData = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code)
        return {
          name: `${tmp.coinName}(${coin.code})`,
          code: coin.code,
          amount: tmp.coinAmount,
          average: tmp.coinAverage,
          percent: `${((coin.trade_price / tmp.coinAverage - 1) * 100).toFixed(2)} %`
        }
      });
      setData(newData)
    }
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

  return <>
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
  </>
}

export default memo(WalletTable)