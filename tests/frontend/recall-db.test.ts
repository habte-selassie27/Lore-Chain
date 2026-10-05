import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { auth, createClient, from } = vi.hoisted(() => {
  const auth = { getSession: vi.fn(), signInWithWeb3: vi.fn() };
  const from = vi.fn();
  const createClient = vi.fn(() => ({ auth, from }));
  return { auth, createClient, from };
});
vi.mock("@supabase/supabase-js", () => ({ createClient }));

vi.hoisted(() => {
  (import.meta.env as Record<string, string | undefined>).VITE_SUPABASE_URL = "https://example.supabase.co";
  (import.meta.env as Record<string, string | undefined>).VITE_SUPABASE_ANON_KEY = "anon";
  return undefined;
});

import { clearRecallRuns, ensureRecallDbSession, loadRecallRuns, recallDbClient, recallDbConfigured, saveRecallRun } from "../../lib/supabase/recall-store";

const viewsSource = readFileSync(new URL("../../frontend/components/views.tsx", import.meta.url), "utf8");

describe("recall supabase store", () => {
  beforeEach(() => {
    auth.getSession.mockReset();
    auth.signInWithWeb3.mockReset();
    from.mockReset();
  });

  it("is configured from env and reuses one client", () => {
    expect(recallDbConfigured).toBe(true);
    expect(recallDbClient()).toBe(recallDbClient());
    expect(createClient).toHaveBeenCalledWith("https://example.supabase.co", "anon");
  });

  it("reuses an existing session without re-signing", async () => {
    auth.getSession.mockResolvedValue({ data: { session: { user: { id: "u" } } } });
    expect(await ensureRecallDbSession()).toBeTruthy();
    expect(auth.signInWithWeb3).not.toHaveBeenCalled();
  });

  it("signs in with the injected wallet when no session exists", async () => {
    auth.getSession.mockResolvedValue({ data: { session: null } });
    auth.signInWithWeb3.mockResolvedValue({ error: null });
    expect(await ensureRecallDbSession()).toBeTruthy();
    expect(auth.signInWithWeb3).toHaveBeenCalledWith({ chain: "ethereum", statement: "LoreChain recall history sign-in" });
  });

  it("returns undefined when web3 sign-in is rejected or unavailable", async () => {
    auth.getSession.mockResolvedValue({ data: { session: null } });
    auth.signInWithWeb3.mockResolvedValue({ error: new Error("rejected") });
    expect(await ensureRecallDbSession()).toBeUndefined();
    auth.getSession.mockRejectedValue(new Error("network"));
    expect(await ensureRecallDbSession()).toBeUndefined();
  });

  it("saves, loads and clears recall runs", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const limit = vi.fn().mockResolvedValue({ data: [{ world_id: 1, query: "q" }], error: null });
    const order = vi.fn(() => ({ limit }));
    const select = vi.fn(() => ({ order }));
    const not = vi.fn().mockResolvedValue({});
    from.mockImplementation(() => ({ select, insert, delete: () => ({ not }) }));
    const db = recallDbClient()!;
    await saveRecallRun(db, { wallet_address: "0xabc", world_id: 1, branch_id: 1, query: "q", outcome: { kind: "AVAILABLE", value: [] } });
    expect(from).toHaveBeenCalledWith("recall_runs");
    expect(insert.mock.calls[0][0]).toMatchObject({ wallet_address: "0xabc", world_name: null, branch_name: null });
    expect(await loadRecallRuns(db, 20)).toEqual([{ world_id: 1, query: "q" }]);
    await clearRecallRuns(db);
    expect(not).toHaveBeenCalledWith("id", "is", null);
  });

  it("wires the db into the recall view with an honest browser fallback", () => {
    expect(viewsSource).toContain("ensureRecallDbSession()");
    expect(viewsSource).toContain("saveRecallRun(activeDb");
    expect(viewsSource).toContain("clearRecallRuns(activeDb)");
    expect(viewsSource).toContain("synced to your account");
    expect(viewsSource).toContain("kept in this browser");
  });
});
