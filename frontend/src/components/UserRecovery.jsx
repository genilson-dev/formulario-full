import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecuperacaoSenha() {
  const [step, setStep] = useState("email"); // "email" ou "senha"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // token recebido no e-mail

  const navigate = useNavigate(); // hook para navegação

  // Envia e-mail para recuperação
  const handleEnviarEmail = async () => {
    try {
      await axios.post("http://localhost:1000/recupera-senha", { email });
      alert("Verifique seu e-mail para o link de recuperação!");
      // redireciona para login
      navigate("/login");
    } catch (err) {
      alert("Erro ao enviar e-mail de recuperação");
    }
  };

  // Redefine a senha
  const handleRedefinirSenha = async () => {
    try {
      await axios.post("http://localhost:1000/reset-senha", { token, password });
      alert("Senha redefinida com sucesso!");
      // redireciona para login
      navigate("/login");
    } catch (err) {
      alert("Erro ao redefinir senha");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Recuperação de Senha</h2>

      {step === "email" && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Informe seu e-mail"
          />
          <button onClick={handleEnviarEmail}>Enviar link de recuperação</button>
        </>
      )}

      {step === "senha" && (
        <>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token recebido no e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua nova senha"
          />
          <button onClick={handleRedefinirSenha}>Redefinir Senha</button>
        </>
      )}
    </div>
  );
}

export default RecuperacaoSenha;
