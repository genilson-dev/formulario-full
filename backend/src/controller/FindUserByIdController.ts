import { Request, Response } from "express";
import FindUserByIdService from "../server/FindUserByIdServer";

class FindUserByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    try {
      const findUserService = new FindUserByIdService();
      const user = await findUserService.execute({ id });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      console.log("Usuário encontrado:", user);
      return res.json(user);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: error.message || "Erro interno no servidor" });
    }
  }
}

export default FindUserByIdController;
