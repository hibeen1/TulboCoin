import React, { useState, useEffect } from "react";
import { init, dispose } from "klinecharts";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { selectTime } from "../store/coin";
import { useFetchMarketCode } from "use-upbit-api";
=======

>>>>>>> c0b9694b9f061d90ef368e65a66e64563495a998
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
<<<<<<< HEAD
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state) => state.coinReducer.selectedCoin);
  const selectedTime = useSelector((state) => state.coinReducer.selectedTime);
  // console.log(selectedCoin);
  const { marketCodes } = useFetchMarketCode();
=======
  const selectedCoin = useSelector(state => state.coinReducer.selectedCoin)
  console.log('선택된 코인은', selectedCoin)
>>>>>>> c0b9694b9f061d90ef368e65a66e64563495a998
  let chart;
  const [initialized, setInitialized] = useState(false);
  const newData = useNewData();
  function selectDetailTime(key) {
    dispatch(selectTime(key));
  }

  useEffect(() => {
    chart = init("coin-chart");
    chart.setStyleOptions(getLanguageOption());
    const fetchData = async () => {
      const dataList = await getInitialDataList(selectedCoin, selectedTime);
      chart.applyNewData(dataList);
      setInitialized(true);
    };
    // console.log(chart);
    fetchData();
    return () => {
      dispose("chart");
    };
  }, [selectedCoin, selectedTime]);

  useEffect(() => {
    chart = init("coin-chart");
    if (initialized) {
      chart.updateData(newData);
    }
  }, [newData]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {marketCodes.map(
          (ele) =>
            ele.market === selectedCoin && (
              <>
                {ele.korean_name}({selectedCoin}) 실시간 가격 조회
              </>
            )
        )}
      </div>
      <div className={classes.menu}>
        {timetypes.map(({ key, text }) => {
          return (
            <button key={key} onClick={() => selectDetailTime(key)}>
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
