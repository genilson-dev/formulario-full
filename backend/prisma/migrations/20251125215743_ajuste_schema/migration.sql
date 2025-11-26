/*
  Warnings:

  - You are about to drop the column `created_at` on the `musicas` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `musicas` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `musicas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Tonalidade" ADD VALUE 'FA_MAIO';

-- AlterTable
ALTER TABLE "musicas" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
