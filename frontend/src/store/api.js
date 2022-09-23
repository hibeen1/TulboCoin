import axios from "axios";

export const signupApi = async (body) => 
  await axios.post('/users', body)