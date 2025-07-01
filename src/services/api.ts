import axios from "axios";
import { refreshToken as refreshTokenApi } from "./authService";

const api = axios.create({
  baseURL: "https://api-test-web.agiletech.vn",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm accessToken vào header cho mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

// Interceptor đơn giản cho response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Nếu lỗi 401 và chưa thử refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshTokenApi();
        localStorage.setItem("accessToken", data.accessToken);
        // Gán token mới vào header và thử lại request cũ
        originalRequest.headers["Authorization"] = "Bearer " + data.accessToken;
        return api(originalRequest);
      } catch (err) {
        // Nếu refresh cũng lỗi, logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
