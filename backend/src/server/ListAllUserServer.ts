import prismaClient from "../prisma";

export default class ListAllUserServicer{
    async execute(){
        const user = await prismaClient.user.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        })
        return user;
    }
}
