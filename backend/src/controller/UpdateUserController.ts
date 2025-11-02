import { Request, Response } from "express";
import UpdateUserService from "../server/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, email, password } = req.body;

      if (!id || !name || !email) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
      }

      const updateUser = new UpdateUserService();
      const user = await updateUser.execute({ id, name, email, password });

      return res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default UpdateUserController;
