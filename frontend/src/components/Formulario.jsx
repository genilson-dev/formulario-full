import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Formulario.css";
import { API_URL } from "../config/api"; // ← usa API_URL igual no Login

function Formulario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    if (!validarSenha(password)) {
      setMessage(
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número ❌"
      );
      setLoad(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Authorization opcional
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Cadastro realizado com sucesso para: ${name}`);
        navigate("/login");
      } else {
        setMessage(data.error || "Erro ao cadastrar ❌");
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setMessage("Erro ao cadastrar: tente novamente.");
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Novo Cadastro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Informe seu nome"
          required
          className="form-input"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe seu e-mail"
          required
          className="form-input"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe sua senha"
          required
          className="form-input"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-input"
        >
          <option value="USER">Usuário</option>
          <option value="ADMIN">Administrador</option>
          <option value="VISITANTE">Visitante</option>
        </select>

        <button type="submit" disabled={load} className="form-button">
          {load ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default Formulario;
