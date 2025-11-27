import { prismaDB } from "../../prisma";

export default class ListAllMusicosServicer {
  async execute() {
    const music = await prismaDB.musica.findMany({
      orderBy: { name: "asc" },
    });

    return music;
  }
}
