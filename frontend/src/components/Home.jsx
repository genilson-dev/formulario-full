import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Primeiro tenta pegar do state (passado pelo navigate)
    if (location.state?.userName) {
      setUserName(location.state.userName);
      return;
    }

    // Se não tiver no state, pega do localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || parsedUser.user?.name || "");
      } catch {
        setUserName("");
      }
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName("");
    navigate("/login");
  };

  return (
    <div>
      {/* Barra superior */}
      <div className="navbar">
        {userName && (
          <div className="user-info">
            <span>👤 {userName}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo central */}
      <div className="home-container">
        <h1>Bem-vindo ao Sistema</h1>
        <div className="home-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/formulario">
            <button>Criar novo usuário</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
