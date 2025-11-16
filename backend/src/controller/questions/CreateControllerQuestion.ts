import { Request, Response } from "express";
import CreateServiceQuestion from "../../server/questions/CreateServiceQuestion";
class CreateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const { title, description, ativo } = req.body;
      const userId = (req.user as any).id;

      const service = new CreateServiceQuestion();
      const result = await service.execute({ title, description, userId, ativo });

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro ao criar questão." });
    }
  }
}

export default CreateQuestionController;
