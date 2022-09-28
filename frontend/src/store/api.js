import axios from "axios";

export const signupApi = async (body) => {
  return await axios.post('/users', body)
}

export const fetchUserApi = async () => {
  return await axios.get(`auth/my-info`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
}

// 로그인요청
export const loginApi = async (body) => {
  return await axios.post('/auth/login', body)
}
// 로그인요청 끝

// 정보수정 요청
export const putUserApi = async (body) => {
  return await axios.put(
    'auth/my-info', 
    body, 
    {
      headers: 
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
}
// 정보수정 요청 끝