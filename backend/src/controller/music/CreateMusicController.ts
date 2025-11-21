// src/controller/MusicaController.ts

import { Request, Response } from "express";
// import CreateMusicaService from "../server/musica/CreateMusicaService";
import CreateMusicaService from "../../server/music/CreateMusicServer";
class MusicaController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const musicaService = new CreateMusicaService();
      const result = await musicaService.execute(data);

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar música"
      });
    }
  }
}

export default MusicaController;
