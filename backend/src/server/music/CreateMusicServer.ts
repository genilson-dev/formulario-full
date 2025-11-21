// import {prismaDB} from "../../prisma";
// import { CreateMusicRequest } from "../../interface/CreateMusicRequest";

// // import { Status, Funcao, EstadoCivil } from "@prisma/client";


// class CreateMusicService {
//   async execute({
//     id,
//     name,
//     inicioGem,
//     status,
//     funcao,
//     congregacao,
//     batizado,
//     dataBatismo,
//     instrumento,
//     tonalidade,
//     estadoCivil,
//   }: CreateMusicRequest) {
//     if (!name) {
//       throw new Error("Nome é obrigatório.");
//     }

//     // verifica se já existe pelo id
//     const membroExists = await prismaDB.musica.findUnique({
//       where: { id: id },
//     });

//     if (membroExists) {
//       throw new Error("Pessoa já cadastrada.");
//     }

//     const newMembro = await prismaDB.musica.create({
//       data: {
//         name: name,
//         inicioGem: new Date(inicioGem),
//         status: status as Status,
//         funcao: funcao as Funcao,
//         congregacao: congregacao,
//         batizado: batizado,
//         dataBatismo: dataBatismo ? new Date(dataBatismo) : null,
//         instrumento: instrumento,
//         tonalidade: tonalidade,
//         estadoCivil: estadoCivil as EstadoCivil,
//       },
//       select: {
//         id: true,
//         name: true,
//         inicioGem: true,
//         status: true,
//         funcao: true,
//         congregacao: true,
//         batizado: true,
//         dataBatismo: true,
//         instrumento: true,
//         tonalidade: true,
//         estadoCivil: true,
//       },
//     });

//     return newMembro;
//   }
// }

// export default CreateMusicService;

// src/server/musica/CreateMusicaService.ts

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

