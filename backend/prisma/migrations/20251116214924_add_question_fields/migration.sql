/*
  Warnings:

  - You are about to drop the column `userId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `users` table. All the data in the column will be lost.
  - Added the required column `correct_option` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_a` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_b` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_c` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_d` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_e` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_At` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OptionLetter" AS ENUM ('a', 'b', 'c', 'd', 'e');

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_userId_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "userId",
ADD COLUMN     "correct_option" TEXT NOT NULL,
ADD COLUMN     "option_a" TEXT NOT NULL,
ADD COLUMN     "option_b" TEXT NOT NULL,
ADD COLUMN     "option_c" TEXT NOT NULL,
ADD COLUMN     "option_d" TEXT NOT NULL,
ADD COLUMN     "option_e" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiry",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updated_At" SET NOT NULL,
ALTER COLUMN "updated_At" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
