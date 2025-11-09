import prismaDB from '../prisma/index';
import { UserRequest } from '../interface/UserRequest';

class FindUserByIdService {
  async execute({ id }: UserRequest) {
    if (!id) {
      throw new Error("ID do usuário não fornecido.");
    }

    const user = await prismaDB.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });


    if (id.length === 0) {
      throw new Error("No User found for this db");
    }

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    console.log("eu sou o aquivo server ", user);


    return user;
  }
}

export default FindUserByIdService;
