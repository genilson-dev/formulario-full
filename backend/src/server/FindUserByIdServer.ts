import prisma from '../prisma';
import { UserRequest } from '../interface/UserRequest';

class FindUserByIdService {
  async execute({ id }: UserRequest) {
    if (!id) {
      throw new Error("ID do usuário não fornecido.");
    }

    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}

export default FindUserByIdService;
