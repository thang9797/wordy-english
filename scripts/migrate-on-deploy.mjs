// Runs `prisma migrate deploy` during the build, but only for Vercel production deployments.
// Preview deployments share the same database, so they must never apply migrations.
// Local builds (no VERCEL_ENV) are skipped too; use `npm run db:deploy` there.
import { spawnSync } from "node:child_process";

if (process.env.VERCEL_ENV !== "production") {
  console.log(`[migrate] Skipping migrations (VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"}).`);
  process.exit(0);
}

// Migrations need a direct connection (advisory locks), not the pooled one.
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] No DATABASE_URL_UNPOOLED or DATABASE_URL set.");
  process.exit(1);
}

console.log("[migrate] Applying pending migrations…");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, DATABASE_URL: url },
});
process.exit(result.status ?? 1);
