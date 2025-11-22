-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EstadoCivil" ADD VALUE 'SOLTEIRA';
ALTER TYPE "EstadoCivil" ADD VALUE 'CASADA';
ALTER TYPE "EstadoCivil" ADD VALUE 'DIVORCIADO';
ALTER TYPE "EstadoCivil" ADD VALUE 'DIVORCIADA';
ALTER TYPE "EstadoCivil" ADD VALUE 'VIUVO';
ALTER TYPE "EstadoCivil" ADD VALUE 'VIUVA';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Funcao" ADD VALUE 'INSTRUTOR';
ALTER TYPE "Funcao" ADD VALUE 'INSTRUTORA';
ALTER TYPE "Funcao" ADD VALUE 'EXAMINADORA';
ALTER TYPE "Funcao" ADD VALUE 'ENCARREGADO_LOCAL';
ALTER TYPE "Funcao" ADD VALUE 'ENCARREGADO_REGIONAL';

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'ALUNA';
