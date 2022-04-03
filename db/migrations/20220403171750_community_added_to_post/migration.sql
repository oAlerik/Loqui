/*
  Warnings:

  - Added the required column `communityName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "communityName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityName_fkey" FOREIGN KEY ("communityName") REFERENCES "Community"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
