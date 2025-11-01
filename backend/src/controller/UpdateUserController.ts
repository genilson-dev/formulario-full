import { Request, Response } from "express";
import UpdateUserServer from "../server/UpdateUserService";

class UpdateUserController{
    async handle(req:Request, res: Response){
        const id = req.body;
        const updateUser = new UpdateUserServer();
        const user = await updateUser.execute(id)
        console.log(user);
        
        return res.json(user)
    }
}
export default UpdateUserController
