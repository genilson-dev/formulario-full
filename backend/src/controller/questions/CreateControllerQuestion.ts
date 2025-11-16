import { Request, Response } from "express";
import CreateServiceQuestion from "../../server/questions/CreateServiceQuestion";

class CreateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const userId = (req.user as any).id;
      const service = new CreateServiceQuestion();

      let result;

      if (Array.isArray(req.body)) {
        // várias questões
        const questions = req.body.map((q: any) => ({
          id: q.id,
          title: q.title,
          description: q.description,
          ativo: q.ativo,
          userId: userId,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          optionE: q.optionE,
          correctOption: q.correctOption,
        }));

        result = await service.execute(questions);
      } else {
        // uma questão
        const {
          id,
          title,
          description,
          ativo,
          optionA,
          optionB,
          optionC,
          optionD,
          optionE,
          correctOption,
        } = req.body;

        result = await service.execute({
          id,
          title,
          description,
          ativo,
          userId,
          optionA,
          optionB,
          optionC,
          optionD,
          optionE,
          correctOption,
        });
      }

      return res.status(201).json(result);
    } catch (err: any) {
      return res
        .status(400)
        .json({ error: err.message || "Erro ao criar questão." });
    }
  }
}

export default CreateQuestionController;
