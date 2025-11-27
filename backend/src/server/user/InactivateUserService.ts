// import prismaClient from "../../prisma";
import { prismaDB } from "../../prisma";
interface InactivateUserRequest {
  id: string;
  ativo: boolean; // true ou false
}

class InactivateUserService {
  async execute({ id, ativo }: InactivateUserRequest) {
    const user = await prismaDB.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const updatedUser = await prismaDB.user.update({
      where: { id },
      data: { ativo },
    });

    return updatedUser;
  }
}

export { InactivateUserService };
