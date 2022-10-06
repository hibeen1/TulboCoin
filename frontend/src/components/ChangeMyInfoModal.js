import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAsync, putUserAsync } from "../store/accountSaga";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 5vw;
  height: 8vh;
  position: fixed;
  /* margin-top: 1vh;
  margin-left: 5vw; */
  display: inline;
  /* border: 3px red solid; */
`;

const StyledModal = styled.div`
  padding: 3vmin;
  width: 40vw;
  height: 65vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
`;
const StyledModalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ProfileChangeHeadMsg = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: white;
    width: 3.5vw;
    height: 3vh;
    border: 2px solid red;
    border-radius: 5px;
  }
`;

const ProfileImageSelect = styled.div`
  width: 35vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7vh;
`;

const BottomButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5vh;
  justify-content: center;
  align-items: center;
  padding-top: 10vh;
  button {
    width: 5vw;
    height: 4vh;
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 25px;
  }
  /* border: 2px solid black; */
`;
const ErrorMsg = styled.div`
  color: red;
  margin-left: 4vw;
`;
const EmailChangeMsg = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  height: 5vh;
  button {
    width: 5vw;
    height: 3vh;
    padding: 0;
    border-radius: 5px;
    margin: 2vw;
    font-family: "Jua", sans-serif;
    font-size: 15px;
  }
  input {
    height: 3vh;
    margin-left: 1vw;
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 25px;
  }
`;
function ChangeMyInfoModal({ user, handlePageToForm }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [error, setError] = useState({ email: "" });

  const imagePath = [
    { name: "첫번째", value: "1" },
    { name: "두번째", value: "2" },
    { name: "세번째", value: "3" },
    { name: "네번째", value: "4" },
    { name: "다섯번째", value: "5" },
  ];

  useEffect(() => {
    setForm({
      email: user.email,
      imagePath: user.imagePath,
    });
  }, []);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const vaildate = () => {
    const error = {
      email: "",
    };
    if (!mail.test(form.email)) {
      error.email = "정확한 이메일을 입력해주세요";
    }
    return error;
  };

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const error = vaildate();
    setError(error);
    if (Object.values(error).some((v) => v)) {
      return;
    } else {
      dispatch(
        putUserAsync({
          imagePath: form.imagePath,
          email: form.email,
          userId: user.userId,
          balance: user.balance,
        })
      );
    }
  };

  const handleDelete = () => {
    dispatch(deleteUserAsync());
  };

  return (
    <>
      <StyledModalDiv onClick={handlePageToForm}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleChangeInfo}>
            <ProfileChangeHeadMsg>
              <h1>프로필변경 페이지 입니다.</h1>
              {/* <button onClick={handlePageToForm}>X</button> */}
            </ProfileChangeHeadMsg>
            <h2>변경할 프로필 사진을 선택하세요.</h2>
            <ProfileImageSelect>
              {imagePath.map((item) => (
                <p key={item.value}>
                  <label htmlFor={item.name}>
                    <input
                      type="radio"
                      id={item.name}
                      value={item.value}
                      name="imagePath"
                      checked={item.value === form.imagePath}
                      onChange={handleForm}
                    />
                    <StyledImg
                      src={`${process.env.PUBLIC_URL}/profile/profile${item.value}.png`}
                      alt={`프로필 이미지${item.value}`}
                    />
                  </label>
                </p>
              ))}
            </ProfileImageSelect>
            <h2>이메일을 변경하세요</h2>
            <EmailChangeMsg>
              <label htmlFor="email">이메일 : </label>
              <input type="text" name="email" value={form.email} onChange={handleForm} />
              <button>수정하기</button>
            </EmailChangeMsg>
            <ErrorMsg>{error.email && <p>{error.email}</p>}</ErrorMsg>
          </form>
          <BottomButton>
            <button onClick={handlePageToForm}>취소</button>
            <button onClick={handleDelete}>회원탈퇴</button>
          </BottomButton>
        </StyledModal>
      </StyledModalDiv>
    </>
  );
}

export default ChangeMyInfoModal;
