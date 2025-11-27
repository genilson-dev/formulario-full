import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/api";
// import "./EditMusico.css";
import "../styles/EditarMusico.css";


export default function EditMusico() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    ativo: true,
    inicioGem: "",
    status: "",
    funcao: "",
    congregacao: "",
    batizado: false,
    dataBatismo: "",
    instrumento: "",
    tonalidade: "",
    estadoCivil: "",
  });

  // 🔥 Buscar músico ao carregar a página
  useEffect(() => {
    async function loadMusico() {
      try {
        const response = await api.get(`/music/${id}`);
        const data = response.data;

        setForm({
          name: data.name || "",
          ativo: data.ativo ?? true,
          inicioGem: data.inicioGem ? data.inicioGem.substring(0, 10) : "",
          status: data.status || "",
          funcao: data.funcao || "",
          congregacao: data.congregacao || "",
          batizado: data.batizado ?? false,
          dataBatismo: data.dataBatismo ? data.dataBatismo.substring(0, 10) : "",
          instrumento: data.instrumento || "",
          tonalidade: data.tonalidade || "",
          estadoCivil: data.estadoCivil || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar músico:", error);
        alert("Erro ao carregar músico.");
        navigate("/musicos");
      }
    }

    loadMusico();
  }, [id, navigate]);

  // 🔥 Atualizar campos do formulário
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🔥 Enviar atualização para o backend
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post("/music/update", {
        id,
        ...form,
      });

      alert("Músico atualizado com sucesso!");
      navigate("/musicos");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar músico.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="loading">Carregando dados...</p>;

  return (
    <div className="edit-container">
      <h1>Editar Músico</h1>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Congregação:</label>
        <input
          type="text"
          name="congregacao"
          value={form.congregacao}
          onChange={handleChange}
        />

        <label>Função:</label>
        <select name="funcao" value={form.funcao} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="MUSICO">Músico</option>
          <option value="CANTOR">Cantor</option>
          <option value="DIRIGENTE">Dirigente</option>
        </select>

        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="REUNIOES_JOVENS">Reuniões de Jovens</option>
          <option value="OFICIAL">Oficial</option>
          <option value="AFASTADO">Afastado</option>
        </select>

        <label>Instrumento:</label>
        <input
          type="text"
          name="instrumento"
          value={form.instrumento}
          onChange={handleChange}
        />

        <label>Tonalidade:</label>
        <input
          type="text"
          name="tonalidade"
          value={form.tonalidade}
          onChange={handleChange}
        />

        <label>Estado Civil:</label>
        <input
          type="text"
          name="estadoCivil"
          value={form.estadoCivil}
          onChange={handleChange}
        />

        <label>Início GEM:</label>
        <input
          type="date"
          name="inicioGem"
          value={form.inicioGem}
          onChange={handleChange}
        />

        <label>Batizado:</label>
        <select name="batizado" value={form.batizado} onChange={handleChange}>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </select>

        <label>Data do Batismo:</label>
        <input
          type="date"
          name="dataBatismo"
          value={form.dataBatismo}
          onChange={handleChange}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
