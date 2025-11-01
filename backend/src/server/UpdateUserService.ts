import prismaClient from "../prisma";
import { UserRequest } from "../interface/UserRequest";
import { hash } from "bcryptjs";
class UpdateUserServer {
  async execute({ id, name, email, password }: UserRequest) {
    if (!id) {
      throw new Error("ID do usuário não fornecido");
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }
    const passHash = await hash(password, 10)

    const user = await prismaClient.user.update({
      where: { id },
      data: {
        name,
        email,
        password: passHash, // Incluído caso você queira atualizar a senha também
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export default UpdateUserServer;
