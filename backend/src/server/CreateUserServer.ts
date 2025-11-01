import prismaClient from "../prisma";
import { UserRequest } from "../interface/UserRequest";

import { hash } from "bcryptjs";

class CreateUserService{
    async execute({name, email, password}: UserRequest){
                if(!email){
            throw new Error(`O e-mail informa esta incorreto ${email}`)
        }
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: { email: email},
        })
        if(userAlreadyExists){
            throw new Error("O usuario já cadastrado!")
        }
        const passHash = await hash(password, 8)
        const newUser = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passHash
            },
            select:{
                id: true,
                name: true,
                email: true,
                password: true
            }
        })
        return newUser;
    
    }
}

export default CreateUserService;
