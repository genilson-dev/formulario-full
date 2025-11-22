import {prismaDB} from "../../prisma";
export default class ListAllAtivosMusicasServicer {
    async execute() {
        const music = await prismaDB.musica.findMany()
        return music;
    }
}
