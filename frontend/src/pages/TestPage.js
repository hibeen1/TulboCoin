import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { testAsync } from '../modules/test'

function TestPage() {
  const dispatch = useDispatch()
  const [ isLoading, setIsLoading] = useState(true)
  const [ pageInfo, setpageInfo ] = useState([])
  useEffect(() => {
    setIsLoading(true)
    setpageInfo(dispatch(testAsync()))
    setIsLoading(false)
    console.log(pageInfo)
    // 변경시 호출
    // setpageInfo(fetchedPageInfo)
    // console.log(fetchedPageInfo)
    // 2번째 인자 [isLoading, marketCodes]  -> 상태변경을 감지할 애들
  }, []);
  return <>
    <h1>테스트페이지</h1>
    {isLoading ? <p>로딩중...</p>
    : <ul>
        {pageInfo.map((user) => (
          <li key={user.userId}>
            {user.userId}
          </li>
          ))
        }
      </ul>
    }
  </>
}

export default TestPage