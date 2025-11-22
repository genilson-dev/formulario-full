import {prismaDB} from '../../prisma';
import { MusicListRequest } from '../../interface/ListMusiByIdResuqest';

class ListMusicByIdService {
  async execute({ id }: MusicListRequest) {
    if (!id) {
      throw new Error("ID do Musico não fornecido.");
    }

    const user = await prismaDB.musica.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        inicioGem: true,
        status: true,
        funcao: true,
        congregacao: true,
        batizado: true,
        dataBatismo: true,
        instrumento: true,
        tonalidade: true,
        estadoCivil: true,
        createdAt: true,
        updatedAt: true,
      },
    });


    if (id.length === 0) {
      throw new Error("No Music found for this db");
    }

    if (!user) {
      throw new Error("Música não encontrada.");
    }
    console.log("eu sou o aquivo server ", user);


    return user;
  }
}

export default ListMusicByIdService;
