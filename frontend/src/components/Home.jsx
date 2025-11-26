import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.userName) {
      setUserName(location.state.userName);
      return;
    }

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
    <div className="home-page">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <h2 className="logo">🎵 Sistema</h2>
        </div>

        <div className="nav-right">
          {!userName && (
            <Link to="/login">
              <button className="btn primary">Login</button>
            </Link>
          )}

          <Link to="/formulario">
            <button className="btn">Criar usuário</button>
          </Link>

          <Link to="/create-music">
            <button className="btn">Criar músico</button>
          </Link>

          {userName && (
            <>
              <span className="user-tag">👤 {userName}</span>
              <button onClick={handleLogout} className="btn logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="home-container">
        <h1 className="title">Bem-vindo, {userName || "Visitante"} 👋</h1>
        <p className="subtitle">Você está na Home Page</p>
      </div>
    </div>
  );
}