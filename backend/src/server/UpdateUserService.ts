// src/server/UpdateUserService.ts
import prisma from "../prisma";
import bcrypt from "bcryptjs";

interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  ativo?: boolean;
}

class UpdateUserService {
  async execute({ id, name, email, password, ativo }: UpdateUserDTO) {
    const data: any = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) {
      const hashSenha = await bcrypt.hash(password, 10);
      data.password = hashSenha;
    }
    if (ativo !== undefined) data.ativo = ativo;

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }
}

export default UpdateUserService;
