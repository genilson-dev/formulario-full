import prismaClient from "../prisma";
import { UserRequest } from "../interface/UserRequest";

class DeleteUserService {
  async execute({ id }: UserRequest) {
    if (!id) {
      throw new Error("ID do usuário não fornecido.");
    }

    const userExists = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    const deletedUser = await prismaClient.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return deletedUser;
  }
}

export default DeleteUserService;
