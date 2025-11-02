import { AutRequest } from "../interface/AutRequest";
import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthUserService {
  async execute({ email, password }: AutRequest) {
    // Verifica se o e-mail existe
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("E-mail ou senha não conferem.");
    }

    // Verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("E-mail ou senha não conferem.");
    }

    // Gera o token JWT
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_JWT as string,
      {
        subject: user.id,
        expiresIn: "120d",
      }
    );

    // Retorna os dados do usuário e o token
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export default AuthUserService;
