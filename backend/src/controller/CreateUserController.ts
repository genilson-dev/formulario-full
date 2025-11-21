
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {prismaDB} from "../prisma";

class CreateUserController {
  async handleCreateUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    try {
      // Verifica se já existe usuário com esse email
      const userExists = await prismaDB.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criptografa a senha antes de salvar
      const hashSenha = await bcrypt.hash(password, 10);

      const user = await prismaDB.user.create({
        data: {
          name,
          email,
          password: hashSenha,
        },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        ativo: user.ativo
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export { CreateUserController };
