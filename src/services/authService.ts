import axios from "axios";
import api from "./api";

const API_URL = "https://api-test-web.agiletech.vn";

export const login = async (username: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
  });
  return response.data; // { accessToken, refreshToken }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");
  const res = await api.post("/auth/refresh-token", { refreshToken });
  return res.data; // { accessToken }
};
