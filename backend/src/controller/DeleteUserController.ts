import { Request, Response } from "express";
import DeleteUserService from "../server/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    try {
      if (!id) {
        return res.status(400).json({ error: "ID do usuário não fornecido." });
      }

      const deleteUserService = new DeleteUserService();
      const deletedUser = await deleteUserService.execute({ id });

      console.log("Usuário deletado:", deletedUser);

      return res.status(200).json(deletedUser);
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error.message);
      return res.status(404).json({ error: error.message });
    }
  }
}

export default DeleteUserController;
