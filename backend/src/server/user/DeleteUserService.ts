// src/server/DeleteUserService.ts
import { prismaDB } from "../../prisma";

class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    // Verifica se o usuário existe
    const userExists = await prismaDB.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new Error(`Usuário com id ${id} não encontrado para exclusão.`);
    }

    // Deleta e retorna apenas dados não sensíveis
    const deletedUser = await prismaDB.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        ativo: true,
      },
    });

    return deletedUser;
  }
}

export default DeleteUserService;



