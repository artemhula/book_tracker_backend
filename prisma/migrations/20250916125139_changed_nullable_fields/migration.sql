/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."book" DROP CONSTRAINT "books_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."record" DROP CONSTRAINT "records_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."record" DROP CONSTRAINT "records_user_id_fkey";

-- DropTable
DROP TABLE "public"."book";

-- DropTable
DROP TABLE "public"."record";

-- CreateTable
CREATE TABLE "public"."books" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "total_pages" INTEGER,
    "current_page" INTEGER,
    "cover_url" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."records" (
    "id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "pages_read" INTEGER NOT NULL,
    "read_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
