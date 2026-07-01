import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" ADD COLUMN "tagline" varchar;
  ALTER TABLE "footer" ADD COLUMN "nav_column_label" varchar DEFAULT 'Quick Links';
  ALTER TABLE "footer" ADD COLUMN "contact_column_label" varchar DEFAULT 'Contact Us';
  ALTER TABLE "footer" ADD COLUMN "address" varchar;
  ALTER TABLE "footer" ADD COLUMN "phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "email" varchar;
  ALTER TABLE "footer" ADD COLUMN "hours" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer" DROP COLUMN "tagline";
  ALTER TABLE "footer" DROP COLUMN "nav_column_label";
  ALTER TABLE "footer" DROP COLUMN "contact_column_label";
  ALTER TABLE "footer" DROP COLUMN "address";
  ALTER TABLE "footer" DROP COLUMN "phone";
  ALTER TABLE "footer" DROP COLUMN "email";
  ALTER TABLE "footer" DROP COLUMN "hours";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";`)
}
