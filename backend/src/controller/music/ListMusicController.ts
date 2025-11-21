import { Request, Response } from "express";
import { prismaDB } from "../../prisma";


class ListAllMusicController {
  async handle(req: Request, res: Response) {
    try {
      const music = await prismaDB.musica.findMany({   
        // where: {
        //     ativo: true
        // },
        select: {
          id: true,
          name: true,
          inicioGem: true, // ⚠️ revisar se o nome está correto no schema
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
          createdAt: "desc",
        },
      });

      return res.json({ data: music }); // ✅ mais flexível para evoluções
    } catch (err: any) {
      console.error("Erro ao listar músicas:", err.message);
      return res.status(500).json({ error: "Erro interno ao listar músicas" });
    }
  }
}

export default ListAllMusicController;

