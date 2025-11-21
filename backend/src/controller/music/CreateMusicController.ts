import { Request, Response } from "express";
// import CreateMembroService from "../services/CreateMembroService";
import CreateMusicService from "../../server/music/CreateMusicServer";
class CreateMusicController {
  async handle(req: Request, res: Response) {
    const service = new CreateMusicService();

    try {
      const membro = await service.execute(req.body);
      return res.status(201).json(membro);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default CreateMusicController;
