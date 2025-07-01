import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.dot1}></span>
        <span className={styles.dot2}></span>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <button
              className={styles.profile}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className={styles.signIn} onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};
