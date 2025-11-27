/*
  Warnings:

  - The values [CLARINETA_ALTA,CLARINETA_BAIXA] on the enum `Instrumento` will be removed. If these variants are still used in the database, this will fail.
  - The values [FA_MAIO] on the enum `Tonalidade` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Instrumento_new" AS ENUM ('VIOLINO', 'VIOLA', 'VIOLONCELO', 'CONTRABAIXO_ACUSTICO', 'FLAUTA', 'CLARINETA', 'CLARINETA_ALTO', 'CLARINETA_BAIXO', 'SAXOFONE_SOPRANO', 'SAXOFONE_ALTO', 'SAXOFONE_TENOR', 'SAXOFONE_BARITONO', 'TROMPETE', 'TROMBONE', 'TROMBONITO', 'BOMBARDAO', 'TUBA', 'ORGAO');
ALTER TYPE "Instrumento" RENAME TO "Instrumento_old";
ALTER TYPE "Instrumento_new" RENAME TO "Instrumento";
DROP TYPE "Instrumento_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Tonalidade_new" AS ENUM ('DO_MAIOR', 'SI_BEMOL', 'MI_BEMOL', 'FA_MAIOR');
ALTER TYPE "Tonalidade" RENAME TO "Tonalidade_old";
ALTER TYPE "Tonalidade_new" RENAME TO "Tonalidade";
DROP TYPE "Tonalidade_old";
COMMIT;
