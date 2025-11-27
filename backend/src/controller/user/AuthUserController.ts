import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {prismaDB} from "../../prisma";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
      // 1. Buscar usuário
      const user = await prismaDB.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      // 2. Comparar senha com hash do banco
      const senhaValida = await bcrypt.compare(senha, user.password);
      if (!senhaValida) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      // 3. Gerar token JWT
      const token = sign(
        { email: user.email, name: user.name, role: user.role },
        process.env.SECRET_JWT as string,
        {
          subject: user.id,
          expiresIn: "190d",
        }
      );

      // 4. Retornar token + dados
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default AuthUserController;
