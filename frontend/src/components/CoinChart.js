import React, { useState, useEffect } from "react";
import { init, dispose } from "klinecharts";

import classes from "./CoinChart.module.css";
// import Layout from "../../Layout";
import getInitialDataList from "../utils/getInitialDataList";
import getLanguageOption from "../utils/getLanguageOption";
import useNewData from "../hooks/useNewData";
const timetypes = [
  { key: "minutes/1", text: "1분" },
  { key: "minutes/5", text: "5분" },
  { key: "days", text: "1일" },
  { key: "months", text: "한달" },
];
const types = [
  { key: "candle_solid", text: "캔들" },
  { key: "candle_stroke", text: "투명 캔들" },
  { key: "ohlc", text: "Bar 형식의 OHLC" },
  { key: "area", text: "Mountain" },
];
const CoinChart = () => {
  let chart;
  const [initialized, setInitialized] = useState(false);
  const newData = useNewData();

  useEffect(() => {
    chart = init("coin-chart");
    chart.setStyleOptions(getLanguageOption());
    const fetchData = async () => {
      const dataList = await getInitialDataList(1);
      chart.applyNewData(dataList);
      setInitialized(true);
    };
    console.log(chart);
    fetchData();
    return () => {
      dispose("chart");
    };
  }, []);

  useEffect(() => {
    chart = init("coin-chart");
    if (initialized) {
      chart.updateData(newData);
    }
  }, [newData]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>ETH-KRW 실시간 가격 조회</p>
      </div>
      <div className={classes.menu}>
        {timetypes.map(({ key, text }) => {
          return (
            <button key={key} onClick={(_) => {}}>
              {text}
            </button>
          );
        })}
      </div>
      <div id="coin-chart" className={classes.chart} />
      <div className={classes.menu}>
        {types.map(({ key, text }) => {
          return (
            <button
              key={key}
              onClick={(_) => {
                chart.setStyleOptions({
                  candle: {
                    type: key,
                  },
                });
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CoinChart;
