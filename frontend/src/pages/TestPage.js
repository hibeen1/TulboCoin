import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAsync } from '../store/accountSaga';

function TestPage() {
  const [ userSeq, setUserSeq ] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.account.user)
  const onFetchUser = (e) => {
    e.preventDefault()
    dispatch(fetchUserAsync(userSeq))
  }

  const handleInputChange = (e) => {
    setUserSeq(e.target.value)
  }

  return <>
  <h1>테스트페이지</h1>
    <form>
      <label htmlFor="userseq">검색할 user seq</label>
      <input type="text" id="userseq" textholder="userseq" onChange={handleInputChange} />
      <button onClick={onFetchUser}>검색하기</button>
    </form>
    {user && 
      <>
        <p>{user.userId}</p>
        <p>{user.email}</p>
        <p>{user.balance}</p>
        <p>{user.imagePath}</p>
        <p>{user.password}</p>
        <p>{user.userSeq}</p>
      </>
    }
  </>
}

export default TestPage