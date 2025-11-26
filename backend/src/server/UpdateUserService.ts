import { prismaDB } from "../prisma";
import bcrypt from "bcryptjs";
import { UpdateUserDTO } from "../interface/UpdateRequest";
import { Role } from "@prisma/client";

class UpdateUserService {
  async execute({ id, name, email, password, ativo, role }: UpdateUserDTO) {
    if (!id) {
      throw new Error("ID do usuário é obrigatório.");
    }

    const cleanId = id.trim();

    // Verifica se usuário existe
    const userExists = await prismaDB.user.findUnique({ where: { id: cleanId } });
    if (!userExists) {
      throw new Error(`Usuário com id ${cleanId} não encontrado.`);
    }

    const data: Partial<{
      name: string;
      email: string;
      password: string;
      ativo: boolean;
      role: Role;
    }> = {};

    if (name) data.name = name;

    if (email) {
      // valida email único
      const emailExists = await prismaDB.user.findUnique({ where: { email } });
      if (emailExists && emailExists.id !== cleanId) {
        throw new Error("Email já está em uso por outro usuário.");
      }
      data.email = email;
    }

    if (password) {
      const hashSenha = await bcrypt.hash(password, 10);
      data.password = hashSenha;
    }

    if (ativo !== undefined) data.ativo = ativo;
    if (role) data.role = role;

    if (Object.keys(data).length === 0) {
      throw new Error("Nenhum campo para atualizar.");
    }

    console.log("UserExists:", userExists);
    console.log("Data enviado para update:", data);
    console.log("ID usado no update:", cleanId);

    try {
      const user = await prismaDB.user.update({
        where: { id: cleanId },
        data,
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

      return user;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error("Usuário não encontrado ou atualização inválida (possível conflito de email único).");
      }
      throw new Error("Erro inesperado ao atualizar usuário.");
    }
  }
}

export default UpdateUserService;
