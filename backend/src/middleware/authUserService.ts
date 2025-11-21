
import { Request, Response, NextFunction } from "express";
import { Jwt, verify } from "jsonwebtoken";

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
    const decoded = verify(token, process.env.JWT_SECRET || "segredo");
    console.log(decoded);
    

    // agora o TS sabe que req.user existe
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token expirado ou inválido" });
  }
}
