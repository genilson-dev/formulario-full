import { Request, Response } from "express";
import SearchMusicByNameService from "../../server/music/ListMusicByNameServer";
export default class SearchMusicByNameController {
  async handle(req: Request, res: Response) {
    const { name } = req.body; // pega o parâmetro da URL

    const service = new SearchMusicByNameService();
    const result = await service.execute({ name });

    return res.json(result);
  }
}
