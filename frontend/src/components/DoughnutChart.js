import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip} from 'chart.js'
import { memo, useState, useEffect } from 'react';
Chart.register(ArcElement, Tooltip);

function DoughnutChart({ socketData, wallet }) {
  const [ labels, setLabels ] = useState([])
  const [ amount, setAmount ] = useState([])

  useEffect(() => {
    if (socketData.length >= 1) {
      const labels = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code)
        return `${tmp.coinName}(${coin.code})`})
      setLabels(labels)
      const amount = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code)
        return coin.trade_price})
        setAmount(amount)
    }
  }, [socketData])

  const data ={
    labels: labels,
    datasets: [{
      label: '나의 코인 지갑',
      backgroungColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: amount
    }]
  }

  return <>
    <Doughnut data={data} />
  </>
}

export default memo(DoughnutChart)