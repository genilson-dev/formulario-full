// src/server/music/UpdateMusicService.ts
import { prismaDB } from "../../prisma/index";
import { UpdateMusicaRequest } from "../../interface/UpdateMusicRequest";
import { Status, Funcao } from "@prisma/client";

class UpdateMusicService {
  async execute({
    id,
    name,
    ativo,
    inicioGem,
    status,
    funcao,
    congregacao,
    batizado,
    dataBatismo,
    instrumento,
    tonalidade,
    estadoCivil,
  }: UpdateMusicaRequest) {
    if (!id) {
      throw new Error("ID do músico é obrigatório.");
    }

    // Verifica se o registro existe
    const exists = await prismaDB.musica.findUnique({ where: { id } });
    if (!exists) {
      throw new Error("Músico não encontrado.");
    }

    const data: any = {};

    if (name !== undefined) data.name = name.toLocaleUpperCase();
    if (ativo !== undefined) data.ativo = ativo;

    if (inicioGem !== undefined) {
      data.inicioGem =
        typeof inicioGem === "string" ? new Date(inicioGem) : inicioGem;
    }

    if (status !== undefined) {
      if (Object.values(Status).includes(status as Status)) {
        data.status = status as Status;
      } else {
        throw new Error(`Status inválido: ${status}`);
      }
    }

    if (funcao !== undefined) {
      if (Object.values(Funcao).includes(funcao as Funcao)) {
        data.funcao = funcao as Funcao;
      } else {
        throw new Error(`Função inválida: ${funcao}`);
      }
    }

    if (congregacao !== undefined) data.congregacao = congregacao.toLocaleUpperCase();
    if (batizado !== undefined) data.batizado = batizado;

    if (dataBatismo !== undefined) {
      data.dataBatismo =
        typeof dataBatismo === "string" ? new Date(dataBatismo) : dataBatismo ? dataBatismo : null;
    }

    if (instrumento !== undefined) data.instrumento = instrumento.toLocaleUpperCase();
    if (tonalidade !== undefined) data.tonalidade = tonalidade.toLocaleUpperCase();
    if (estadoCivil !== undefined) data.estadoCivil = estadoCivil.toLocaleUpperCase();

    const musico = await prismaDB.musica.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        ativo: true,
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

    return musico;
  }
}

export default UpdateMusicService;
