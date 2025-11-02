import { Request, Response } from "express";
import AuthUserService from "../server/LoginServer";

class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    try {
      const authUserService = new AuthUserService();
      const auth = await authUserService.execute({ email, password });

      return res.status(200).json(auth);
    } catch (error: any) {
      console.error("Erro na autenticação:", error.message);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default AuthUserController;
