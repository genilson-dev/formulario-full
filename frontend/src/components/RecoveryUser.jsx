import { useState } from "react";
import "../styles/RecoveryUser.css"; // importa o CSS separado

function RecoveryUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    fetch("http://localhost:1000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(
          `Instruções de recuperação de usuário enviadas para o email: ${email}`
        );
        setLoad(false);
      })
      .catch((err) => {
        console.error("O erro do catch é esse:", err);
        setMessage("Erro ao enviar: Tente novamente.");
        setLoad(false);
      });
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Recuperar Usuário</h2>
      <form onSubmit={handleSubmit} className="recovery-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe o e-mail para recuperação"
          required
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe a senha"
          required
          className="form-input"
        />
        <button type="submit" disabled={load} className="form-button">
          {load ? "Enviando..." : "Recuperar Usuário"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default RecoveryUser;
