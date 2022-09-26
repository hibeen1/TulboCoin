import axios from "axios";

const getInitialDataList = (unit) => {
  return axios
    .get(`https://api.upbit.com/v1/candles/minutes/1`, {
      params: {
        market: "KRW-ETH",
        // toISOString() 메서드로 출력되는 시간은 UTC 기준으로 출력됩니다. 이를 대한민국 서울 시간에 맞추기 위해서 3240 * 10000 수식을 현재 시간에 더해주어야 합니다.
        to: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .replace("T", " ")
          .replace(/\..*/, ""),
        count: 200,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data.map((item) => {
        const {
          opening_price,
          low_price,
          high_price,
          trade_price,
          timestamp,
          candle_acc_trade_volume,
        } = item;
        return {
          open: opening_price,
          low: low_price,
          high: high_price,
          close: trade_price,
          volume: candle_acc_trade_volume,
          // 오전 9시 기준 일봉
          // timestamp: Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000,
          timestamp: timestamp,
          turnover:
            ((opening_price + low_price + high_price + trade_price) / 4) * candle_acc_trade_volume,
        };
      });
    })
    .then((arr) => arr.reverse())
    .catch((err) => {
      console.error(err);
    });
};

export default getInitialDataList;
