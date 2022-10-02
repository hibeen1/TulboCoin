import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { putUserAsync, deleteUserAsync, resetWalletAsync } from '../store/accountSaga'
import MyWallet from "../components/MyWallet"
import styled from "styled-components"
import Navbar from "../components/Navbar"

const MyPageBlock = styled.div`
  display: flex;
`

const NavBlock = styled.div`
  /* border: solid yellow 3px; */
  width: 6vw;
  height: 100vh;
  position: relative;
  display: flex;
  
`

const MyBlock = styled.div`
background-color: #F3F3F3;
  /* border: solid black 3px; */
  width: 94vw;
  height: 100vh;
  position: relative;
  display: flex;
`

const ProfileBlock = styled.div`
/* background-color: #F3F3F3; */
  border: solid red 3px;
  width: 94vw;
  height: 30vh;

`

const StyledImg = styled.img`
  width: 3vw;
  height: 3vh;
`
  


function MypagePage() {
  const dispatch = useDispatch()
  const isLoggedin = useSelector(state => state.account.isLoggedin)
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

  const handleChangeInfo = (e) => {
    e.preventDefault()
    dispatch(putUserAsync({imagePath: checked, email: form.email, userId: user.userId, balance: user.balance}))
  }
  
  const handleBalanceReset = () => {
    dispatch(resetWalletAsync())
  }
  
  const handleDelete = () => {
    dispatch(deleteUserAsync())
  }

  return (
        <MyPageBlock>
        <NavBlock>
          <Navbar></Navbar>
        </NavBlock>
        <MyBlock>
  {isLoggedin && <>

    {/* <h1>마이페이지입니다.</h1> */}
    {isChangeForm ? <>

      <form onSubmit={handleChangeInfo}>
        {/* <p>프로필 사진</p> */}
        {imagePath.map((item) => (
          <label key={item.value} htmlFor={item.name}>
              <input type="radio" id={item.name} value={item.value} checked={item.value === checked} onChange={handleRadioChange} />
              <StyledImg src={`${process.env.PUBLIC_URL}/profile/profile${item.value}.png`} alt={`프로필 이미지${item.value}`} />
            </label>
          ))
        }
        <br />
        <label htmlFor="email">이메일 : </label>
        <input type="text" name="email" value={form.email} onChange={handleForm} /><br />
        <button>수정하기</button>
      </form>
      <button onClick={handlePageToForm}>취소</button>
      <button onClick={handleDelete} on>회원탈퇴</button>

      </>
      :
      <ProfileBlock>
        <div>
          <h1 style={{display:'inline'}}>좋은 하루 되세요 {user.userId}님!</h1>
          <p><StyledImg src={`${process.env.PUBLIC_URL}/profile/profile${user.imagePath}.png`} alt={`프로필 이미지${user.imagePath}`} /></p>
          <p>이메일 : {user.email}</p>
          <p>잔액 : {user.balance} KRW</p>
          <button onClick={handleBalanceReset}>잔액 초기화하기</button>
        </div>
        <button onClick={handlePageToForm}>수정하기</button>
        <p>나의 보유 코인</p>
        <hr />
        <MyWallet />
        </ProfileBlock>

    }
  </>}
          </MyBlock>      
      </MyPageBlock>
)
  }
export default MypagePage