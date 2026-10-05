import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readRecallSnapshot, RECALL_SNAPSHOT_KEY } from "../../frontend/components/views";

const viewsSource = readFileSync(new URL("../../frontend/components/views.tsx", import.meta.url), "utf8");

function stubStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, String(value)),
    },
  });
  return store;
}

describe("semantic recall persistence", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns undefined when nothing is stored or storage is broken", () => {
    stubStorage();
    expect(readRecallSnapshot()).toBeUndefined();
    stubStorage({ [RECALL_SNAPSHOT_KEY]: "{not json" });
    expect(readRecallSnapshot()).toBeUndefined();
  });

  it("restores a well-formed snapshot with recall history", () => {
    const run = { at: "2026-10-05T00:00:00.000Z", world: 3, branch: 2, query: "an ancient pact", outcome: { kind: "AVAILABLE", value: [{ entry_id: 1, statement: "The pact broke." }] } };
    stubStorage({
      [RECALL_SNAPSHOT_KEY]: JSON.stringify({ world: 3, branch: 2, query: "an ancient pact", history: [run] }),
    });
    expect(readRecallSnapshot()).toEqual({ world: 3, branch: 2, query: "an ancient pact", history: [run] });
  });

  it("drops invalid fields and malformed history entries", () => {
    stubStorage({ [RECALL_SNAPSHOT_KEY]: JSON.stringify({ world: "nope", history: [{ entry_id: 1 }] }) });
    expect(readRecallSnapshot()).toEqual({ world: undefined, branch: undefined, query: undefined, history: [] });
  });

  it("keeps a bounded recall history with clear control and a pending guard", () => {
    expect(viewsSource).toContain("const MAX_RECALL_HISTORY = 20");
    expect(viewsSource).toContain(".slice(0, MAX_RECALL_HISTORY)");
    expect(viewsSource).toContain("Clear history");
    expect(viewsSource).toContain("if (pending || !world || !branch || !q.trim()) return;");
  });
});
