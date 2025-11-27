import { prismaDB } from "../../prisma/index";
import { UserRequest } from "../../interface/UserRequest";
import { hash } from "bcryptjs";
import { Role } from "@prisma/client"; // importa o enum

class CreateUserService {
  async execute({ name, email, password, ativo, role }: UserRequest) {
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

    // Converte string recebida para enum Role
    let roleEnum: Role;
    switch (role) {
      case "ADMIN":
        roleEnum = Role.ADMIN;
        break;
      case "VISITANTE":
        roleEnum = Role.VISITANTE;
        break;
      default:
        roleEnum = Role.USER; // valor padrão
    }

    const newUser = await prismaDB.user.create({
      data: {
        name,
        email,
        role: roleEnum, // ✅ agora é enum
        password: hashedPassword,
        ativo: ativo !== undefined ? ativo : true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newUser;
  }
}

export default CreateUserService;
