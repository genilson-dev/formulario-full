// src/config/api.js
import axios from "axios";

export const API_URL = "http://localhost:1000";

const api = axios.create({
  baseURL: API_URL,
});

// Intercepta e adiciona token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("🔐 Token adicionado ao header:", token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Loga erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Erro de resposta da API:", error);
    return Promise.reject(error);
  }
);

export default api;
