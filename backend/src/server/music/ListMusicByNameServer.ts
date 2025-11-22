import {prismaDB} from "../../prisma";
import { SearchMusicRequest } from "../../interface/SearchMusicRequest";

class SearchMusicByNameService {
  async execute({ name }: SearchMusicRequest) {
    if (!name) {
      throw new Error("Nome  não fornecido.");
    }

    const user = await prismaDB.musica.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive", // busca sem diferenciar maiúsculas/minúsculas
        }

      },
    });

    return user;
  }
}

export default SearchMusicByNameService;

