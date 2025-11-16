/*
  Warnings:

  - You are about to drop the column `correct_option` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_a` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_b` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_c` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_d` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `option_e` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_user_id_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "correct_option",
DROP COLUMN "option_a",
DROP COLUMN "option_b",
DROP COLUMN "option_c",
DROP COLUMN "option_d",
DROP COLUMN "option_e",
DROP COLUMN "updated_At",
DROP COLUMN "user_id",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_At",
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- DropEnum
DROP TYPE "OptionLetter";

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
