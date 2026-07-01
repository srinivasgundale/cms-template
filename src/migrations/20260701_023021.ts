import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "heading_tag" "enum_pages_blocks_slider_slides_heading_tag" DEFAULT 'h2';
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "overlay_strength" "enum_pages_blocks_slider_slides_overlay_strength" DEFAULT 'medium';
  ALTER TABLE "pages_blocks_slider" ADD COLUMN "show_scroll_indicator" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "heading_tag" "enum__pages_v_blocks_slider_slides_heading_tag" DEFAULT 'h2';
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "overlay_strength" "enum__pages_v_blocks_slider_slides_overlay_strength" DEFAULT 'medium';
  ALTER TABLE "_pages_v_blocks_slider" ADD COLUMN "show_scroll_indicator" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "image_alt";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "heading_tag";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "overlay_strength";
  ALTER TABLE "pages_blocks_slider" DROP COLUMN "show_scroll_indicator";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "image_alt";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "heading_tag";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "overlay_strength";
  ALTER TABLE "_pages_v_blocks_slider" DROP COLUMN "show_scroll_indicator";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_overlay_strength";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_strength";`)
}
