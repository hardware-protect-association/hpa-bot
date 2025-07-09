import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import markdown from "@eslint/markdown"
import { defineConfig } from "eslint/config"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import { includeIgnoreFile } from "@eslint/compat"
import { fileURLToPath } from "node:url"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  eslintPluginPrettier,
  { rules: { "markdown/no-missing-label-refs": "off" } },
])
