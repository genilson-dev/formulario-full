import { Status, Funcao, EstadoCivil } from "@prisma/client";

export interface CreateMusicRequest {
  id: string;              // opcional, pois o Prisma gera UUID
  name: string;
  inicioGem: Date;
  status: Status;           // enum
  funcao: Funcao;           // enum
  congregacao: string;
  batizado: boolean;        // boolean
  dataBatismo?: Date;       // opcional
  instrumento: string;
  tonalidade: string;
  estadoCivil: EstadoCivil; // enum
}
