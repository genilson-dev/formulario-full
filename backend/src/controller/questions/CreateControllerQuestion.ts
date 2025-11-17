import { Request, Response } from "express";
import CreateQuestionService from "../../server/questions/CreateServiceQuestion";

class CreateQuestionsController {
  async handleCreate(req: Request, res: Response) {
    const service = new CreateQuestionService();

    try {
      // O body pode ser um objeto (uma questão) ou um array (várias questões)
      const result = await service.execute(req.body);

      return res.status(201).json(result);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export default CreateQuestionsController;
