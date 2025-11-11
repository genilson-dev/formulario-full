import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginUser.css"; // importa o CSS separado

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
      const response = await fetch("http://localhost:1000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        const userName = data.name || data.user?.name || "";

        setMessage("Login realizado com sucesso ✅");

        // 🚀 Redireciona para /home passando o nome
        navigate("/home", { state: { userName } });
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // ✅ evita reload da página

//     try {
//       const res = await fetch("http://localhost:1000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, senha }), // ✅ nome igual ao backend
//       });

//       const data = await res.json();

//       if (data.token) {
//         localStorage.setItem("token", data.token); // salva só o JWT
//         localStorage.setItem("user", JSON.stringify(data)); // salva dados do usuário
//         navigate("/users"); // redireciona para listagem
//       } else {
//         alert("Login falhou: " + (data.error || "Verifique suas credenciais"));
//       }
//     } catch (err) {
//       console.error("Erro no login:", err);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Digite seu email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)} // ✅ atualiza state
//         />
//         <input
//           type="password"
//           placeholder="Digite sua senha"
//           value={senha}
//           onChange={(e) => setSenha(e.target.value)} // ✅ atualiza state
//         />
//         <button type="submit">Entrar</button>
//       </form>
//     </div>
//   );
// }

