import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate(); // Hook para redirecionar

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await fetch("http://localhost:1000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // 🔑 Persistência no localStorage
        localStorage.setItem("user", JSON.stringify(data));

        setMessage("Login realizado com sucesso ✅");

        // 🚀 Redireciona para /home
        navigate("/home");
      } else {
        setMessage(data.error || "Falha no login ❌");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      setMessage("Erro ao enviar: tente novamente.");
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe seu e-mail"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Informe sua senha"
          required
        />
        <button type="submit" disabled={load}>
          {load ? "Entrando..." : "Login"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginUser