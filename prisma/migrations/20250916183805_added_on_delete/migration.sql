-- DropForeignKey
ALTER TABLE "public"."books" DROP CONSTRAINT "books_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."records" DROP CONSTRAINT "records_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."records" DROP CONSTRAINT "records_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."records" ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
