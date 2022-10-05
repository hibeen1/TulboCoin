import { TagCloud } from "react-tagcloud";
import styled from "styled-components";
import { useSelector } from "react-redux";

const WordCloudBlock = styled.div``;

function WordCloud() {
  // const data = [
  //   { value: 'jQuery', count: 250 },
  //   { value: 'MongoDB', count: 180 },
  //   { value: 'JavaScript', count: 380 },
  //   { value: 'React', count: 300 },
  //   { value: 'Nodejs', count: 280 },
  //   { value: 'Express.js', count: 250 },
  //   { value: 'HTML5', count: 330 },
  //   { value: 'CSS3', count: 200 },
  //   { value: 'Webpack', count: 220 },
  //   { value: 'Babel.js', count: 70 },
  //   { value: 'ECMAScript', count: 250 },
  //   { value: 'Jest', count: 150 },
  //   { value: 'Mocha', count: 170 },
  //   { value: 'React Native', count: 270 },
  //   { value: 'Angular.js', count: 300 },
  //   { value: 'TypeScript', count: 150 },
  //   { value: 'Flow', count: 300 },
  //   { value: 'NPM', count: 11 },
  //   { value: 'Flow', count: 300 },
  //   { value: 'NPM', count: 11 },
  // ]

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
      onClick={(tag) => alert(`'${tag.value}'가 선택되었습니다`)}
      style={{ width: 800, textAlign: "center" }}
      className="myTagCloud"
    />
  );
}

export default WordCloud;
