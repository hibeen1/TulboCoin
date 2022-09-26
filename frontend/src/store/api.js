import axios from "axios";

export const signupApi = async (body) => {
  return await axios.post('/users', body)
}

export const fetchAllUsersApi = async () => {
  return await axios.get('/users')
}

export const fetchUserApi = async (params) => {
  return await axios.get(`users/my-info/${params}`)
}