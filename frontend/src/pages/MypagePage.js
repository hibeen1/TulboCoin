import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { putUserAsync, deleteUserAsync, resetWalletAsync } from '../store/accountSaga'
import MyWallet from "../components/MyWallet"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import GreySetting from "../media/images/icons/GreySetting.png"
import BlueSetting from "../media/images/icons/BlueSetting.png"
import GreyRefresh from "../media/images/icons/GreyRefresh.png"
import BlueRefresh from "../media/images/icons/BlueRefresh.png"


import PiggyBank from "../media/images/PiggyBank.png"
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
  flex-direction: column;
`

const ProfileBlock = styled.div`
/* background-color: #F3F3F3; */
  border: solid green 3px;
  width: 91vw;
  height: 30vh;
  margin-left: 1vw;
  margin-top: 1vw;

  flex-direction: column;

  h1 {
    /* border: solid black 3px; */
  }

  p{
    /* border: solid purple 3px;  */
  }

  .email{
    margin-left: 40vw;

  }

`

const StyledImg = styled.img`
  width: 3vw;
  height: 5vh;
  position:fixed;
  margin-top: 1vh;
  margin-left: 56vw;
  display:inline;
  /* border: 3px red solid; */
`
  
const WalletBlock = styled.div`
  border: solid red 3px;
  width: 85vw;
  height: 30vh;
  margin-left: 1vw;
  margin-top: 5vw;

  
`
// 회원정보 수정하기 버튼
const SettingButton = styled.button`
  width: 1.5vw;
  height: 3vh;
  background: url(${GreySetting}) no-repeat center;
  background-size: 1.5vw 3vh;
  margin-left: 3vw;
  margin-top: 2vh;
  display:inline;
  position:fixed;
  /* border: 3px black solid; */
  :hover {
      background: url(${BlueSetting}) center no-repeat;
      background-size: 1.5vw 3vh;
    }
  
`

// 잔액 표시된 하얀 네모
const CashBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 20vh;
  margin-top: 5vh;
  flex-direction: row;
  display:flex;
  border: 0.911773px solid #E7E8F2;
  border-radius: 5.47064px;
`
const PiggyBankImg = styled.div`
  width: 6vw;
  height: 8.5vh;
  background: url(${PiggyBank}) no-repeat center;
  background-size: 6vw 8.5vh;
  margin-top: 2vh;
  margin-left: 1vw;
  
`

const BalanceRefreshBtn = styled.button`
  width: 1.5vw;
  height: 3vh;
  background: url(${GreyRefresh}) no-repeat center;
  background-size: 1.5vw 3vh;
  margin-left: 3vw;
  margin-top: 2vh;
  display:inline;
  position:fixed;
  /* border: 3px black solid; */
  :hover {
      background: url(${BlueRefresh}) center no-repeat;
      background-size: 1.5vw 3vh;
    }
  
`

const GraphBlock = styled.div`
  background-color: #ffffff;
  width: 30vw;
  height: 20vh;
  margin-top: 5vh;
  flex-direction: row;
  display:flex;
  border: 0.911773px solid #E7E8F2;
  border-radius: 5.47064px;
  
`

function MypagePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedin = useSelector(state => state.account.isLoggedin)
  const user = JSON.parse(useSelector(state => state.account.user))
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
    setForm({
      email: user.email,
      imagePath: user.imagePath,
    })
  }, [])

  useEffect(() => {
    setChecked(user.imagePath)
  }, [user])

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/')
    }
  }, [isLoggedin])

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
           <StyledImg src={`${process.env.PUBLIC_URL}/profile/profile${user.imagePath}.png`} alt={`프로필 이미지${user.imagePath}`} />
          <p style={{display:'inline'}} className='email'>{user.email}</p>
          {/* 회원정보 수정하기 버튼 */}
          <SettingButton onClick={handlePageToForm}></SettingButton>
          <h3>잔고</h3>
          <div style={{display:'inline'}}>
          <CashBlock>
            <PiggyBankImg></PiggyBankImg>
          <div><p>잔액 : {user.balance} 원</p></div>
          <div><BalanceRefreshBtn onClick={handleBalanceReset}>잔액 초기화하기</BalanceRefreshBtn></div>
          </CashBlock>
          </div>

          <GraphBlock>
            {/* 원그래프 들어올 자리 */}
          </GraphBlock>
        </div>
        
        <br />
          <WalletBlock>
          <p>나의 보유 코인</p>
        <hr />
            <MyWallet />  
          </WalletBlock>
        </ProfileBlock>

    }
  </>}
          </MyBlock>      
      </MyPageBlock>
)
  }
export default MypagePage