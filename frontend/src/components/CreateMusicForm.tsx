import React, { useState } from "react";
import axios from "axios";
import { Funcao, Status, EstadoCivil, Tonalidade, Instrumento } from "../constants/enums";
import "../styles/CreateMusicForm.css";

const CreateMusicForm: React.FC = () => {
  const initialState = {
    name: "",
    inicioGem: "",
    status: "" as Status,
    funcao: "" as Funcao,
    congregacao: "",
    batizado: false,
    dataBatismo: "",
    estadoCivil: "" as EstadoCivil,
    tonalidade: "" as Tonalidade,
    instrumento: "" as Instrumento,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.currentTarget;
    const checked =
      type === "checkbox" ? (e.currentTarget as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        inicioGem: new Date(formData.inicioGem),
        dataBatismo:
          formData.batizado && formData.dataBatismo
            ? new Date(formData.dataBatismo)
            : null,
      };

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para cadastrar um músico.");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/create/music",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Músico cadastrado com sucesso!");
      console.log(response.data);

      // 🔥 RESET DO FORMULÁRIO
      setFormData(initialState);

    } catch (error: any) {
      console.error(error);
      alert(
        "Erro ao cadastrar músico: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Cadastrar Músico</h2>

      Nome
      <input
        className="form-input"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
      />

      Início GEM
      <input
        className="form-input"
        type="date"
        name="inicioGem"
        value={formData.inicioGem}
        onChange={handleChange}
      />

      Situação atual
      <select
        className="form-select"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="">Selecione o Status</option>
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        name="funcao"
        value={formData.funcao}
        onChange={handleChange}
      >
        <option value="">Selecione a Função</option>
        {Object.values(Funcao).map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <input
        className="form-input"
        name="congregacao"
        placeholder="Congregação"
        value={formData.congregacao}
        onChange={handleChange}
      />

      <label>
        <input
          className="form-checkbox"
          type="checkbox"
          name="batizado"
          checked={formData.batizado}
          onChange={handleChange}
        />
        Batizado
      </label>

      {formData.batizado && (
        <input
          className="form-input"
          type="date"
          name="dataBatismo"
          value={formData.dataBatismo}
          onChange={handleChange}
        />
      )}

      <select
        className="form-select"
        name="instrumento"
        value={formData.instrumento}
        onChange={handleChange}
      >
        <option value="">Selecione o Instrumento</option>
        {Object.values(Instrumento).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        name="tonalidade"
        value={formData.tonalidade}
        onChange={handleChange}
      >
        <option value="">Selecione a Tonalidade</option>
        {Object.values(Tonalidade).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        name="estadoCivil"
        value={formData.estadoCivil}
        onChange={handleChange}
      >
        <option value="">Selecione o Estado Civil</option>
        {Object.values(EstadoCivil).map((ec) => (
          <option key={ec} value={ec}>
            {ec}
          </option>
        ))}
      </select>

      <button type="submit" className="form-button">
        Cadastrar Músico
      </button>
    </form>
  );
};

export default CreateMusicForm;
