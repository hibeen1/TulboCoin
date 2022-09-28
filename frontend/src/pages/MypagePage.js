import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { putUserAsync } from '../store/accountSaga'
import { useNavigate } from 'react-router-dom'

function MypagePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ user, setUser ] = useState({})
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
    setForm({
      email: JSON.parse(localStorage.getItem('user')).email,
      imagePath: JSON.parse(localStorage.getItem('user')).imagePath,
    })
  }, [])
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

  const handleChangeInfo = () => {
    dispatch(putUserAsync({...form, userId: user.userId}))
    navigate('/mypage')
  }
  
  const handleBalanceReset = () => {
    dispatch(putUserAsync({'balance': 10000000, userId: user.userId}))
    navigate('/mypage')
  }

  return <>
    <h1>마이페이지입니다.</h1>
    {isChangeForm ? <>
        <form>
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
        </form>
        <button onClick={handleChangeInfo}>수정하기</button>
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
      </>
    }
    {/* <p>{JSON.stringify(user)}</p> */}
  </>
}

export default MypagePage