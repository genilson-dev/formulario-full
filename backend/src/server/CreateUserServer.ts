import prismaClient from "../prisma";
import { UserRequest } from "../interface/UserRequest";
import { hash } from "bcryptjs";

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email || !email.includes("@")) {
      throw new Error(`E-mail inválido: ${email}`);
    }

    if (!name || !password) {
      throw new Error("Nome e senha são obrigatórios.");
    }

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return newUser;
  }
}

export default CreateUserService;
