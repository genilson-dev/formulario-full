import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./src/routes/router";

const app = express();

app.use(cors());
app.use(express.json());

// Registrando as rotas
app.use(router);

const port = 1000;
const error = "Internal Server Error";

app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
})
