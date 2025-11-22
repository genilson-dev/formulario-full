import { Funcao, Status } from "../../../generated/prisma/client";
import { prismaDB } from "../../prisma";
import { EstadoCivil, Prisma } from "@prisma/client";

interface MusicaRequest {
  name: string;
  inicioGem: Date | string;
  status: Status;
  funcao: Funcao;
  congregacao: string;
  batizado: boolean;
  dataBatismo?: Date | string | null;
  instrumento: string;
  tonalidade: string;
  estadoCivil: EstadoCivil;
}

class CreateMusicaService {
  async execute(data: MusicaRequest) {
    const musica = await prismaDB.musica.create({
      data: {
        name: data.name,
        inicioGem: new Date(data.inicioGem),
        status: data.status,
        funcao: data.funcao,
        congregacao: data.congregacao,
        batizado: data.batizado,
        dataBatismo: data.dataBatismo ? new Date(data.dataBatismo) : null,
        instrumento: data.instrumento,
        tonalidade: data.tonalidade,
        estadoCivil: data.estadoCivil,
      }
    });

    return musica;
  }
}

export default CreateMusicaService;

