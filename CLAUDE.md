# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Database / Schema Changes

Whenever a field is added, removed, or changed in a Payload collection or block config:

1. **Create a migration file:**

   ```bash
   npx payload migrate:create
   ```

   This generates a timestamped file in `src/migrations/` and registers it in `src/migrations/index.ts`.

2. **Edit the migration** if Payload's auto-generated SQL needs adjusting (e.g. `text → jsonb` requires a DROP + ADD instead of ALTER, since PostgreSQL cannot auto-cast plain text to jsonb).

3. **Run the migration against the database:**

   ```bash
   npx payload migrate
   ```

4. **Regenerate TypeScript types** after schema changes:

   ```bash
   pnpm generate:types
   ```

> **Why:** Skipping migration creation causes Payload to attempt an auto-ALTER at startup, which often fails (e.g. `column cannot be cast automatically to type jsonb`). Always create and run migrations explicitly.
