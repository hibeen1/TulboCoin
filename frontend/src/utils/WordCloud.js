import { TagCloud } from 'react-tagcloud'
import styled from 'styled-components'


const WordCloudBlock = styled.div`
  width: 50vw;
  height: 10vh;
  /* border: red solid 3px; */
  margin-top: 20vh;
  margin-left: 30vw;
`


const data = [
  { value: 'jQuery', count: 250 },
  { value: 'MongoDB', count: 180 },
  { value: 'JavaScript', count: 380 },
  { value: 'React', count: 300 },
  { value: 'Nodejs', count: 280 },
  { value: 'Express.js', count: 250 },
  { value: 'HTML5', count: 330 },
  { value: 'CSS3', count: 200 },
  { value: 'Webpack', count: 220 },
  { value: 'Babel.js', count: 70 },
  { value: 'ECMAScript', count: 250 },
  { value: 'Jest', count: 150 },
  { value: 'Mocha', count: 170 },
  { value: 'React Native', count: 270 },
  { value: 'Angular.js', count: 300 },
  { value: 'TypeScript', count: 150 },
  { value: 'Flow', count: 300 },
  { value: 'NPM', count: 11 },
]

const options = {
  // luminosity: 'light',
  hue: 'blue',
}

function WordCloud() {
  return(
    <WordCloudBlock>
    <TagCloud
    minSize={10}
    maxSize={40}
    colorOptions={options}
    tags={data}
    onClick={tag => alert(`'${tag.value}'가 선택되었습니다`)}
    style={{ width: 300, textAlign: 'center' }}
    className="myTagCloud"
  />
  </WordCloudBlock>
)}

export default WordCloud;