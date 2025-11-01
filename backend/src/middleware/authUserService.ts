import {NextFunction, Request,Response} from 'express';
import { verify }from 'jsonwebtoken';
import { Payload } from '../interface/payload';

export function isAuthenticated(req: Request, res:Response, next:NextFunction){
    const authToken = req.headers.authorization;
    if (!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ")
    try {
        // Validar o token
        if(!process.env.JWT_SECRET){
            throw new Error("O jwt não foi definido");            
        }
        const {sub} = verify(token, process.env.JWT_SECRET as string) as Payload;
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro req;
        (req as any).user_id = sub;
    } catch (error) {
        return res.status(401).end();        
    }
    return next();
}

