import {prismaDB} from "../../prisma";
export default class ListAllInativosMusicasServicer {
    async execute() {
        const music = await prismaDB.musica.findMany()
        return music;
    }
}
