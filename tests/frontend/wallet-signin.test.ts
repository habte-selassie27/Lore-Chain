import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const provider = readFileSync(fileURLToPath(new URL("../../frontend/components/wallet-provider.tsx", import.meta.url)), "utf8");
const shell = readFileSync(fileURLToPath(new URL("../../frontend/components/app-shell.tsx", import.meta.url)), "utf8");
const session = readFileSync(fileURLToPath(new URL("../../lib/wallet-session.ts", import.meta.url)), "utf8");

describe("wallet sign-in wiring", () => {
  it("publishes the session signature on the provider context", () => {
    expect(provider).toContain("signature: wallet.signature");
    expect(provider).toContain("signature?: string");
  });

  it("keeps the masthead in the signed-in state only for address plus signature", () => {
    expect(shell).toContain("w.address&&w.signature");
    expect(shell).toContain('"Sign in with wallet"');
  });

  it("persists, restores and clears the signature in the wallet session", () => {
    expect(session).toContain("SIGNED_IN_KEY");
    expect(provider).toContain("storedSignature(");
    expect(provider).toContain("storeSignature(");
    expect(provider).toContain("clearSignature()");
    expect(provider).toContain("personal_sign");
  });
});
