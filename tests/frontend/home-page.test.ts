import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../../frontend/components/home.tsx", import.meta.url), "utf8");
const heroSource = readFileSync(new URL("../../frontend/components/hero-canvas.tsx", import.meta.url), "utf8");
const deskPage = readFileSync(new URL("../../frontend/app/desk/page.tsx", import.meta.url), "utf8");
const homePage = readFileSync(new URL("../../frontend/app/page.tsx", import.meta.url), "utf8");

describe("home landing page", () => {
  it("renders the editorial landing at / and keeps the world desk at /desk", () => {
    expect(homePage).toContain("HomeLanding");
    expect(deskPage).toContain("WorldDesk");
  });

  it("links to the world desk and semantic recall without any mock data", () => {
    expect(homeSource).toContain('to="/desk"');
    expect(homeSource).toContain('to="/search"');
    expect(homeSource).toContain("getStats()");
    expect(homeSource.toLowerCase()).not.toContain("mock");
    expect(homeSource.toLowerCase()).not.toContain("fixture");
  });

  it("lists all five settlement outcomes", () => {
    for (const outcome of ["COMPATIBLE", "RETCON_VALID", "BRANCH_ONLY", "CONFLICT", "INSUFFICIENT_CONTEXT"])
      expect(homeSource).toContain(outcome);
  });

  it("gates the live ledger on a configured contract", () => {
    expect(homeSource).toContain("CONTRACT_ADDRESS");
    expect(homeSource).toContain("VITE_LORECHAIN_CONTRACT");
  });

  it("mounts a decorative, lazy-loaded, motion-safe Three.js hero", () => {
    expect(homeSource).toContain("<HeroCanvas />");
    expect(heroSource).toContain('import("three")');
    expect(heroSource).toContain("prefers-reduced-motion");
    expect(heroSource).toContain('aria-hidden="true"');
    expect(heroSource).toContain("getPropertyValue");
  });
});
