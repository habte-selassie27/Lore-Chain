import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const css = readFileSync(fileURLToPath(new URL("../../frontend/app/globals.css", import.meta.url)), "utf8");
const html = readFileSync(fileURLToPath(new URL("../../index.html", import.meta.url)), "utf8");
const shell = readFileSync(fileURLToPath(new URL("../../frontend/components/app-shell.tsx", import.meta.url)), "utf8");

const block = (selector: string) => css.match(new RegExp(`${selector.replace(/[[\]]/g, "\\$&")}\\{([^}]*)\\}`))?.[1] ?? "";
const tokens = (body: string) => [...body.matchAll(/--([\w-]+)\s*:([^;}]*)/g)].map((m) => ({ name: m[1], value: m[2].trim() }));

const root = tokens(block(":root"));
const dark = tokens(block("[data-theme=dark]"));
const colorTokens = (list: { name: string; value: string }[]) => list.filter((t) => /^#|rgba?\(/.test(t.value));

describe("theme tokens", () => {
  it("keeps the light manuscript identity declared in :root", () => {
    const byName = new Map(root.map((t) => [t.name, t.value]));
    expect(byName.get("paper")).toBe("#eef3f6");
    expect(byName.get("ink")).toBe("#10181e");
    expect(byName.get("vermilion")).toBe("#0e5e8a");
    expect(byName.get("olive")).toBe("#5e8a6e");
    expect(byName.get("charcoal")).toBe("#4e6470");
  });

  it("overrides every color token in the dark theme block", () => {
    const darkNames = new Set(dark.map((t) => t.name));
    const lightColors = colorTokens(root);
    expect(lightColors.length).toBeGreaterThan(0);
    const missing = lightColors.filter((t) => !darkNames.has(t.name)).map((t) => t.name);
    expect(missing).toEqual([]);
    const darkByName = new Map(dark.map((t) => [t.name, t.value]));
    const unchanged = colorTokens(root).filter((t) => darkByName.get(t.name) === t.value).map((t) => t.name);
    expect(unchanged).toEqual([]);
  });

  it("leaves no hard-coded colors outside the theme blocks", () => {
    const rest = css.replace(":root{", ":root{--__root:0;").replace("[data-theme=dark]{", "[data-theme=dark]{--__dark:0;");
    const outside = rest
      .replace(/:root\{--__root:0;[^}]*\}/, "")
      .replace(/\[data-theme=dark\]\{--__dark:0;[^}]*\}/, "");
    expect(outside).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgba?\(/);
  });

  it("bootstraps the persisted theme before first paint and toggles it from the masthead", () => {
    expect(html).toContain('localStorage.getItem("lorechain.theme")');
    expect(html).toContain("(prefers-color-scheme: dark)");
    expect(html).toContain("document.documentElement.dataset.theme");
    expect(shell).toContain('THEME_KEY="lorechain.theme"');
    expect(shell).toContain("document.documentElement.dataset.theme=theme");
    expect(shell).toContain('className="theme-toggle"');
  });
});
