import React, { useState } from "react";
import axios from "axios";
import { Funcao, Status, EstadoCivil, Tonalidade, Instrumento } from "../constants/enums";
import "../styles/CreateMusicForm.css";

const CreateMusicForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    inicioGem: "",
    status: "" as Status,
    funcao: "" as Funcao,
    congregacao: "",
    batizado: false,
    dataBatismo: "",
    instrumento: "",
    tonalidade: "",
    estadoCivil: "" as EstadoCivil,
    Tonalidade: "" as Tonalidade,
    Instrumento: "" as Instrumento
  });

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

      // ✅ Recupera o token de dentro do objeto "user"
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;

      if (!token) {
        alert("Você precisa estar logado para cadastrar um músico.");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/create/music",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // envia token JWT
            "Content-Type": "application/json",
          },
        }
      );

      alert("Músico cadastrado com sucesso!");
      console.log(response.data);
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
nome
  <input
    className="form-input"
    name="name"
    placeholder="Nome"
    value={formData.name}
    onChange={handleChange}
  />
inicio GEM
  <input
    className="form-input"
    type="date"
    name="inicioGem"
    placeholder="Inicio do G.E.M"
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
      <option key={s} value={s}>{s}</option>
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
      <option key={f} value={f}>{f}</option>
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
    name="Instrumento"
    value={formData.Instrumento}
    onChange={handleChange}
  >
    <option value="instrumento">Selecione o Instrumento</option>
    {Object.values(Instrumento).map((ec) => (
      <option key={ec} value={ec}>{ec}</option>
    ))}
  </select>



  <select
    className="form-select"
    name="Tonalidade"
    value={formData.Tonalidade}
    onChange={handleChange}
  >
    <option value="">Selecione A tonalidade</option>
    {Object.values(Tonalidade).map((ec) => (
      <option key={ec} value={ec}>{ec}</option>
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
      <option key={ec} value={ec}>{ec}</option>
    ))}
  </select>

  <button type="submit" className="form-button">Cadastrar Músico</button>
</form>
  );
};

export default CreateMusicForm;
