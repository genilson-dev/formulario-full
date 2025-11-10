import prismaDB from "../prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";

export class RecoveryService {
  // Gera token e salva no usuário
  static async generateToken(email: string) {
    if (!email) throw new Error("Email não informado");

    const user = await prismaDB.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const token = crypto.randomUUID();
    const expiry = new Date(Date.now() + 3600000); // expira em 1h

    await prismaDB.user.update({
      where: { email },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    // Aqui você poderia enviar email com o token
    return token;
  }

  // Redefine a senha usando o token
  static async resetPassword(token: string, newPassword: string) {
    if (!token || !newPassword) throw new Error("Token e nova senha são obrigatórios");

    const user = await prismaDB.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }, // token válido
      },
    });

    if (!user) throw new Error("Token inválido ou expirado");

    // 🔐 Criptografa a nova senha antes de salvar
    const SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prismaDB.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        
      },
    });
  }
}
