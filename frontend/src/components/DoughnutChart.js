import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { memo, useState, useEffect } from "react";
import styled from "styled-components";
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutBlock = styled.div`
  width: 30vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  /* margin-left: 10vw;
  margin-top: 5vh; */
  /* border: 3px solid black; */
`;

function DoughnutChart({ socketData, wallet }) {
  const [labels, setLabels] = useState([]);
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    if (socketData && wallet) {
      const labels = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code);
        return `${tmp.coinName}`;
      });
      setLabels(labels);
      const amount = socketData.map((coin) => {
        const [tmp] = wallet.filter((ele) => ele.coinCode === coin.code);
        return coin.trade_price * tmp.coinAmount;
      });
      setAmount(amount);
    }
  }, [socketData]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "나의 코인 지갑",
        backgroundColor: ["#aabfea", "#697ed9", "#243ead"],
        borderColor: ["#aabfea", "#697ed9", "#243ead"],
        data: amount,
        borderWidth: 5,
      },
    ],
  };

  const options = {
    // responsive 속성을 false로 지정한다.
    responsive: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          // This more specific font property overrides the global property
          font: {
              family: "jua"}
          }

      },
    },
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

  return (
    <>
      <DoughnutBlock>
        <Doughnut
          data={data}
          options={options}
          style={{ position: "relative", height: "20vh", width: "20vw" }}
        />
      </DoughnutBlock>
    </>
  );
}

export default memo(DoughnutChart);
