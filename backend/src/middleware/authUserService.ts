// import {NextFunction, Request,Response} from 'express';
// import { verify }from 'jsonwebtoken';
// import { Payload } from '../interface/payload';

// export function isAuthenticated(req: Request, res:Response, next:NextFunction){
//     const authToken = req.headers.authorization;
//     console.log("Token recebido:", authToken);
//     console.log("SECRET_JWT:", process.env.SECRET_JWT);
//     if (!authToken){
//         return res.status(401).end();
//     }
//     const [, token] = authToken.split(" ")
//     try {
//         // Validar o token
//         if(!process.env.SECRET_JWT){
//             throw new Error("O jwt não foi definido");            
//         }
//         const {sub} = verify(token, process.env.SECRET_JWT as string) as Payload;
//         console.log("Ola, eu sou o sub: ", sub);
        
//         // Recuperar o id do token e colocar dentro de uma variavel user_id dentro req;
//         (req as any).id = sub;
//     } catch (error) {
//         return res.status(401).end();        
//     }
//     return next();
// }


// import { Request, Response } from "express";
// import { sign } from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import prisma from "../prisma"; // ajuste conforme seu setup

// class AuthUserController {
//   async handle(req: Request, res: Response) {
//     const { email, senha } = req.body;

//     try {
//       // 1. Buscar usuário no banco
//       const user = await prisma.user.findUnique({ where: { email } });
//       if (!user) {
//         return res.status(401).json({ error: "Usuário não encontrado" });
//       }

//       // 2. Validar senha
//       const senhaValida = await bcrypt.compare(senha, user.password);
//       if (!senhaValida) {
//         return res.status(401).json({ error: "Senha inválida" });
//       }

//       // 3. Gerar token JWT
//       const token = sign(
//         { email: user.email },
//         process.env.SECRET_JWT as string,
//         {
//           subject: user.id,
//           expiresIn: "1d",
//         }
//       );

//       // 4. Retornar token + dados básicos do usuário
//       return res.json({
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (error: any) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }

// export default AuthUserController;


import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const decoded = verify(token, process.env.SECRET_JWT as string);

    // agora o TS sabe que req.user existe
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
}
