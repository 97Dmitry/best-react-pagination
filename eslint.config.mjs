import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "demo/dist/"] },
  {
    files: ["lib/**/*.{ts,tsx}", "demo/src/**/*.{ts,tsx}", "e2e/**/*.ts", "*.config.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
);
