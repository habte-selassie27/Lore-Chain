import { beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => { (import.meta.env as Record<string, string | undefined>).VITE_LORECHAIN_CONTRACT = "0xCb4E8279Eff17c734c3eA2e32657691610b3467A"; return undefined; });
const readContract = vi.hoisted(() => vi.fn());
const createClient = vi.hoisted(() => vi.fn(() => ({ readContract })));
const createAccount = vi.hoisted(() => vi.fn(() => { throw new Error("public reads must not create accounts"); }));
vi.mock("genlayer-js", () => ({ createClient, createAccount }));

import { TransactionHashVariant } from "genlayer-js/types";
import { createReadClient } from "../../lib/genlayer/read-client";
import { getStats, getWorld, listWorlds, previewRelated, searchLorechain } from "../../lib/genlayer/contract";

const world = { id: 1, version: 1, branch_count: 1, entry_count: 0, proposal_count: 0, steward: "0xabc", name: "Ember", charter_text: "Charter", charter_url: "", charter_digest: "", created_at: "now" };
const stats = { world_count: 1, branch_count: 1, entry_count: 0, proposal_count: 0, embedding_model: "all-MiniLM-L6-v2", vector_dimensions: 384, max_related: 8, max_page: 50, max_branch_depth: 8 };

describe("lorechain finalized read path", () => {
  beforeEach(() => readContract.mockReset());

  it("uses LATEST_FINAL and creates no wallet account", async () => {
    expect(createReadClient()).toEqual({ readContract });
    expect(createAccount).not.toHaveBeenCalled();
    readContract.mockResolvedValue(stats);
    await getStats();
    expect(readContract.mock.calls[0][0].transactionHashVariant).toBe(TransactionHashVariant.LATEST_FINAL);
    expect(readContract.mock.calls[0][0].account).toBeUndefined();
  });

  it("classifies only exact method-specific domain absence as NOT_FOUND", async () => {
    readContract.mockRejectedValueOnce(new Error("EXPECTED: unknown world"));
    expect(await getWorld(99)).toEqual({ kind: "NOT_FOUND" });
    readContract.mockClear();
    readContract.mockRejectedValueOnce(new Error("contract not found at address")).mockRejectedValueOnce(new Error("contract not found at address")).mockRejectedValueOnce(new Error("contract not found at address"));
    const result = await getStats();
    expect(result.kind).toBe("UNAVAILABLE");
    expect(readContract).toHaveBeenCalledTimes(3);
  });

  it("does not classify transport wording as domain absence", async () => {
    readContract.mockRejectedValueOnce(new Error("transport: not found from gateway")).mockRejectedValueOnce(new Error("transport: not found from gateway")).mockRejectedValueOnce(new Error("transport: not found from gateway"));
    const result = await getWorld(1);
    expect(result.kind).toBe("UNAVAILABLE");
    expect(readContract).toHaveBeenCalledTimes(3);
  });

  it("retries transient failures and then returns finalized data", async () => {
    readContract.mockRejectedValueOnce(new Error("gateway timeout")).mockRejectedValueOnce(new Error("temporary RPC error")).mockResolvedValueOnce(world);
    expect(await getWorld(1)).toEqual({ kind: "AVAILABLE", value: world });
    expect(readContract).toHaveBeenCalledTimes(3);
  });

  it("turns an ID-list snapshot inconsistency into UNAVAILABLE", async () => {
    readContract.mockResolvedValueOnce([1, 2]).mockResolvedValueOnce(world).mockRejectedValueOnce(new Error("EXPECTED: unknown world"));
    const result = await listWorlds();
    expect(result).toEqual({ kind: "UNAVAILABLE", reason: "Lorechain ID list referenced world 2, but its finalized record could not be read." });
  });
});

describe("semantic recall result shape", () => {
  beforeEach(() => readContract.mockReset());

  const rawHit = { entry_id: 1, branch_id: 1, distance: "0.21", title: "The Sundering", statement: "The pact broke.", entity_keys_json: "[\"wardens\"]", time_anchor: "the night of the Sundering" };

  it("labels search results without retrieval_source as VECDB", async () => {
    readContract.mockResolvedValue([rawHit]);
    const result = await searchLorechain(1, 1, "an ancient pact that shattered");
    expect(result).toEqual({ kind: "AVAILABLE", value: [{ ...rawHit, retrieval_source: "VECDB" }] });
  });

  it("still rejects a preview result missing retrieval_source", async () => {
    readContract.mockResolvedValueOnce([rawHit]);
    expect((await previewRelated(1)).kind).toBe("UNAVAILABLE");
  });

  it("rejects an unknown retrieval_source value", async () => {
    readContract.mockResolvedValueOnce([{ ...rawHit, retrieval_source: "BROKEN" }]);
    expect((await searchLorechain(1, 1, "anything")).kind).toBe("UNAVAILABLE");
  });
});
