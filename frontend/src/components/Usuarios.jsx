import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Usuarios.css"; // CSS separado

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // pega o objeto salvo no localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // busca usuários ao carregar
  useEffect(() => {
    if (!token) {
      console.error("Token não encontrado. Faça login primeiro.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:1000/user/all", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erro ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsuarios(Array.isArray(data) ? data : data.users);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, [token, navigate]);

  // editar
  const handleEdit = (id) => {
    navigate(`/users/${id}/editar`);
  };

  // excluir
  const handleDelete = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    try {
      const res = await fetch("http://localhost:1000/user/delete", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }) // ✅ envia id no body
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Falha ao excluir usuário");
      }

      // remove da lista local
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuário excluído com sucesso ✅");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Não foi possível excluir. Tente novamente.");
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Lista de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name || usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{new Date(usuario.created_at).toLocaleString()}</td>
                <td>{new Date(usuario.updated_at).toLocaleString()}</td>
                <td>
                  <button className="action-button edit" onClick={() => handleEdit(usuario.id)}>Editar</button>
                  <button className="action-button delete" onClick={() => handleDelete(usuario.id)}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-users">Nenhum usuário encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
