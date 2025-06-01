/*
  Warnings:

  - The primary key for the `ExcFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `archivoRuta` on the `ExcFile` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExcFile` table. All the data in the column will be lost.
  - Added the required column `nroSubida` to the `ExcFile` table without a default value. This is not possible if the table is not empty.
  - Made the column `cuit` on table `ExcFile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExcFile" DROP CONSTRAINT "ExcFile_pkey",
DROP COLUMN "archivoRuta",
DROP COLUMN "id",
ADD COLUMN     "nroSubida" INTEGER NOT NULL,
ALTER COLUMN "cuit" SET NOT NULL,
ADD CONSTRAINT "ExcFile_pkey" PRIMARY KEY ("cuit", "nroSubida");
