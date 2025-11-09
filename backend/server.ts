// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import router from "./src/routes/router";

// // Carrega variáveis do .env
// dotenv.config();
// console.log("JWT Secret:", process.env.SECRET_JWT);
// const app = express();

// // app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000", // frontend React
//   methods: ["GET", "POST"],        // métodos permitidos
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// // Registrando as rotas
// app.use(router);

// // Middleware de erro opcional (para capturar erros não tratados)
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   console.error("Erro interno:", err.message);
//   _next()
//   return res.status(500).json({ error: "Erro interno no servidor." });
// });

// const port = process.env.PORT || 1000;


// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/router";
import  prismaDB from "./src/prisma/index"; // conexão centralizada com Prisma

// Carrega variáveis do .env
dotenv.config();

const app = express();

// Configuração de CORS (permitindo o frontend React)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Rotas principais
app.use(router);

// Middleware de erro global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Erro interno:", err.message);
  return res.status(500).json({ error: "Erro interno no servidor." });
});

// Porta configurada no .env ou padrão 1000
const port = process.env.PORT || 1000;

// Inicializa servidor e garante conexão com banco
async function startServer() {
  try {
    await prismaDB.$connect();
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
    process.exit(1);
  }
}

startServer();
