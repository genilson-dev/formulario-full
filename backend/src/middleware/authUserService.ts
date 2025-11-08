import {NextFunction, Request,Response} from 'express';
import { verify }from 'jsonwebtoken';
import { Payload } from '../interface/payload';

export function isAuthenticated(req: Request, res:Response, next:NextFunction){
    const authToken = req.headers.authorization;
    console.log("Token recebido:", authToken);
    console.log("SECRET_JWT:", process.env.SECRET_JWT);
    if (!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ")
    try {
        // Validar o token
        if(!process.env.SECRET_JWT){
            throw new Error("O jwt não foi definido");            
        }
        const {sub} = verify(token, process.env.SECRET_JWT as string) as Payload;
        console.log("Ola, eu sou o sub: ", sub);
        
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro req;
        (req as any).id = sub;
    } catch (error) {
        return res.status(401).end();        
    }
    return next();
}

