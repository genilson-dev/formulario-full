import prismaClient from "../prisma";
import { UserRequest } from "../interface/UserRequest";

class DeleteUserService{
    async execute({id}: UserRequest){
            if (!id) {
      throw new Error("ID do usuário não fornecido ou não existe!");
    }
        const userDel = await prismaClient.user.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
      },
        })
            if (!userDel) {
      throw new Error("Usuário não encontrado");
    }
    }
}
export default DeleteUserService;
