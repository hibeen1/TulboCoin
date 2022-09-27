import axios from "axios";

export const signupApi = async (body) => {
  return await axios.post('/users', body)
}

export const fetchUserApi = async (params) => {
  return await axios.get(`users/info/seq/${params}`)
}

export const loginApi = async (body) => {
  return await axios.post('/auth/login', body)
}