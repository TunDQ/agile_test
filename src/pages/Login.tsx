import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await login(username);
      authLogin(accessToken, refreshToken);
      setError("");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      let message = "Đăng nhập thất bại. Vui lòng thử lại!";
      if (err && typeof err === "object" && "response" in err) {
        // @ts-expect-error: err có thể là AxiosError nhưng không xác định rõ kiểu ở đây
        message = err.response?.data?.message || message;
      }
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.logo}>
        <span className={styles.dot1}></span>
        <span className={styles.dot2}></span>
      </header>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Sign In</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Sign In
          </button>
        </form>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}
