// import { Request, Response } from "express";
// import AuthUserService from "../server/LoginServer";

// class AuthUserController {
//   async handle(req: Request, res: Response): Promise<Response> {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email e senha são obrigatórios." });
//     }

//     try {
//       const authUserService = new AuthUserService();
//       const auth = await authUserService.execute({ email, password });

//       return res.status(200).json(auth);
//     } catch (error: any) {
//       console.error("Erro na autenticação:", error.message);
//       return res.status(401).json({ error: error.message });
//     }
//   }
// }

// export default AuthUserController;

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prismaDB} from "../prisma";

class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      // busca usuário pelo email
      const user = await prismaDB.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      // 🚨 verifica se está ativo
      if (!user.ativo) {
        return res.status(403).json({ error: "Usuário inativo. Contate o administrador." });
      }

      // compara senha
      const senhaValida = await bcrypt.compare(password, user.password);
      if (!senhaValida) {
        return res.status(400).json({ error: "Senha inválida" });
      }

      // gera token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "segredo",
        { expiresIn: "7d" } // ✅ token válido por 7 dias
      );

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        ativo: user.ativo,
        token,
      });
    } catch (err: any) {
      console.error("Erro no login:", err.message);
      return res.status(500).json({ error: "Erro interno no login" });
    }
  }

}

export default LoginController;

