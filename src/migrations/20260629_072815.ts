import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_form_block_image_position" AS ENUM('left', 'right', 'background');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_gallery_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_video_source" AS ENUM('youtube', 'vimeo', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_items_rating" AS ENUM('5', '4', '3', '2', '1');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_layout" AS ENUM('grid', 'carousel', 'list');
  CREATE TYPE "public"."enum_pages_blocks_timeline_layout" AS ENUM('vertical', 'horizontal', 'alternating');
  CREATE TYPE "public"."enum_pages_blocks_table_headers_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_faq_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_stats_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum_pages_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'website');
  CREATE TYPE "public"."enum_pages_blocks_team_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_team_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_layout" AS ENUM('centered', 'inline', 'stacked');
  CREATE TYPE "public"."enum_pages_blocks_cards_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cards_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cards_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_tabs_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_alert_style" AS ENUM('info', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum_pages_blocks_logo_cloud_layout" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_image_position" AS ENUM('left', 'right', 'background');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_video_source" AS ENUM('youtube', 'vimeo', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_items_rating" AS ENUM('5', '4', '3', '2', '1');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_layout" AS ENUM('grid', 'carousel', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_layout" AS ENUM('vertical', 'horizontal', 'alternating');
  CREATE TYPE "public"."enum__pages_v_blocks_table_headers_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_layout" AS ENUM('grid', 'inline');
  CREATE TYPE "public"."enum__pages_v_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'website');
  CREATE TYPE "public"."enum__pages_v_blocks_team_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_team_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_layout" AS ENUM('centered', 'inline', 'stacked');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_alert_style" AS ENUM('info', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_layout" AS ENUM('row', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_floating_cta_items_icon" AS ENUM('phone', 'whatsapp', 'email', 'chat', 'custom');
  CREATE TYPE "public"."enum_floating_cta_items_style" AS ENUM('bubble', 'primary', 'outline');
  CREATE TYPE "public"."enum_floating_cta_variant" AS ENUM('bottom-bar', 'side-right', 'side-left');
  CREATE TABLE "pages_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_position" "enum_pages_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum_pages_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_gallery_columns" DEFAULT '4',
  	"cta_title" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"cta_link_type" "enum_pages_blocks_gallery_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_blocks_gallery_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"source" "enum_pages_blocks_video_source" DEFAULT 'youtube',
  	"url" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"autoplay" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"company" varchar,
  	"rating" "enum_pages_blocks_testimonials_items_rating" DEFAULT '5',
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_pages_blocks_testimonials_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_pages_blocks_timeline_layout" DEFAULT 'vertical',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum_pages_blocks_table_headers_align" DEFAULT 'left'
  );
  
  CREATE TABLE "pages_blocks_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar
  );
  
  CREATE TABLE "pages_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"striped" boolean DEFAULT true,
  	"bordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" varchar,
  	"image_position" "enum_pages_blocks_faq_image_position" DEFAULT 'left',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum_pages_blocks_stats_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_team_members_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum_pages_blocks_team_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_team_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"layout" "enum_pages_blocks_newsletter_layout" DEFAULT 'centered',
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"action_url" varchar,
  	"success_message" varchar DEFAULT 'Thanks for subscribing!',
  	"disclaimer" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"badge" varchar,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_cards_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cards_items_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum_pages_blocks_cards_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_cards_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alignment" "enum_pages_blocks_tabs_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_alert" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_alert_style" DEFAULT 'info',
  	"title" varchar,
  	"message" jsonb,
  	"show_icon" boolean DEFAULT true,
  	"dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum_pages_blocks_logo_cloud_layout" DEFAULT 'row',
  	"grayscale" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"overlay_position" "enum_pages_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"description" varchar,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_slider_slides_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 4000,
  	"show_arrows" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_position" "enum__pages_v_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum__pages_v_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_gallery_columns" DEFAULT '4',
  	"cta_title" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"cta_link_type" "enum__pages_v_blocks_gallery_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_blocks_gallery_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"source" "enum__pages_v_blocks_video_source" DEFAULT 'youtube',
  	"url" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"caption" varchar,
  	"autoplay" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"company" varchar,
  	"rating" "enum__pages_v_blocks_testimonials_items_rating" DEFAULT '5',
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__pages_v_blocks_testimonials_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__pages_v_blocks_timeline_layout" DEFAULT 'vertical',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum__pages_v_blocks_table_headers_align" DEFAULT 'left',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"striped" boolean DEFAULT true,
  	"bordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" varchar,
  	"image_position" "enum__pages_v_blocks_faq_image_position" DEFAULT 'left',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum__pages_v_blocks_stats_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_team_members_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum__pages_v_blocks_team_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_team_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"layout" "enum__pages_v_blocks_newsletter_layout" DEFAULT 'centered',
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"action_url" varchar,
  	"success_message" varchar DEFAULT 'Thanks for subscribing!',
  	"disclaimer" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"badge" varchar,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_cards_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cards_items_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum__pages_v_blocks_cards_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_cards_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"alignment" "enum__pages_v_blocks_tabs_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_alert" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_alert_style" DEFAULT 'info',
  	"title" varchar,
  	"message" jsonb,
  	"show_icon" boolean DEFAULT true,
  	"dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"layout" "enum__pages_v_blocks_logo_cloud_layout" DEFAULT 'row',
  	"grayscale" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"overlay_position" "enum__pages_v_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"description" varchar,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_slider_slides_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 4000,
  	"show_arrows" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "floating_cta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_floating_cta_items_icon" DEFAULT 'phone',
  	"custom_icon_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"style" "enum_floating_cta_items_style" DEFAULT 'bubble',
  	"background_color" varchar,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "floating_cta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"variant" "enum_floating_cta_variant" DEFAULT 'bottom-bar',
  	"show_scroll_to_top" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "background_color" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "image_position" "enum_pages_blocks_form_block_image_position" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "background_color" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "image_position" "enum__pages_v_blocks_form_block_image_position" DEFAULT 'left';
  ALTER TABLE "media" ADD COLUMN "cloudinary_id" varchar;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "pages_blocks_content_with_image" ADD CONSTRAINT "pages_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_image" ADD CONSTRAINT "pages_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_headers" ADD CONSTRAINT "pages_blocks_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_rows_cells" ADD CONSTRAINT "pages_blocks_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_rows" ADD CONSTRAINT "pages_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table" ADD CONSTRAINT "pages_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members_social_links" ADD CONSTRAINT "pages_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_items" ADD CONSTRAINT "pages_blocks_cards_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_items" ADD CONSTRAINT "pages_blocks_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs" ADD CONSTRAINT "pages_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_html_embed" ADD CONSTRAINT "pages_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alert" ADD CONSTRAINT "pages_blocks_alert_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider" ADD CONSTRAINT "pages_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD CONSTRAINT "_pages_v_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD CONSTRAINT "_pages_v_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_headers" ADD CONSTRAINT "_pages_v_blocks_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_rows" ADD CONSTRAINT "_pages_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table" ADD CONSTRAINT "_pages_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_social_links" ADD CONSTRAINT "_pages_v_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_items" ADD CONSTRAINT "_pages_v_blocks_cards_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_items" ADD CONSTRAINT "_pages_v_blocks_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_html_embed" ADD CONSTRAINT "_pages_v_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alert" ADD CONSTRAINT "_pages_v_blocks_alert_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider" ADD CONSTRAINT "_pages_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "floating_cta_items" ADD CONSTRAINT "floating_cta_items_custom_icon_id_media_id_fk" FOREIGN KEY ("custom_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "floating_cta_items" ADD CONSTRAINT "floating_cta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."floating_cta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_with_image_order_idx" ON "pages_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_with_image_parent_id_idx" ON "pages_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_with_image_path_idx" ON "pages_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_with_image_image_idx" ON "pages_blocks_content_with_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_video_idx" ON "pages_blocks_video" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_items_icon_idx" ON "pages_blocks_timeline_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_table_headers_order_idx" ON "pages_blocks_table_headers" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_headers_parent_id_idx" ON "pages_blocks_table_headers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_rows_cells_order_idx" ON "pages_blocks_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_rows_cells_parent_id_idx" ON "pages_blocks_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_rows_order_idx" ON "pages_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_rows_parent_id_idx" ON "pages_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_order_idx" ON "pages_blocks_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_parent_id_idx" ON "pages_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_path_idx" ON "pages_blocks_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_image_idx" ON "pages_blocks_faq" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_icon_idx" ON "pages_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_members_social_links_order_idx" ON "pages_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_social_links_parent_id_idx" ON "pages_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_items_order_idx" ON "pages_blocks_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_items_parent_id_idx" ON "pages_blocks_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_items_image_idx" ON "pages_blocks_cards_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_tabs_tabs_order_idx" ON "pages_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_tabs_parent_id_idx" ON "pages_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_order_idx" ON "pages_blocks_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_parent_id_idx" ON "pages_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_path_idx" ON "pages_blocks_tabs" USING btree ("_path");
  CREATE INDEX "pages_blocks_html_embed_order_idx" ON "pages_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_html_embed_parent_id_idx" ON "pages_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_html_embed_path_idx" ON "pages_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_alert_order_idx" ON "pages_blocks_alert" USING btree ("_order");
  CREATE INDEX "pages_blocks_alert_parent_id_idx" ON "pages_blocks_alert" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alert_path_idx" ON "pages_blocks_alert" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_logo_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_slider_slides_order_idx" ON "pages_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_slider_slides_parent_id_idx" ON "pages_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_slider_slides_image_idx" ON "pages_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_slider_order_idx" ON "pages_blocks_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_slider_parent_id_idx" ON "pages_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_slider_path_idx" ON "pages_blocks_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_with_image_order_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_with_image_parent_id_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_with_image_path_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_with_image_image_idx" ON "_pages_v_blocks_content_with_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_video_idx" ON "_pages_v_blocks_video" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_items_icon_idx" ON "_pages_v_blocks_timeline_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_table_headers_order_idx" ON "_pages_v_blocks_table_headers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_headers_parent_id_idx" ON "_pages_v_blocks_table_headers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_rows_cells_order_idx" ON "_pages_v_blocks_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_rows_order_idx" ON "_pages_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_rows_parent_id_idx" ON "_pages_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_order_idx" ON "_pages_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_parent_id_idx" ON "_pages_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_path_idx" ON "_pages_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_image_idx" ON "_pages_v_blocks_faq" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_icon_idx" ON "_pages_v_blocks_stats_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_order_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_parent_id_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_items_order_idx" ON "_pages_v_blocks_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_items_parent_id_idx" ON "_pages_v_blocks_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_items_image_idx" ON "_pages_v_blocks_cards_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_order_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_order_idx" ON "_pages_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_parent_id_idx" ON "_pages_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_path_idx" ON "_pages_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_html_embed_order_idx" ON "_pages_v_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_html_embed_parent_id_idx" ON "_pages_v_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_html_embed_path_idx" ON "_pages_v_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_alert_order_idx" ON "_pages_v_blocks_alert" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alert_parent_id_idx" ON "_pages_v_blocks_alert" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alert_path_idx" ON "_pages_v_blocks_alert" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_logo_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_slider_slides_order_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_slider_slides_parent_id_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_slider_slides_image_idx" ON "_pages_v_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_slider_order_idx" ON "_pages_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_slider_parent_id_idx" ON "_pages_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_slider_path_idx" ON "_pages_v_blocks_slider" USING btree ("_path");
  CREATE INDEX "floating_cta_items_order_idx" ON "floating_cta_items" USING btree ("_order");
  CREATE INDEX "floating_cta_items_parent_id_idx" ON "floating_cta_items" USING btree ("_parent_id");
  CREATE INDEX "floating_cta_items_custom_icon_idx" ON "floating_cta_items" USING btree ("custom_icon_id");
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_block_image_idx" ON "pages_blocks_form_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_form_block_image_idx" ON "_pages_v_blocks_form_block" USING btree ("image_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_with_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_members_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_html_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_alert" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_cloud_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_slider_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_with_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_members_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_html_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_alert" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_slider_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_cta_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_cta" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_content_with_image" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_table_headers" CASCADE;
  DROP TABLE "pages_blocks_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_table_rows" CASCADE;
  DROP TABLE "pages_blocks_table" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_team_members_social_links" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_cards_items" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs" CASCADE;
  DROP TABLE "pages_blocks_html_embed" CASCADE;
  DROP TABLE "pages_blocks_alert" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_slider_slides" CASCADE;
  DROP TABLE "pages_blocks_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_content_with_image" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_table_headers" CASCADE;
  DROP TABLE "_pages_v_blocks_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_table" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_html_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_alert" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_slider_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_slider" CASCADE;
  DROP TABLE "floating_cta_items" CASCADE;
  DROP TABLE "floating_cta" CASCADE;
  ALTER TABLE "pages_blocks_form_block" DROP CONSTRAINT "pages_blocks_form_block_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_form_block" DROP CONSTRAINT "_pages_v_blocks_form_block_image_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX "pages_blocks_form_block_image_idx";
  DROP INDEX "_pages_v_blocks_form_block_image_idx";
  DROP INDEX "header_logo_idx";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "image_position";
  ALTER TABLE "media" DROP COLUMN "cloudinary_id";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_form_block_image_position";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_gallery_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_video_source";
  DROP TYPE "public"."enum_pages_blocks_testimonials_items_rating";
  DROP TYPE "public"."enum_pages_blocks_testimonials_layout";
  DROP TYPE "public"."enum_pages_blocks_timeline_layout";
  DROP TYPE "public"."enum_pages_blocks_table_headers_align";
  DROP TYPE "public"."enum_pages_blocks_faq_image_position";
  DROP TYPE "public"."enum_pages_blocks_stats_layout";
  DROP TYPE "public"."enum_pages_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_team_layout";
  DROP TYPE "public"."enum_pages_blocks_team_columns";
  DROP TYPE "public"."enum_pages_blocks_newsletter_layout";
  DROP TYPE "public"."enum_pages_blocks_cards_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_cards_items_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cards_layout";
  DROP TYPE "public"."enum_pages_blocks_cards_columns";
  DROP TYPE "public"."enum_pages_blocks_tabs_alignment";
  DROP TYPE "public"."enum_pages_blocks_alert_style";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_layout";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_video_source";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_items_rating";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_layout";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__pages_v_blocks_table_headers_align";
  DROP TYPE "public"."enum__pages_v_blocks_faq_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_stats_layout";
  DROP TYPE "public"."enum__pages_v_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_team_layout";
  DROP TYPE "public"."enum__pages_v_blocks_team_columns";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cards_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cards_items_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cards_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cards_columns";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_alert_style";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_layout";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_link_appearance";
  DROP TYPE "public"."enum_floating_cta_items_icon";
  DROP TYPE "public"."enum_floating_cta_items_style";
  DROP TYPE "public"."enum_floating_cta_variant";`)
}
