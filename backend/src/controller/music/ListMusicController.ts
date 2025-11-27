import { Request, Response } from "express";
// import ListAllMusicosServicer from "../../services/musicas/ListAllMusicosService";
import ListAllMusicosServicer from "../../server/music/ListMusicServer";
export default class ListAllMusicosController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListAllMusicosServicer();
      const result = await service.execute();
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao listar músicos" });
    }
  }
}
