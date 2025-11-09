import { Request, Response } from "express";
import { RecoveryService } from "../server/recoveryServer";

export class RecoveryController {
  // Solicita recuperação (gera token)
  static async requestRecovery(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "O campo 'email' é obrigatório" });
    }

    try {
      const token = await RecoveryService.generateToken(email);
      return res.json({ message: "Instruções enviadas para o email.", token });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Redefine senha com token
  static async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token e nova senha são obrigatórios" });
    }

    try {
      await RecoveryService.resetPassword(token, newPassword);
      return res.json({ message: "Senha redefinida com sucesso!" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
