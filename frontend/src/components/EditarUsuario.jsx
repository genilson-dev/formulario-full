import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditarUsuario.css";

export default function EditarUsuario() {
  const { id } = useParams(); // pega o id da URL
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // carrega dados do usuário para preencher o formulário
  useEffect(() => {
    fetch(`http://localhost:1000/user/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setNome(data.name || "");
        setEmail(data.email || "");
      })
      .catch(err => console.error("Erro ao carregar usuário:", err));
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:1000/user/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          name: nome,
          email,
          password: senha || undefined // só manda se preencher
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Falha ao atualizar usuário");
      }

      alert("Usuário atualizado com sucesso ✅");
      navigate("/users"); // volta para listagem
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Não foi possível atualizar. Tente novamente.");
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Nova senha (opcional)"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
