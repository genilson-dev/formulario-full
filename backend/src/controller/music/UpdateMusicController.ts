// src/controllers/UpdateMusicController.ts
import { Request, Response } from "express";
// import UpdateMusicService from "../server/UpdateUserService";
import UpdateMusicService from "../../server/music/UpdateMusicServer";
class UpdateMusicController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      name,
      ativo,
      inicioGem,
      status,
      funcao,
      congregacao,
      batizado,
      dataBatismo,
      instrumento,
      tonalidade,
      estadoCivil,
    } = req.body;

    const updateMusicService = new UpdateMusicService();

    try {
      const user = await updateMusicService.execute({
        id,
        name,
        ativo,
        inicioGem,
        status,
        funcao,
        congregacao,
        batizado,
        dataBatismo,
        instrumento,
        tonalidade,
        estadoCivil,
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default UpdateMusicController;
