import { Request, Response } from "express";

import ListQuestionByCategoryService from "../../server/questions/ListQuestionByCategoryService";

class ListQuestionsByCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const { category, page, perPage } = req.body;

      const service = new ListQuestionByCategoryService();
      const result = await service.execute(
        category,
        page || 1,
        perPage || 5
      );

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default ListQuestionsByCategoryController;
