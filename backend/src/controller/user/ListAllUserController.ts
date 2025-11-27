import { Request, Response } from "express";
// import prismaDB from "../prisma";
import { prismaDB } from "../../prisma";
class ListAllUserController {
  async handle(req: Request, res: Response) {
    try {
      const users = await prismaDB.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          ativo: true,
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

export default ListAllUserController;
