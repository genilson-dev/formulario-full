import { Request, Response } from "express";
// import prismaDB from "../prisma";
import {prismaDB} from "../../prisma";
class ListAllMusicController {
  async handle(req: Request, res: Response) {
    try {
      const users = await prismaDB.musica.findMany({
        select: {
          id: true,
          name: true,
          inicioGem: true,
          status: true,
          funcao: true,
          congregacao: true,
          batizado: true,
          dataBatismo: true,
          instrumento: true,
          tonalidade: true,
          estadoCivil: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      return res.json(users); // ✅ retorna array direto
    } catch (err: any) {
      console.error("Erro ao listar usuários:", err.message);
      return res.status(500).json({ error: "Erro interno ao listar usuários" });
    }
  }
}

export default ListAllMusicController;
