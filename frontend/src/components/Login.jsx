import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginUser.css";
import { API_URL } from "../config/api"; // ← agora funciona corretamente

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Resposta do backend:", data);

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);

        const userData = data.user ?? {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role ?? "USER",
          ativo: data.ativo,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        if (!userData.ativo) {
          setMessage("Usuário desativado.");
          setLoad(false);
          return;
        }

        if (userData.role === "ADMIN") {
          navigate("/users");
        } else {
          navigate("/home", { state: { userName: userData.name } });
        }
      } else {
        setMessage(data.error || "Falha no login.");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      setMessage("Erro ao enviar.");
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
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
          {load ? "Entrando..." : "Login"}
        </button>
      </form>

      <div className="extra-links">
        <p>Esqueceu sua senha?</p>
        <Link to="/recupera-senha">
          <button className="link-button">Recuperar Senha</button>
        </Link>
      </div>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default LoginUser;
