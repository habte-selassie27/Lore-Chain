import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ReadResult, RelatedLorechain } from "@/lib/types";

export type RecallRunRecord = {
  id?: string;
  wallet_address: string;
  world_id: number;
  world_name?: string;
  branch_id: number;
  branch_name?: string;
  query: string;
  outcome: ReadResult<RelatedLorechain[]>;
  created_at?: string;
};

const env = import.meta.env as Record<string, string | undefined>;
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

export const recallDbConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const TABLE = "recall_runs";
let client: SupabaseClient | undefined;

export function recallDbClient(): SupabaseClient | undefined {
  if (!recallDbConfigured) return undefined;
  client ??= createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
  return client;
}

export async function ensureRecallDbSession(): Promise<SupabaseClient | undefined> {
  const db = recallDbClient();
  if (!db) return undefined;
  try {
    const { data } = await db.auth.getSession();
    if (data.session) return db;
    const { error } = await db.auth.signInWithWeb3({ chain: "ethereum", statement: "LoreChain recall history sign-in" });
    return error ? undefined : db;
  } catch {
    return undefined;
  }
}

export async function loadRecallRuns(db: SupabaseClient, limit: number): Promise<RecallRunRecord[] | undefined> {
  try {
    const { data, error } = await db
      .from(TABLE)
      .select("id,wallet_address,world_id,world_name,branch_id,branch_name,query,outcome,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return undefined;
    return (data ?? []) as RecallRunRecord[];
  } catch {
    return undefined;
  }
}

export async function saveRecallRun(db: SupabaseClient, run: RecallRunRecord): Promise<void> {
  try {
    await db.from(TABLE).insert({
      wallet_address: run.wallet_address,
      world_id: run.world_id,
      world_name: run.world_name ?? null,
      branch_id: run.branch_id,
      branch_name: run.branch_name ?? null,
      query: run.query,
      outcome: run.outcome,
    });
  } catch {
    // persistence is best-effort; local history already reflects the run
  }
}

export async function clearRecallRuns(db: SupabaseClient): Promise<void> {
  try {
    await db.from(TABLE).delete().not("id", "is", null);
  } catch {
    // persistence is best-effort; local history is already cleared
  }
}
