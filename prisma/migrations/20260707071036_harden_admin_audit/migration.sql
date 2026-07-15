/*
  Warnings:

  - Changed the type of `action` on the `EditBackup` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BackupAction" AS ENUM ('UPDATE', 'DELETE');

-- Migrate existing singleton config rows to the fixed 'default' id.
-- Each config table is expected to contain at most one row.
UPDATE "HeroConfig" SET id = 'default';
UPDATE "AboutConfig" SET id = 'default';
UPDATE "FooterConfig" SET id = 'default';

-- AlterTable
ALTER TABLE "AboutConfig" ALTER COLUMN "id" SET DEFAULT 'default';

-- Safely convert EditBackup.action from text to BackupAction enum.
ALTER TABLE "EditBackup" ADD COLUMN "action_new" "BackupAction";
UPDATE "EditBackup" SET "action_new" = "action"::text::"BackupAction";
ALTER TABLE "EditBackup" DROP COLUMN "action";
ALTER TABLE "EditBackup" RENAME COLUMN "action_new" TO "action";
ALTER TABLE "EditBackup" ALTER COLUMN "action" SET NOT NULL;

-- AlterTable
ALTER TABLE "FooterConfig" ALTER COLUMN "id" SET DEFAULT 'default';

-- AlterTable
ALTER TABLE "HeroConfig" ALTER COLUMN "id" SET DEFAULT 'default';

-- CreateIndex
CREATE INDEX "Blog_order_idx" ON "Blog"("order");

-- CreateIndex
CREATE INDEX "Project_order_idx" ON "Project"("order");

-- CreateIndex
CREATE INDEX "Service_order_idx" ON "Service"("order");

-- CreateIndex
CREATE INDEX "Testimonial_order_idx" ON "Testimonial"("order");
