import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
