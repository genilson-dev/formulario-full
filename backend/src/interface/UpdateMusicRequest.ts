import { Status, Funcao } from "@prisma/client";

export interface UpdateMusicaRequest {
  id: string;
  name?: string;
  ativo?: boolean;
  inicioGem?: Date | string;
  status?: Status;
  funcao?: Funcao; // <-- agora é enum
  congregacao?: string;
  batizado?: boolean;
  dataBatismo?: string | Date | null;
  instrumento?: string;
  tonalidade?: string;
  estadoCivil?: string;
}
