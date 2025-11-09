import { useState } from "react";

function Formulario() {
  // Estados para controlar os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await fetch("http://localhost:1000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log(data);
      setMessage(`Cadastro realizado com sucesso para: ${name}`);
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setMessage("Erro ao cadastrar: tente novamente.");
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Novo Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Informe seu nome"
          required
        />
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
          {load ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
export default Formulario