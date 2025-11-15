// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botão de três pontinhos */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        &#8942; {/* três pontinhos verticais */}
      </button>

      {/* Menu lateral */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
          <li><Link to="/home" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/formulario" onClick={() => setOpen(false)}>Formulário</Link></li>
          <li><Link to="/recupera-senha" onClick={() => setOpen(false)}>Recuperar Senha</Link></li>
          <li><Link to="/reset-senha" onClick={() => setOpen(false)}>Resetar Senha</Link></li>
          <li><Link to="/users" onClick={() => setOpen(false)}>Usuários</Link></li>
          <li><Link to="/users/1/editar" onClick={() => setOpen(false)}>Editar Usuário</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
