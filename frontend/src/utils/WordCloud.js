import { TagCloud } from "react-tagcloud";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useFetchMarketCode } from "use-upbit-api";
import { selectCoin } from "../store/coin";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const WordCloudBlock = styled.div``;

function WordCloud() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState([]);
  useEffect(() => {
    // 변경시 호출
    if (!isLoading && marketCodes) {
      setTargetMarketCode(marketCodes.filter((ele) => ele.market.includes("KRW")));
    }
    // 2번째 인자 [isLoading, marketCodes]  -> 상태변경을 감지할 애들
  }, [isLoading, marketCodes]);

  const handleClickTag = (tag) => {
    const [coin] = targetMarketCode.filter(ele => ele.korean_name===tag.value)
    dispatch(selectCoin({name: coin.korean_name, code: coin.market}))
    navigate('/sise')
  }

  const options = {
    // luminosity: 'light',
    hue: "blue",
  };
  const selectedWordCloud = useSelector((state) => state.coinReducer.selectedWordCloud);
  const data = selectedWordCloud;
  return (
    <TagCloud
      minSize={15}
      maxSize={90}
      colorOptions={options}
      tags={data}
      onClick={(tag) => handleClickTag(tag)}
      style={{ width: 800, textAlign: "center" }}
      className="myTagCloud"
    />
  );
}

export default WordCloud;
