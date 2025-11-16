import prismaDB from "../prisma";

export default class ListAllUserServicer {
    async execute() {
        const user = await prismaDB.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return user;
    }
}
