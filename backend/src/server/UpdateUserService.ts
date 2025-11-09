import prismaDB from "../prisma";
import { UserRequest } from "../interface/UserRequest";
import { hash } from "bcryptjs";

class UpdateUserService {
  async execute({ id, name, email, password }: UserRequest) {
    if (!id) {
      throw new Error("ID do usuário não fornecido.");
    }

    const userExists = await prismaDB.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    const updatedData: any = {
      name,
      email,
    };

    if (password) {
      updatedData.password = await hash(password, 10);
    }

    const updatedUser = await prismaDB.user.update({
      where: { id },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedUser;
  }
}

export default UpdateUserService;
