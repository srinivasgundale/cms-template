import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'hi', 'mr');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'hi', 'mr');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'hi', 'mr');
  CREATE TYPE "public"."enum_site_settings_default_locale" AS ENUM('en', 'hi', 'mr');
  CREATE TYPE "public"."enum_site_settings_devanagari_font" AS ENUM('noto-sans-devanagari', 'mukta', 'hind', 'tiro-devanagari');
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"nav_column_label" varchar DEFAULT 'Quick Links',
  	"contact_column_label" varchar DEFAULT 'Contact Us',
  	"address" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"hours" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_locale" "enum_site_settings_default_locale" DEFAULT 'en' NOT NULL,
  	"devanagari_font" "enum_site_settings_devanagari_font" DEFAULT 'noto-sans-devanagari',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "pages_hero_hero_media_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_media_idx";
  DROP INDEX "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  ALTER TABLE "pages_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_content_with_image" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_video" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_timeline_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_timeline" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_table_headers" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_table_rows_cells" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_table_rows" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_table" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_newsletter" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cards_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_tabs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_html_embed" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_alert" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_slider" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_events_events" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_events" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_video" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_table_headers" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_table_rows_cells" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_table_rows" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_table" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_stats" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cards_items" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cards" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_tabs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_html_embed" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_alert" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_slider" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_events_events" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_events" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages_locales" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v_locales" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_links_locale_idx" ON "pages_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_columns_locale_idx" ON "pages_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_with_image_locale_idx" ON "pages_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_block_locale_idx" ON "pages_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_archive_locale_idx" ON "pages_blocks_archive" USING btree ("_locale");
  CREATE INDEX "pages_blocks_form_block_locale_idx" ON "pages_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_locale_idx" ON "pages_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_locale_idx" ON "pages_blocks_video" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_locale_idx" ON "pages_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_items_locale_idx" ON "pages_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_locale_idx" ON "pages_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "pages_blocks_table_headers_locale_idx" ON "pages_blocks_table_headers" USING btree ("_locale");
  CREATE INDEX "pages_blocks_table_rows_cells_locale_idx" ON "pages_blocks_table_rows_cells" USING btree ("_locale");
  CREATE INDEX "pages_blocks_table_rows_locale_idx" ON "pages_blocks_table_rows" USING btree ("_locale");
  CREATE INDEX "pages_blocks_table_locale_idx" ON "pages_blocks_table" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_items_locale_idx" ON "pages_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_locale_idx" ON "pages_blocks_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_social_links_locale_idx" ON "pages_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_locale_idx" ON "pages_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_locale_idx" ON "pages_blocks_team" USING btree ("_locale");
  CREATE INDEX "pages_blocks_newsletter_locale_idx" ON "pages_blocks_newsletter" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cards_items_locale_idx" ON "pages_blocks_cards_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cards_locale_idx" ON "pages_blocks_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_tabs_tabs_locale_idx" ON "pages_blocks_tabs_tabs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_tabs_locale_idx" ON "pages_blocks_tabs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_html_embed_locale_idx" ON "pages_blocks_html_embed" USING btree ("_locale");
  CREATE INDEX "pages_blocks_alert_locale_idx" ON "pages_blocks_alert" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_logos_locale_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_locale_idx" ON "pages_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "pages_blocks_slider_slides_locale_idx" ON "pages_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "pages_blocks_slider_locale_idx" ON "pages_blocks_slider" USING btree ("_locale");
  CREATE INDEX "pages_blocks_events_events_locale_idx" ON "pages_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "pages_blocks_events_locale_idx" ON "pages_blocks_events" USING btree ("_locale");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_version_hero_links_locale_idx" ON "_pages_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_columns_locale_idx" ON "_pages_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_locale_idx" ON "_pages_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_with_image_locale_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_block_locale_idx" ON "_pages_v_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_archive_locale_idx" ON "_pages_v_blocks_archive" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_form_block_locale_idx" ON "_pages_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_locale_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_locale_idx" ON "_pages_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locale_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_items_locale_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_locale_idx" ON "_pages_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_table_headers_locale_idx" ON "_pages_v_blocks_table_headers" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_table_rows_cells_locale_idx" ON "_pages_v_blocks_table_rows_cells" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_table_rows_locale_idx" ON "_pages_v_blocks_table_rows" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_table_locale_idx" ON "_pages_v_blocks_table" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_items_locale_idx" ON "_pages_v_blocks_stats_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_locale_idx" ON "_pages_v_blocks_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_locale_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_locale_idx" ON "_pages_v_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_locale_idx" ON "_pages_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_newsletter_locale_idx" ON "_pages_v_blocks_newsletter" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cards_items_locale_idx" ON "_pages_v_blocks_cards_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cards_locale_idx" ON "_pages_v_blocks_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_locale_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_tabs_locale_idx" ON "_pages_v_blocks_tabs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_html_embed_locale_idx" ON "_pages_v_blocks_html_embed" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_alert_locale_idx" ON "_pages_v_blocks_alert" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_locale_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_locale_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_slider_slides_locale_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_slider_locale_idx" ON "_pages_v_blocks_slider" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_events_events_locale_idx" ON "_pages_v_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_events_locale_idx" ON "_pages_v_blocks_events" USING btree ("_locale");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id","locale");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id","locale");
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "hero_type";
  ALTER TABLE "pages" DROP COLUMN "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN "hero_media_id";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "categories" DROP COLUMN "title";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_country" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN "subject";
  ALTER TABLE "forms_emails" DROP COLUMN "message";
  ALTER TABLE "forms" DROP COLUMN "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN "confirmation_message";
  ALTER TABLE "search" DROP COLUMN "title";
  ALTER TABLE "footer" DROP COLUMN "tagline";
  ALTER TABLE "footer" DROP COLUMN "nav_column_label";
  ALTER TABLE "footer" DROP COLUMN "contact_column_label";
  ALTER TABLE "footer" DROP COLUMN "address";
  ALTER TABLE "footer" DROP COLUMN "phone";
  ALTER TABLE "footer" DROP COLUMN "email";
  ALTER TABLE "footer" DROP COLUMN "hours";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP INDEX "pages_hero_links_locale_idx";
  DROP INDEX "pages_blocks_cta_links_locale_idx";
  DROP INDEX "pages_blocks_cta_locale_idx";
  DROP INDEX "pages_blocks_content_columns_locale_idx";
  DROP INDEX "pages_blocks_content_locale_idx";
  DROP INDEX "pages_blocks_content_with_image_locale_idx";
  DROP INDEX "pages_blocks_media_block_locale_idx";
  DROP INDEX "pages_blocks_archive_locale_idx";
  DROP INDEX "pages_blocks_form_block_locale_idx";
  DROP INDEX "pages_blocks_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_locale_idx";
  DROP INDEX "pages_blocks_video_locale_idx";
  DROP INDEX "pages_blocks_testimonials_items_locale_idx";
  DROP INDEX "pages_blocks_testimonials_locale_idx";
  DROP INDEX "pages_blocks_timeline_items_locale_idx";
  DROP INDEX "pages_blocks_timeline_locale_idx";
  DROP INDEX "pages_blocks_table_headers_locale_idx";
  DROP INDEX "pages_blocks_table_rows_cells_locale_idx";
  DROP INDEX "pages_blocks_table_rows_locale_idx";
  DROP INDEX "pages_blocks_table_locale_idx";
  DROP INDEX "pages_blocks_faq_items_locale_idx";
  DROP INDEX "pages_blocks_faq_locale_idx";
  DROP INDEX "pages_blocks_stats_items_locale_idx";
  DROP INDEX "pages_blocks_stats_locale_idx";
  DROP INDEX "pages_blocks_team_members_social_links_locale_idx";
  DROP INDEX "pages_blocks_team_members_locale_idx";
  DROP INDEX "pages_blocks_team_locale_idx";
  DROP INDEX "pages_blocks_newsletter_locale_idx";
  DROP INDEX "pages_blocks_cards_items_locale_idx";
  DROP INDEX "pages_blocks_cards_locale_idx";
  DROP INDEX "pages_blocks_tabs_tabs_locale_idx";
  DROP INDEX "pages_blocks_tabs_locale_idx";
  DROP INDEX "pages_blocks_html_embed_locale_idx";
  DROP INDEX "pages_blocks_alert_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_logos_locale_idx";
  DROP INDEX "pages_blocks_logo_cloud_locale_idx";
  DROP INDEX "pages_blocks_slider_slides_locale_idx";
  DROP INDEX "pages_blocks_slider_locale_idx";
  DROP INDEX "pages_blocks_events_events_locale_idx";
  DROP INDEX "pages_blocks_events_locale_idx";
  DROP INDEX "pages_rels_locale_idx";
  DROP INDEX "_pages_v_version_hero_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_locale_idx";
  DROP INDEX "_pages_v_blocks_content_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_content_locale_idx";
  DROP INDEX "_pages_v_blocks_content_with_image_locale_idx";
  DROP INDEX "_pages_v_blocks_media_block_locale_idx";
  DROP INDEX "_pages_v_blocks_archive_locale_idx";
  DROP INDEX "_pages_v_blocks_form_block_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_video_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_items_locale_idx";
  DROP INDEX "_pages_v_blocks_testimonials_locale_idx";
  DROP INDEX "_pages_v_blocks_timeline_items_locale_idx";
  DROP INDEX "_pages_v_blocks_timeline_locale_idx";
  DROP INDEX "_pages_v_blocks_table_headers_locale_idx";
  DROP INDEX "_pages_v_blocks_table_rows_cells_locale_idx";
  DROP INDEX "_pages_v_blocks_table_rows_locale_idx";
  DROP INDEX "_pages_v_blocks_table_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_items_locale_idx";
  DROP INDEX "_pages_v_blocks_stats_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_social_links_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_locale_idx";
  DROP INDEX "_pages_v_blocks_team_locale_idx";
  DROP INDEX "_pages_v_blocks_newsletter_locale_idx";
  DROP INDEX "_pages_v_blocks_cards_items_locale_idx";
  DROP INDEX "_pages_v_blocks_cards_locale_idx";
  DROP INDEX "_pages_v_blocks_tabs_tabs_locale_idx";
  DROP INDEX "_pages_v_blocks_tabs_locale_idx";
  DROP INDEX "_pages_v_blocks_html_embed_locale_idx";
  DROP INDEX "_pages_v_blocks_alert_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_logos_locale_idx";
  DROP INDEX "_pages_v_blocks_logo_cloud_locale_idx";
  DROP INDEX "_pages_v_blocks_slider_slides_locale_idx";
  DROP INDEX "_pages_v_blocks_slider_locale_idx";
  DROP INDEX "_pages_v_blocks_events_events_locale_idx";
  DROP INDEX "_pages_v_blocks_events_locale_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_pages_v_rels_locale_idx";
  DROP INDEX "_posts_v_snapshot_idx";
  DROP INDEX "_posts_v_published_locale_idx";
  DROP INDEX "categories_breadcrumbs_locale_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  ALTER TABLE "search" ADD COLUMN "title" varchar;
  ALTER TABLE "footer" ADD COLUMN "tagline" varchar;
  ALTER TABLE "footer" ADD COLUMN "nav_column_label" varchar DEFAULT 'Quick Links';
  ALTER TABLE "footer" ADD COLUMN "contact_column_label" varchar DEFAULT 'Contact Us';
  ALTER TABLE "footer" ADD COLUMN "address" varchar;
  ALTER TABLE "footer" ADD COLUMN "phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "email" varchar;
  ALTER TABLE "footer" ADD COLUMN "hours" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  ALTER TABLE "pages_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_with_image" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_video" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_timeline_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_table_headers" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_table_rows_cells" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_table_rows" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_table" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_newsletter" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cards_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cards" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_tabs_tabs" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_tabs" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_html_embed" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_alert" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud_logos" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_logo_cloud" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_slider" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_events_events" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_events" DROP COLUMN "_locale";
  ALTER TABLE "pages_rels" DROP COLUMN "locale";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_with_image" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_video" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_timeline_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_table_headers" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_table_rows_cells" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_table_rows" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_table" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_stats" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_newsletter" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cards_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cards" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_tabs_tabs" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_tabs" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_html_embed" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_alert" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_logo_cloud" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_slider" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_events_events" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_events" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locale";
  ALTER TABLE "_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN "published_locale";
  ALTER TABLE "categories_breadcrumbs" DROP COLUMN "_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_site_settings_default_locale";
  DROP TYPE "public"."enum_site_settings_devanagari_font";`)
}
