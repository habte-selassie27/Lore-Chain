import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: { globals: globals.node },
  },
  globalIgnores(["dist/**", "node_modules/**", ".venv/**", ".pytest_cache/**", "artifacts/**", ".node_modules-recovery/**", "coverage/**"]),
]);
