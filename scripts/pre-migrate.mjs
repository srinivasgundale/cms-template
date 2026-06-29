/**
 * Clears the batch=-1 "dev-mode push" marker from Payload's migrations table.
 *
 * Payload's `migrate` command prompts interactively when it finds this marker,
 * and in a non-TTY CI environment (like Vercel) the prompt resolves to false →
 * process.exit(0) → migrations never run. Removing the marker before running
 * `payload migrate` lets it proceed without the interactive prompt.
 */
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

try {
  // Check if the migrations table exists before touching it
  const { rows } = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'payload_migrations'
    ) AS exists
  `)

  if (rows[0]?.exists) {
    const result = await pool.query(
      `DELETE FROM payload_migrations WHERE batch = -1`,
    )
    if (result.rowCount > 0) {
      console.log(
        `pre-migrate: removed ${result.rowCount} dev-mode migration marker(s) from payload_migrations`,
      )
    }
  }
} catch (err) {
  // Non-fatal: if we can't reach the DB here the migration will fail with a
  // clearer error anyway.
  console.warn('pre-migrate: warning —', err.message)
} finally {
  await pool.end()
}
