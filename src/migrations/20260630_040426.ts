import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "mobile_image_id" integer;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "mobile_image_id" integer;
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_slider_slides_mobile_image_idx" ON "pages_blocks_slider_slides" USING btree ("mobile_image_id");
  CREATE INDEX "_pages_v_blocks_slider_slides_mobile_image_idx" ON "_pages_v_blocks_slider_slides" USING btree ("mobile_image_id");
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "description" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_slider_slides" DROP CONSTRAINT "pages_blocks_slider_slides_mobile_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP CONSTRAINT "_pages_v_blocks_slider_slides_mobile_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_slider_slides_mobile_image_idx";
  DROP INDEX "_pages_v_blocks_slider_slides_mobile_image_idx";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "mobile_image_id";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "mobile_image_id";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "description" varchar;`)
}
