// src/server/UpdateUserService.ts
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import { UpdateUserDTO } from "../interface/UpdateRequest";

class UpdateUserService {
  async execute({ id, name, email, password, ativo }: UpdateUserDTO) {
    if (!id) {
      throw new Error("ID do usuário é obrigatório.");
    }

    const data: Partial<{
      name: string;
      email: string;
      password: string;
      ativo: boolean;
    }> = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) {
      const hashSenha = await bcrypt.hash(password, 10);
      data.password = hashSenha;
    }
    if (ativo !== undefined) data.ativo = ativo;

    try {
      const user = await prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error("Usuário não encontrado para atualização.");
    }
  }
}

export default UpdateUserService;
