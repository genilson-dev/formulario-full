// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Usuarios.css";

// export default function Usuarios() {
//   const [usuarios, setUsuarios] = useState([]);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user);
  

//   // ============================================
//   // CARREGAR TODOS OS USUÁRIOS
//   // ============================================
//   useEffect(() => {
//     if (!token) {
//       console.error("Token não encontrado. Faça login primeiro.");
//       navigate("/login");
//       return;
//     }

//     fetch("http://localhost:1000/user/all", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`Erro ${res.status}: ${text}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const lista =
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.users)
//             ? data.users
//             : [];

//         console.log("Usuários recebidos:", lista);
//         setUsuarios(lista);
//       })
//       .catch((err) => console.error("Erro ao buscar usuários:", err));
//   }, [token, navigate]);

//   // ============================================
//   // EDITAR
//   // ============================================
//   const handleEdit = (id) => navigate(`/users/${id}/editar`);

//   // ============================================
//   // EXCLUIR — usa DELETE /user/id/:id
//   // ============================================
//   const handleDelete = async (id) => {
//     const confirmar = window.confirm(
//       "Tem certeza que deseja excluir este usuário?"
//     );
//     if (!confirmar) return;

//     try {
//       const res = await fetch(`http://localhost:1000/user/id/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Falha ao excluir usuário");

//       setUsuarios((prev) => prev.filter((u) => u.id !== id));

//       alert("Usuário excluído com sucesso ✅");
//     } catch (err) {
//       console.error("Erro ao excluir:", err);
//       alert("Não foi possível excluir. Tente novamente.");
//     }
//   };

//   // ============================================
//   // ATIVAR / INATIVAR
//   // ============================================
//   const handleToggleAtivo = async (id, ativoAtual) => {
//     try {
//       const res = await fetch(
//         `http://localhost:1000/user/inativar/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ ativo: !ativoAtual }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Falha ao atualizar status");

//       setUsuarios((prev) =>
//         prev.map((u) =>
//           u.id === id ? { ...u, ativo: !ativoAtual } : u
//         )
//       );

//       alert(
//         `Usuário ${!ativoAtual ? "ativado" : "inativado"} com sucesso ✅`
//       );
//     } catch (err) {
//       console.error("Erro ao atualizar status:", err);
//       alert("Não foi possível atualizar o status. Tente novamente.");
//     }
//   };

//   // ============================================
//   // RENDER
//   // ============================================
//   return (
//     <div className="usuarios-container">
//       <h2>Lista de Usuários</h2>

//       <table bgcolor="#gray">
//         <thead>
//           <tr>
//             <th>Nome</th>
//             <th>Tipo</th>
//             <th>Email</th>
//             <th>Ativo</th>
//             <th>Criado em</th>
//             <th>Atualizado em</th>
//             <th>Ações</th>
//           </tr>
//         </thead>

//         <tbody>
//           {usuarios.length > 0 ? (
//             usuarios.map((usuario) => {
//               const role =
//                 usuario.role ||
//                 usuario.tipo ||
//                 usuario.papel ||
//                 usuario.userType ||
//                 usuario.perfil;

//               return (
//                 <tr key={usuario.id}>
//                   <td>{usuario.name || usuario.nome}</td>

//                   <td>
//                     {role ? (
//                       <span
//                         className={`role-badge ${String(role).toLowerCase()}`}
//                       >
//                         {role}
//                       </span>
//                     ) : (
//                       "—"
//                     )}
//                   </td>

//                   <td>{usuario.email}</td>
//                   <td>{usuario.ativo ? "Sim" : "Não"}</td>

//                   <td>
//                     {usuario.createdAt
//                       ? new Date(usuario.createdAt).toLocaleString()
//                       : "—"}
//                   </td>

//                   <td>
//                     {usuario.updatedAt
//                       ? new Date(usuario.updatedAt).toLocaleString()
//                       : "—"}
//                   </td>

//                   <td>
//                     <div className="actions">
//                       <button
//                         className="action-button toggle"
//                         onClick={() =>
//                           handleToggleAtivo(usuario.id, usuario.ativo)
//                         }
//                       >
//                         {usuario.ativo ? "Inativar" : "Ativar"}
//                       </button>

//                       <button
//                         className="action-button edit"
//                         onClick={() => handleEdit(usuario.id)}
//                       >
//                         Editar
//                       </button>

//                       <button
//                         className="action-button delete"
//                         onClick={() => handleDelete(usuario.id)}
//                       >
//                         Excluir
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="7" className="no-users">
//                 Nenhum usuário encontrado.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// src/components/Usuarios.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Usuarios.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ============================================
  // CARREGAR TODOS OS USUÁRIOS
  // ============================================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:1000/user/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erro ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data?.users || [];
        setUsuarios(lista);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, [token, navigate]);

  const handleEdit = (id) => navigate(`/users/${id}/editar`);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const res = await fetch(`http://localhost:1000/user/id/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuário excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir.");
    }
  };

  const handleToggleAtivo = async (id, ativoAtual) => {
    try {
      const res = await fetch(
        `http://localhost:1000/user/inativar/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ativo: !ativoAtual }),
        }
      );

      if (!res.ok) throw new Error("Falha ao atualizar");

      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ativo: !ativoAtual } : u))
      );
    } catch {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="usuarios-container">
      <h2 className="usuarios-title">Lista de Usuários</h2>

      <div className="usuarios-card">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Email</th>
              <th>Status</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>

                  <td>
                    <span className={`badge role-${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>

                  <td>{u.email}</td>

                  <td>
                    <span className={`status ${u.ativo ? "on" : "off"}`}>
                      {u.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td>{new Date(u.createdAt).toLocaleString()}</td>
                  <td>{new Date(u.updatedAt).toLocaleString()}</td>

                  <td className="action-buttons">
                    <button
                      className="btn toggle"
                      onClick={() => handleToggleAtivo(u.id, u.ativo)}
                    >
                      {u.ativo ? "Inativar" : "Ativar"}
                    </button>

                    <button
                      className="btn edit"
                      onClick={() => handleEdit(u.id)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn delete"
                      onClick={() => handleDelete(u.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-users">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}