import { Request, Response } from "express";
import DeleteQuestionService from "../../server/questions/DeleteServiceQuestion";

class DeleteQuestionController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

    //   const { id } = req.params;
      const { id } = req.body;

      const service = new DeleteQuestionService();
      const result = await service.execute(id);

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao excluir questão." });
    }
  }
}

export default DeleteQuestionController;
