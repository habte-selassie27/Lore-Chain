import {fileURLToPath} from "node:url";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-Frame-Options": "DENY",
};

export default defineConfig({
  plugins: [react()],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  resolve: {alias: {"@": fileURLToPath(new URL("./", import.meta.url))}},
  server: {headers: securityHeaders},
  preview: {headers: securityHeaders},
});
