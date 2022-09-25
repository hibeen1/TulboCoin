import React, { useState, useEffect } from "react";
import { init, dispose } from "klinecharts";

import classes from "./CoinChart.module.css";
import Layout from "../Layout";
import getInitialDataList from "../utils/getInitialDataList";
import getLanguageOption from "../utils/getLanguageOption";
import useNewData from "../hooks/useNewData";
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
    <Layout title="Bitcoin(ETH-KRW) 실시간 가격 조회">
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
    </Layout>
  );
};

export default CoinChart;
