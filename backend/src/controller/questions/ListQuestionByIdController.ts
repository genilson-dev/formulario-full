import { Request, Response } from "express";
import FindQuestionByIdService from "../../server/questions/ListQuestionByIdServices";

class FindQuestionByIdController {
  async handle(req: Request, res: Response) {
    // Pegue o id de params (mais RESTful) ou do body
    const { id } = req.body; 
    // Se preferir usar body: const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID da questão não fornecido" });
    }

    try {
      const findQuestionService = new FindQuestionByIdService();
      const question = await findQuestionService.execute({ id });

      if (!question) {
        return res.status(404).json({ error: "Questão não encontrada" });
      }

      return res.json(question);
    } catch (error: any) {
      console.error("Erro ao buscar questão:", error);
      return res.status(500).json({ error: error.message || "Erro interno no servidor" });
    }
  }
}

export default FindQuestionByIdController;
