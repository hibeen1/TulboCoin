import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { putUserAsync, deleteUserAsync } from '../store/accountSaga'
import { useNavigate } from 'react-router-dom'

function MypagePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedin = useSelector(state => state.account.isLoggedin)
  const [ user, setUser ] = useState({})
  const [ wallet, setWallet ] = useState([])
  const [ isChangeForm, setIsChangeForm ] = useState(false)
  const imagePath = 
    [
      {name: '첫번째', value: '1'}, 
      {name: '두번째', value: '2'}, 
      {name: '세번째', value: '3'}, 
      {name: '네번째', value: '4'}, 
      {name: '다섯번째', value: '5'}
    ]
  const [ checked, setChecked ] = useState()
  const [ form, setForm ] = useState()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setWallet(JSON.parse(localStorage.getItem('wallet')))
    setForm({
      email: JSON.parse(localStorage.getItem('user')).email,
      imagePath: JSON.parse(localStorage.getItem('user')).imagePath,
    })
  }, [])
  console.log(wallet)

  useEffect(() => {
    setChecked(user.imagePath)
  }, [user])

  // 수정하기 버튼 누르면 화면이 폼으로 바뀜
  const handlePageToForm = () => {
    setIsChangeForm(!isChangeForm)
  }

  const handleRadioChange = (e) => {
    setChecked(e.target.value)
  }

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeInfo = (e) => {
    e.preventDefault()
    dispatch(putUserAsync({imagePath: checked, email: form.email, userId: user.userId, balance: user.balance}))
  }
  
  const handleBalanceReset = () => {
    dispatch(putUserAsync({'balance': 10000000, userId: user.userId, imagePath: user.imagePath, email: user.email}))
  }
  
  const handleDelete = () => {
    dispatch(deleteUserAsync())
  }

  return <>
  {isLoggedin && <>

    <h1>마이페이지입니다.</h1>
    {isChangeForm ? <>
        <form onSubmit={handleChangeInfo}>
          <p>프로필 사진</p>
          {imagePath.map((item) => (
            <label key={item.value} htmlFor={item.name}>
                <input type="radio" id={item.name} value={item.value} checked={item.value === checked} onChange={handleRadioChange} />
                {item.name}
              </label>
            ))
          }
          <br />
          <label htmlFor="email">이메일 : </label>
          <input type="text" name="email" value={form.email} onChange={handleForm} /><br />
          <button>수정하기</button>
        </form>
        <button onClick={handlePageToForm}>취소</button>
      </>
      : <>
        <div>
          <p>아이디 : {user.userId}</p>
          <p>프로필 사진 : {user.imagePath}</p>
          <p>이메일 : {user.email}</p>
          <p>잔액 : {user.balance} KRW</p>
          <button onClick={handleBalanceReset}>잔액 초기화하기</button>
        </div>
        <button onClick={handlePageToForm}>수정하기</button>
        <p>나의 보유 코인</p>
        <hr />
        {/* <p>{JSON.stringify(wallet)}</p> */}
        {wallet.map(coin => (<>
            <p>코인 이름 : {coin.coinName}</p>
            <p>코인 수량 : {coin.coinAmount}</p>
            <p>코인 평균 매수 가격 : {coin.coinAverage}</p>
            <hr />
          </>
        ))}
      </>
    }
    <button onClick={handleDelete} on>회원탈퇴</button>
    </>
  }
  </>
}

export default MypagePage