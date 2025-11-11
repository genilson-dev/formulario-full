import { Request, Response } from "express";
// import prismaDB from "../prisma";
import prismaDB from "../prisma";
class ListAllUserController {
  async handle(req: Request, res: Response) {
    try {
      const users = await prismaDB.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });

      return res.json(users); // ✅ retorna array direto
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default ListAllUserController;
