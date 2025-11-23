// src/controllers/DeleteUserController.ts
import { Request, Response } from "express";
import DeleteUserService from "../server/DeleteUserService";

class DeleteUserController {
  async delete(req: Request, res: Response) {
    const { id } = req.params; // <-- pega da URL
    const service = new DeleteUserService();

    try {
      const result = await service.execute(id);
      return res.status(200).json({
        message: "Usuário excluído com sucesso",
        user: result,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default DeleteUserController;
