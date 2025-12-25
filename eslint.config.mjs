// eslint.config.mjs

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**", "dist/**"]),
    prettierConfig,
    prettierPlugin,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "better-tailwindcss": betterTailwind,
            import: importPlugin,
            perfectionist,
            "simple-import-sort": simpleImportSort,
            "sort-keys-fix": sortKeysFix,
        },
        settings: {
            "better-tailwindcss": {
                // Since you are using Tailwind CSS v4, we specify the entry point.
                // Make sure this path points to your main global CSS file.
                entryPoint: "src/app/globals.css",
            },
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "better-tailwindcss/enforce-consistent-line-wrapping": [
                "warn",
                {
                    printWidth: 120,
                    preferSingleLine: true,
                    group: "newLine",
                },
            ],
            "better-tailwindcss/enforce-consistent-class-order": [
                "warn",
                {
                    order: "asc",
                },
            ],
            "better-tailwindcss/enforce-consistent-variable-syntax": [
                "warn",
                {
                    syntax: "shorthand",
                },
            ],
            "better-tailwindcss/enforce-consistent-important-position": [
                "warn",
                {
                    position: "recommended",
                },
            ],
            "better-tailwindcss/no-unnecessary-whitespace": "warn",
            "better-tailwindcss/enforce-shorthand-classes": "warn",
            "better-tailwindcss/no-duplicate-classes": "warn",
            "better-tailwindcss/no-deprecated-classes": "warn",
            "better-tailwindcss/no-conflicting-classes": "warn",
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^\\u0000"],
                        ["^node:"],
                        ["^@?\\w"],
                        ["^(@|@/)(?!.*css$)"],
                        ["^\\.\\.(?!/?$)(?!.*css$)", "^\\.\\./?$(?!.*css$)"],
                        ["^\\./(?=.*/)(?!/?$)(?!.*css$)", "^\\.(?!/?$)(?!.*css$)", "^\\./?$(?!.*css$)"],
                        ["^.+\\.s?css$"],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",
            "import/order": "off",
            "sort-imports": "off",
            "perfectionist/sort-jsx-props": [
                "error",
                {
                    type: "alphabetical",
                    order: "asc",
                    ignoreCase: true,
                    specialCharacters: "keep",
                },
            ],
            "prettier/prettier": "error",
            "consistent-this": "warn",
            "no-duplicate-imports": "error",
            "no-self-compare": "error",
            "no-template-curly-in-string": "error",
            "no-unassigned-vars": "error",
            "no-unmodified-loop-condition": "error",
            "no-unreachable-loop": "error",
            "arrow-body-style": ["warn", "always"],
            "block-scoped-var": "warn",
            camelcase: [
                "error",
                {
                    properties: "always",
                    ignoreDestructuring: false,
                    ignoreImports: true,
                    ignoreGlobals: false,
                },
            ],
            "no-useless-assignment": "error",
            curly: ["error", "all"],
            "default-case": "error",
            "default-case-last": "error",
            "default-param-last": "error",
            "dot-notation": "error",
            eqeqeq: ["error", "always"],
            "func-name-matching": "error",
            "func-names": ["error", "always"],
            "guard-for-in": "error",
            "id-length": [
                "error",
                {
                    min: 0,
                    max: 30,
                },
            ],
            "logical-assignment-operators": ["error", "always"],
            "max-depth": ["error", 5],
            "max-nested-callbacks": ["error", 4],
            "no-alert": "error",
            "no-array-constructor": "error",
            "no-bitwise": "error",
            "no-case-declarations": "error",
            "no-console": "warn",
            "no-delete-var": "error",
            "no-div-regex": "error",
            "no-else-return": "error",
            "no-empty": "error",
            "no-empty-function": "error",
            "no-empty-static-block": "error",
            "no-eq-null": "error",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-boolean-cast": "error",
            "no-global-assign": "error",
            "no-implicit-coercion": "error",
            "no-implied-eval": "error",
            "no-inline-comments": "error",
            "no-invalid-this": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-multi-assign": "error",
            "no-multi-str": "error",
            "no-negated-condition": "error",
            "no-nonoctal-decimal-escape": "error",
            "no-octal": "error",
            "no-octal-escape": "error",
            "no-redeclare": "error",
            "no-regex-spaces": "error",
            "no-restricted-exports": "error",
            "no-restricted-imports": "error",
            "no-restricted-syntax": "error",
            "no-return-assign": "error",
            "no-shadow-restricted-names": "error",
            "no-undef-init": "error",
            "no-unused-labels": "error",
            "no-useless-catch": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-escape": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "no-warning-comments": "error",
            "no-with": "error",
            "operator-assignment": "error",
            "prefer-const": "error",
            "prefer-template": "error",
            "require-yield": "error",
            "sort-keys-fix/sort-keys-fix": [
                "error",
                "asc",
                {
                    caseSensitive: true,
                    natural: false,
                },
            ],
            "sort-vars": [
                "error",
                {
                    ignoreCase: true,
                },
            ],
        },
    },
]);

export default eslintConfig;
