// // src/components/EditarUsuario.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../config/api";

// export default function EditarUsuario() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [usuario, setUsuario] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ============================
//   // BUSCAR USUÁRIO POR ID
//   // ============================
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         setLoading(true);

//         const res = await api.get(`/user/id/${id}`);

//         console.log("Resposta da API:", res.data);

//         // Backend retorna um OBJETO
//         setUsuario(res.data);

//       } catch (error) {
//         console.error("❌ Erro ao buscar usuário:", error);
//         setUsuario(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUser();
//   }, [id]);


//   // ============================
//   // SALVAR ALTERAÇÕES
//   // ============================
//   const handleSave = async () => {
//     try {
//       await api.put(`/user/id/${id}`, {
//         name: usuario.name,
//         email: usuario.email,
//         role: usuario.role,
//         ativo: usuario.ativo,
//       });

//       alert("Usuário atualizado com sucesso!");
//       navigate("/users");
//     } catch (err) {
//       console.error("Erro ao atualizar:", err);
//       alert("Erro ao atualizar usuário.");
//     }
//   };

//   // ============================
//   // EXCLUIR USUÁRIO
//   // ============================
//   const handleDelete = async () => {
//     const confirmar = window.confirm("Tem certeza que deseja excluir?");
//     if (!confirmar) return;

//     try {
//       await api.delete(`/user/id/${id}`);

//       alert("Usuário excluído com sucesso!");
//       navigate("/users");
//     } catch (err) {
//       console.error("Erro ao excluir:", err);
//       alert("Erro ao excluir usuário.");
//     }
//   };

//   // ============================
//   // RENDERIZAÇÃO
//   // ============================
//   if (loading) return <p>Carregando usuário...</p>;
//   if (!usuario) return <p>Usuário não encontrado.</p>;

//   return (
//     <div>
//       <h2>Editar Usuário</h2>

//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//         maxWidth: "400px"
//       }}>
        
//         <label>
//           Nome:
//           <input
//             type="text"
//             value={usuario.name}
//             onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             value={usuario.email}
//             onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
//           />
//         </label>

//         <label>
//           Tipo:
//           <select
//             value={usuario.role}
//             onChange={(e) => setUsuario({ ...usuario, role: e.target.value })}
//           >
//             <option value="USER">USER</option>
//             <option value="ADMIN">ADMIN</option>
//             <option value="VISITANTE">VISITANTE</option>
//           </select>
//         </label>

//         <label>
//           Ativo:
//           <input
//             type="checkbox"
//             checked={Boolean(usuario.ativo)}
//             onChange={(e) => setUsuario({ ...usuario, ativo: e.target.checked })}
//           />
//         </label>

//         <button onClick={handleSave}>Salvar</button>

//         <button
//           onClick={handleDelete}
//           style={{ background: "red", color: "white" }}
//         >
//           Excluir Usuário
//         </button>

//         <button onClick={() => navigate("/users")}>Cancelar</button>
//       </div>
//     </div>
//   );
// }

// src/components/EditarUsuario.jsx
// src/components/EditarUsuario.jsx


// src/components/EditarUsuario.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/api";
import "../styles/EditarUsuario.css";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        console.log("[Front] fetchUser -> GET /user/id/" + id);
        const res = await api.get(`/user/id/${id}`);
        console.log("[Front] fetchUser response:", res.status, res.data);
        setUsuario(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleSave = async () => {
    if (!usuario) return;
    if (!id) {
      console.error("[Front] handleSave: id is undefined");
      alert("ID do usuário inválido.");
      return;
    }

    try {
      setSaving(true);
      console.log("[Front] handleSave -> PUT /user/id/" + id, { payload: usuario });
      const res = await api.put(`/user/id/${id}`, {
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
        ativo: usuario.ativo,
      });
      console.log("[Front] handleSave response:", res.status, res.data);
      alert("Usuário atualizado com sucesso!");
      navigate("/users");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      // se for erro do axios, mostrar status/message úteis:
      if (err?.response) {
        console.error("Status:", err.response.status, err.response.data);
        alert("Erro ao atualizar usuário: " + (err.response.data?.error || err.message));
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    if (!id) {
      alert("ID inválido");
      return;
    }

    try {
      console.log("[Front] handleDelete -> DELETE /user/id/" + id);
      const res = await api.delete(`/user/id/${id}`);
      console.log("[Front] handleDelete response:", res.status, res.data);
      alert("Usuário excluído com sucesso!");
      navigate("/users");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      if (err?.response) {
        console.error("Status:", err.response.status, err.response.data);
        alert("Erro ao excluir usuário: " + (err.response.data?.error || err.message));
      } else {
        alert("Erro ao excluir usuário.");
      }
    }
  };

  if (loading) return <p>Carregando usuário...</p>;
  if (!usuario) return <p>Usuário não encontrado.</p>;

  return (
    <div className="editar-container">
      <div className="editar-card">
        <h2 className="editar-title">Editar Usuário</h2>

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={usuario.name}
            onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select
            value={usuario.role}
            onChange={(e) => setUsuario({ ...usuario, role: e.target.value })}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="VISITANTE">VISITANTE</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>Ativo</label>
          <input
            type="checkbox"
            checked={Boolean(usuario.ativo)}
            onChange={(e) => setUsuario({ ...usuario, ativo: e.target.checked })}
          />
        </div>

        <div className="buttons">
          <button type="button" className="btn save" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <button type="button" className="btn delete" onClick={handleDelete}>
            Excluir
          </button>

          <button type="button" className="btn cancel" onClick={() => navigate("/users")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}