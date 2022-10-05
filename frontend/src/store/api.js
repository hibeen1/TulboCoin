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
  return await axios.post("/users/reset", null, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
// 지갑 초기화 요청 끝

export const rankingApi = async () => {
  return await axios.get("/rank", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

// 히스토리 받아오기
export const historyApi = async (body) => {
  return await axios.get(`/users/history/${body}`);
};
// 히스토리 받아오기 끝

export const fetchOtherUserApi = async (body) => {
  return await axios.get(`/users/info/id/${body}`);
};

// 뉴스 정보 요청
export const newsApi = async (body) => {
  return await axios.get(`/news/${body}`);
};
// 뉴스 정보 요청 끝

// 좋아요 코인 불러오기
export const fetchLikedCoinApi = async () => {
  return await axios.get('/likes', {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}
// 좋아요 코인 불러오기 끝

// 관심코인 등록
export const coinLikeApi = async (body) => {
  return await axios.post('/likes', body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}
// 관심코인 등록 끝

// 관심코인 삭제
export const coinLikeDeleteApi = async (body) => {
  return await axios.delete('/likes', {data: body,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
}
// 관심코인 삭제 끝