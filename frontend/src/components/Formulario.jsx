import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Formulario.css"; // importa o CSS separado

function Formulario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  // Função para validar senha
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
      const response = await fetch("http://localhost:1000/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        
      });
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setMessage(`Cadastro realizado com sucesso para: ${name}`);
        navigate("/login"); // 🚀 Redireciona para login
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
        <button type="submit" disabled={load} className="form-button">
          {load ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default Formulario;
