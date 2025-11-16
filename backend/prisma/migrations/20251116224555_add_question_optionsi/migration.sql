/*
  Warnings:

  - You are about to drop the `options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correct_option` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_a` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_b` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_c` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_d` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_e` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_question_id_fkey";

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "correct_option" TEXT NOT NULL,
ADD COLUMN     "option_a" TEXT NOT NULL,
ADD COLUMN     "option_b" TEXT NOT NULL,
ADD COLUMN     "option_c" TEXT NOT NULL,
ADD COLUMN     "option_d" TEXT NOT NULL,
ADD COLUMN     "option_e" TEXT NOT NULL;

-- DropTable
DROP TABLE "options";
