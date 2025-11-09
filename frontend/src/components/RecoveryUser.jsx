import { useState } from "react";

function RecoveryUser(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const [load, setLoad] = useState(false)


  function handleSubmit(e) {
    e.preventDefault();
    setLoad(true);

    fetch("http://localhost:1000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Mostra a resposta do backend
        setMessage(
          `Instruções de recuperação de senha enviadas para o email: ${email}`
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
      <h2>Recover User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe o e-mail para recuperação"
        />
        <button type="submit" disabled={load}>
          {load ? "Send..." : "Recovery User"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RecoveryUser