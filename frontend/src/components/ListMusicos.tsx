import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ListMusicos.css";

interface Musico {
  id: string;
  name: string;
  inicioGem: string;
  status: string;
  funcao: string;
  congregacao: string;
  batizado: boolean;
  dataBatismo?: string | null;
  instrumento: string;
  tonalidade: string;
  estadoCivil: string;
}

const ListMusicos: React.FC = () => {
  const [musicos, setMusicos] = useState<Musico[]>([]);
  const [busca, setBusca] = useState("");
  const [instrumentoFiltro, setInstrumentoFiltro] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMusicos = async () => {
      try {
        const response = await axios.get("http://localhost:1000/music/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMusicos(response.data);
      } catch (error) {
        console.error("Erro ao carregar músicos:", error);
        alert("Não foi possível carregar os músicos.");
      }
    };

    fetchMusicos();
  }, [token]);


  const musicosFiltrados = musicos.filter((m) => {
    const matchNome = m.name.toLowerCase().includes(busca.toLowerCase());
    const matchInstrumento = instrumentoFiltro
      ? m.instrumento === instrumentoFiltro
      : true;

    return matchNome && matchInstrumento;
  });

  return (
    <div className="musicos-container">
      <h2>Lista de Músicos</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          value={instrumentoFiltro}
          onChange={(e) => setInstrumentoFiltro(e.target.value)}
        >
          <option value="">Filtrar por Instrumento</option>
          {Array.from(new Set(musicos.map((m) => m.instrumento))).map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>
      </div>

      <table className="musicos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Instrumento</th>
            <th>Tonalidade</th>
            <th>Status</th>
            <th>Congregação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {musicosFiltrados.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.funcao}</td>
              <td>{m.instrumento}</td>
              <td>{m.tonalidade}</td>

              <td>
                <span className={`status-tag ${m.status.toLowerCase()}`}>
                  {m.status}
                </span>
              </td>

              <td>{m.congregacao}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => alert("Abrir edição para ID: " + m.id)}
                >
                  Editar
                </button>

                <button
                  className="delete-btn"
                  onClick={() => alert("Excluir ID: " + m.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMusicos;
