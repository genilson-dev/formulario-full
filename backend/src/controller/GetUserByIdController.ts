// src/controllers/GetUserByIdController.ts
import { Request, Response } from "express";
// import GetUserByIdService from "../server/GetUserByIdService";
import GetUserByIdService from "../server/GetUserByIdService";
class GetUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório." });
      }

      const getUserById = new GetUserByIdService();
      const user = await getUserById.execute(id);

      return res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error.message);

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro inesperado ao buscar usuário." });
    }
  }
}

export default GetUserByIdController;
