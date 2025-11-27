// src/server/GetUserByIdService.ts
import { prismaDB } from "../../prisma";

class GetUserByIdService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID do usuário é obrigatório.");
    }

    const cleanId = id.trim();

    const user = await prismaDB.user.findUnique({
      where: { id: cleanId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error(`Usuário com id ${cleanId} não encontrado.`);
    }

    return user;
  }
}

export default GetUserByIdService;
