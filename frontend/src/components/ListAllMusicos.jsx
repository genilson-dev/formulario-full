import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api";
import "../styles/ListAllMusicos.css";

export default function ListAllMusicos() {
  const [musicos, setMusicos] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get("/music/all");
        setMusicos(response.data);
      } catch (error) {
        console.error("Erro ao carregar músicos:", error);
      }
    }
    load();
  }, []);

  return (
    <div className="musicos-container">
      <h1 className="musicos-title">Lista de Músicos</h1>

      {musicos.length === 0 ? (
        <p className="empty-message">Nenhum músico encontrado.</p>
      ) : (
        <div className="musicos-grid">
          {musicos.map((m) => (
            <div key={m.id} className="musico-card">
              <p className="musico-name">{m.name}</p>
              <p className="musico-info">
                <strong>Instrumento:</strong> {m.instrumento}
              </p>
              <p className="musico-info">
                <strong>Status:</strong> {m.status}
              </p>

              <div className="card-actions">
                <Link to={`/musicos/${m.id}/editar`} className="edit-btn">
                  ✏️ Editar
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
