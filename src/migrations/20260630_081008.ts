import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_testimonials_items_badge_color" AS ENUM('green', 'blue', 'orange', 'purple', 'red', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_items_badge_color" AS ENUM('green', 'blue', 'orange', 'purple', 'red', 'gray');
  ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "rating" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "rating" DROP DEFAULT;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "tenure" varchar;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "badge_color" "enum_pages_blocks_testimonials_items_badge_color" DEFAULT 'green';
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "tenure" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "badge_color" "enum__pages_v_blocks_testimonials_items_badge_color" DEFAULT 'green';
  ALTER TABLE "header" ADD COLUMN "background_color" varchar;
  ALTER TABLE "footer" ADD COLUMN "background_color" varchar;
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "company";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "company";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "rating" SET DEFAULT '5';
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "rating" SET DEFAULT '5';
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "company" varchar;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "company" varchar;
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "tenure";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "badge_color";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "tenure";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "badge_color";
  ALTER TABLE "header" DROP COLUMN "background_color";
  ALTER TABLE "footer" DROP COLUMN "background_color";
  DROP TYPE "public"."enum_pages_blocks_testimonials_items_badge_color";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_items_badge_color";`)
}
