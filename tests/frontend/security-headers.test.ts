import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import viteConfig from "../../vite.config";

const vercelConfig = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8")) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
  rewrites: { source: string; destination: string }[];
};

function headerMap(headers: { key: string; value: string }[]) {
  return new Map(headers.map((header) => [header.key, header.value]));
}

function expectSafeHeaders(headers: Map<string, string>) {
  expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
  expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  expect(headers.get("X-Frame-Options")).toBe("DENY");
  expect(headers.get("Permissions-Policy")).toContain("camera=()");
}

describe("production security headers", () => {
  it("sets safe non-CSP headers on every hosted route", () => {
    const [rule] = vercelConfig.headers;
    expect(rule.source).toBe("/(.*)");
    expectSafeHeaders(headerMap(rule.headers));
  });

  it("keeps the Vite dev and preview server headers identical", () => {
    const devHeaders = headerMap(
      Object.entries(viteConfig.server?.headers ?? {}).map(([key, value]) => ({ key, value: String(value) })),
    );
    const previewHeaders = headerMap(
      Object.entries(viteConfig.preview?.headers ?? {}).map(([key, value]) => ({ key, value: String(value) })),
    );
    expect(devHeaders.size).toBeGreaterThan(0);
    expectSafeHeaders(devHeaders);
    expect(previewHeaders).toEqual(devHeaders);
  });

  it("rewrites unknown paths to the SPA entry so deep links resolve", () => {
    expect(vercelConfig.rewrites).toEqual([{ source: "/(.*)", destination: "/index.html" }]);
  });
});
