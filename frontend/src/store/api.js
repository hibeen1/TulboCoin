import axios from "axios";

export const signupApi = async (body) => {
  return await axios.post("/users", body);
};

export const fetchUserApi = async () => {
  return await axios.get(`auth/my-info`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// 로그인요청
export const loginApi = async (body) => {
  return await axios.post("/auth/login", body);
};
// 로그인요청 끝

// 정보수정 요청
export const putUserApi = async (body) => {
  return await axios.put("auth/my-info", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// 정보수정 요청 끝

// 매수 요청
export const buyApi = async (body) => {
  return await axios.post(`/buy`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// 매수 요청 끝

// 매도 요청
export const sellApi = async (body) => {
  return await axios.post(`/sell`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
// 매도 요청 끝

// 회원탈퇴
export const deleteApi = async () => {
  return await axios.delete("/auth/my-info", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
// 회원탈퇴 끝

// 지갑정보 요청
export const fetchWalletApi = async () => {
  return await axios.get("/wallet", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
// 지갑정보 요청 끝

// 지갑 초기화 요청
export const resetWalletApi = async () => {
  return await axios.post("/uses/reset", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
// 지갑 초기화 요청 끝

export const rankingApi = async () => {
  return await axios.get("/rank", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const historyApi = async (body) => {
  return await axios.get(`/users/history/${body}`);
};

export const fetchOtherUserApi = async (body) => {
  return await axios.get(`/users/info/id/${body}`);
};
