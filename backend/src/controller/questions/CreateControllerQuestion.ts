import { Request, Response } from "express";
import CreateServiceQuestion from "../../server/questions/CreateServiceQuestion";

class CreateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      // desestrutura todos os campos do body
      const {
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

      const userId = (req.user as any).id;

      const service = new CreateServiceQuestion();
      const result = await service.execute({
        id: req.body.id,
        title: title,
        description: description,
        ativo: ativo,
        userId: userId,
        optionA: optionA,
        optionB: optionB,
        optionC: optionC,
        optionD: optionD,
        optionE: optionE,
        correctOption: correctOption,
      });

      return res.status(201).json(result);
    } catch (err: any) {
      return res
        .status(400)
        .json({ error: err.message || "Erro ao criar questão." });
    }
  }
}

export default CreateQuestionController;
