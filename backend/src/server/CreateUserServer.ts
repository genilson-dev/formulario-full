import {prismaDB} from "../prisma/index";
import { UserRequest } from "../interface/UserRequest";
import { hash } from "bcryptjs";

class CreateUserService {
  async execute({ name, email, password, ativo }: UserRequest) {
    if (!email || !email.includes("@")) {
      throw new Error(`E-mail inválido: ${email}`);
    }

    if (!name || !password) {
      throw new Error("Nome e senha são obrigatórios.");
    }

    const userAlreadyExists = await prismaDB.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado.");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prismaDB.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        ativo: ativo !== undefined ? ativo : true, // ✅ usa o valor recebido ou true por padrão
      },
      select: {
        id: true,
        name: true,
        email: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newUser;
  }
}

export default CreateUserService;
