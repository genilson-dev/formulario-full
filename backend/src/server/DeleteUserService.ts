// src/server/DeleteUserService.ts
import {prismaDB} from "../prisma";

class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID do usuário é obrigatório.");
    }

    // Primeiro, apagar todas as questões relacionadas ao usuário
    await prismaDB.question.deleteMany({
      where: { userId: id },
    });

    // Agora pode apagar o usuário
    try {
      const deletedUser = await prismaDB.user.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return deletedUser;
    } catch (error: any) {
      throw new Error("Usuário não encontrado ou já excluído.");
    }
  }
}

export default DeleteUserService;
