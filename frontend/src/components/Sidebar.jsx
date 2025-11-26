import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);

  // Recupera o usuário logado
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "USER"; // fallback

  return (
    <div>
      {/* Botão hamburguer */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <ul>

          <li><Link to="/home" onClick={() => setOpen(false)}>🏠 Home</Link></li>

          <li><Link to="/formulario" onClick={() => setOpen(false)}>📝 Formulário</Link></li>

          <li><Link to="/create-music" onClick={() => setOpen(false)}>🎵 Criar Música</Link></li>

          {/* =========================== */}
          {/*  MENU APENAS PARA ADMIN      */}
          {/* =========================== */}
          {role === "ADMIN" && (
            <>
              <li className="sidebar-section-title">Administração</li>

              <li>
                <Link to="/users" onClick={() => setOpen(false)}>
                  👥 Usuários
                </Link>
              </li>
            </>
          )}

          {/* =========================== */}
          {/*  RECUPERAÇÃO DE SENHA       */}
          {/* =========================== */}
          <li><Link to="/recupera-senha" onClick={() => setOpen(false)}>🔑 Recuperar Senha</Link></li>

          {/* Logout */}
          <li>
            <button 
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setOpen(false);
                window.location.href = "/login";
              }}
            >
              🚪 Sair
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
