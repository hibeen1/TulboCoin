import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { deleteUserAsync, putUserAsync } from '../store/accountSaga'
import styled from "styled-components"

const StyledImg = styled.img`
width: 3vw;
height: 5vh;
position:fixed;
margin-top: 1vh;
margin-left: 5vw;
  display:inline;
  /* border: 3px red solid; */
`

const StyledModal = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  border: 1px solid black;
  border-radius: 8px;
`
const StyledModalDiv = styled.div`
position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

`

function ChangeMyInfoModal({ user, handlePageToForm }) {
  const dispatch = useDispatch()

  const [ form, setForm ] = useState({})
  const [error, setError] = useState({email: "",});

  const imagePath = 
  [
    {name: '첫번째', value: '1'}, 
    {name: '두번째', value: '2'}, 
    {name: '세번째', value: '3'}, 
    {name: '네번째', value: '4'}, 
    {name: '다섯번째', value: '5'}
  ]

  useEffect(() => {
    setForm({
      email: user.email,
      imagePath: user.imagePath,
    })
  }, [])

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  
  const mail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const vaildate = () => {
    const error = {
      email: ''
    }
    if (!mail.test(form.email)) {
      error.email = "정확한 이메일을 입력해주세요";
    }
    return error
  }
  
  const handleChangeInfo = (e) => {
    e.preventDefault()
    const error = vaildate()
    setError(error);
    if (Object.values(error).some((v) => v)) {
      return;
    } else{
      dispatch(putUserAsync({imagePath: form.imagePath, email: form.email, userId: user.userId, balance: user.balance}))
    }
  }

  const handleDelete = () => {
    dispatch(deleteUserAsync())
  }
  
  return <>
    <StyledModalDiv onClick={handlePageToForm} >
      <StyledModal onClick={(e) => e.stopPropagation()} >
        <form onSubmit={handleChangeInfo}>
          <button onClick={handlePageToForm} >X</button>
          {imagePath.map((item) => (
            <p key={item.value}><label htmlFor={item.name}>
                <input type="radio" id={item.name} value={item.value} name='imagePath' checked={item.value === form.imagePath} onChange={handleForm} />
                <StyledImg src={`${process.env.PUBLIC_URL}/profile/profile${item.value}.png`} alt={`프로필 이미지${item.value}`} />
            </label></p>
            ))
          }
          <br />
          <label htmlFor="email">이메일 : </label>
          <input type="text" name="email" value={form.email} onChange={handleForm} /><br />
          {error.email && <p>{error.email}</p>}
          <button>수정하기</button>
        </form>
        <button onClick={handlePageToForm} >취소</button>
        <button onClick={handleDelete} >회원탈퇴</button>
      </StyledModal>
    </StyledModalDiv>
  </>
}

export default ChangeMyInfoModal