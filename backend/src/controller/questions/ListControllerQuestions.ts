import { Request, Response } from "express";
import ListServiceQuestions from "../../server/questions/ListServiceQuestions";

class ListQuestionsController {
  async handle(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 5;
      const category = req.query.category as string; // ex: "Matemática"

      const service = new ListServiceQuestions();
      const result = await service.execute(category, page, perPage);

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default ListQuestionsController;
