import { Request, Response } from "express";
import DeleteUserService from "../server/DeleteUserService";

class DeleteUserController{
    async handle(req: Request, res: Response){
        const id = req.body;
        const userDel = new DeleteUserService();
        const user = await userDel.execute(id)
        console.log("Eu sou o usuario que foi deletado: ", id);
        
        return res.json(user)
    }
}
export default DeleteUserController

