import {Response, Request} from 'express';
import CreateUserService from '../server/CreateUserServer';

class CreateUserController{
    async handleCreateUser(req: Request, res: Response){
        const { name, email, password } = req.body;
        const createUserService = new CreateUserService();

        const newUser = await createUserService.execute({
            name, email, password
        })
        return res.json(newUser)
    }
}

export {CreateUserController}
