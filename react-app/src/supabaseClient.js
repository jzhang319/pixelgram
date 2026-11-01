import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

// A build missing these env vars should still run -- it just loses chat,
// not the whole app. See scripts/check-build-env.js, which fails the
// build loudly for this exact case so it's never silently deployed.
export const supabase = url && key ? createClient(url, key) : null;
