import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip} from 'chart.js'
import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
Chart.register(ArcElement, Tooltip);



const DoughnutBlock = styled.div`
  width: 30vw;
  height: 20vh;
  margin-left: 10vw;
  margin-top: 5vh;
  /* border: 3px solid black; */
`

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
        return coin.trade_price * tmp.coinAmount})
        setAmount(amount)
    }
  }, [socketData])

  const data ={
    labels: labels,
    datasets: [{
      label: '나의 코인 지갑',
      backgroungColor: ['#1A70FF', '#F39D00','#E8DE00'],
      borderColor: ['#1A70FF', '#F39D00','#E8DE00'],
      data: amount,
      borderWidth: 5
    }]
  }

  const options = {
    // responsive 속성을 false로 지정한다.
    responsive: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <>
  <DoughnutBlock>
    <Doughnut data={data} options={options} style={{ position: "relative", height: "10vh", width: "8vw"}}/>
  </DoughnutBlock>
  </>
}

export default memo(DoughnutChart)