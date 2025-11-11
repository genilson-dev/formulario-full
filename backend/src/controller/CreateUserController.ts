// import { Request, Response } from 'express';
// import CreateUserService from '../server/CreateUserServer';

// class CreateUserController {
//   async handleCreateUser(req: Request, res: Response): Promise<Response> {
//     const { name, email, password } = req.body;

//     try {
//       if (!name || !email || !password) {
//         return res.status(400).json({ error: "Todos os campos são obrigatórios: nome, email e senha." });
//       }

//       const createUserService = new CreateUserService();
//       const newUser = await createUserService.execute({ name, email, password });

//       return res.status(201).json(newUser);
//     } catch (error: any) {
//       console.error("Erro ao criar usuário:", error.message);
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }

// export { CreateUserController };

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma";

class CreateUserController {
  async handleCreateUser(req: Request, res: Response) {
    const { name, email, senha } = req.body;

    if (!name || !email || !senha) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    try {
      // Verifica se já existe usuário com esse email
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Criptografa a senha antes de salvar
      const hashSenha = await bcrypt.hash(senha, 10);

      const user = await prisma.user.create({
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
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export { CreateUserController };
