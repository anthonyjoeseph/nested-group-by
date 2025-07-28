import { defineConfig } from "eslint/config";

import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ["node_modules/**/*", "dist/**/*", "coverage/**/*"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",
      parserOptions: {},
    },
    extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          printWidth: 120,
        },
      ],

      "@typescript-eslint/no-explicit-any": [0],
    },
  },
]);
