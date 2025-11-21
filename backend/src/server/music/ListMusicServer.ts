import {prismaDB} from "../../prisma";
export default class ListAllMusicosServicer {
    async execute() {
        const music = await prismaDB.musica.findMany({
            where:{
                ativo: false                
            },            
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return music;
    }
}
