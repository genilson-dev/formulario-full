import { Request, Response } from "express";
import ListServiceQuestions from "../../server/questions/ListServiceQuestions";
class ListQuestionsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }


      const service = new ListServiceQuestions();
      const result = await service.execute(id);

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao listar questões." });
    }
  }
}

export default ListQuestionsController;
