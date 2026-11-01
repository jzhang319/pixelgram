#!/usr/bin/env node
// Runs as "prebuild" (npm's implicit pre<script> hook, so plain
// `npm run build` always triggers this first). Fails the build loudly
// if the Supabase env vars chat needs at build time aren't set, instead
// of silently shipping a build where chat is dark. Deliberately not wired
// into "start" -- local dev without these vars should still run.
const fs = require("fs");
const path = require("path");

const REACT_APP_DIR = path.join(__dirname, "..");

// Minimal .env-file loader mirroring dotenv's actual precedence rule:
// a key already present in process.env (even as an empty string) is left
// alone, matching how Create React App resolves REACT_APP_* vars.
function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// CRA's real build-time precedence (.env.test is skipped -- that's test
// only): the FIRST file loaded here wins, since loadEnvFile only fills in
// keys not already set. So load in highest-to-lowest priority order:
// .env.production.local > .env.production > .env.local > .env.
loadEnvFile(path.join(REACT_APP_DIR, ".env.production.local"));
loadEnvFile(path.join(REACT_APP_DIR, ".env.production"));
loadEnvFile(path.join(REACT_APP_DIR, ".env.local"));
loadEnvFile(path.join(REACT_APP_DIR, ".env"));

const REQUIRED = ["REACT_APP_SUPABASE_URL", "REACT_APP_SUPABASE_ANON_KEY"];
const missing = REQUIRED.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(
    "\nBuild aborted: missing required env var(s): " + missing.join(", ") + ".\n" +
    "Set them in react-app/.env.local for a local build, or as Vercel build env vars.\n"
  );
  process.exit(1);
}
