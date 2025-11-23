// src/middlewares/isAdmin.ts
import { Request, Response, NextFunction } from "express";
import CustomJwtPayload from "../interface/JwtPayLoad";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as CustomJwtPayload | undefined;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado: apenas administradores." });
  }
  next();
}