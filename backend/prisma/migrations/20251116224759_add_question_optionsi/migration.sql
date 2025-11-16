/*
  Warnings:

  - You are about to drop the column `correct_option` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_a` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_b` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_c` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_d` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_e` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "correct_option",
DROP COLUMN "option_a",
DROP COLUMN "option_b",
DROP COLUMN "option_c",
DROP COLUMN "option_d",
DROP COLUMN "option_e";

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
