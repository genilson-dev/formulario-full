import { Request, Response } from "express";
import UpdateQuestionService from "../../server/questions/UpdateServiceQuestion";

class UpdateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

    //   const { id } = req.params;
      const { id, title, description, ativo } = req.body;

      const service = new UpdateQuestionService();
      const result = await service.execute({ id, title, description, ativo });

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao atualizar questão." });
    }
  }
}

export default UpdateQuestionController;
