import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/router";

// Carrega variáveis do .env
dotenv.config();
console.log("JWT Secret:", process.env.SECRET_JWT);
const app = express();

app.use(cors());
app.use(express.json());

// Registrando as rotas
app.use(router);

// Middleware de erro opcional (para capturar erros não tratados)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro interno:", err.message);
  return res.status(500).json({ error: "Erro interno no servidor." });
});

const port = process.env.PORT || 1000;


app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
