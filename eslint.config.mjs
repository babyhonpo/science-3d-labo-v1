import { fixupConfigRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
    },
    {
        ignores: ["**/dist", "**/.eslintrc.cjs"],
    }, ...fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    )), {
        plugins: {
            "react-refresh": reactRefresh,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2020, // ES2020のグローバル変数
            },

            parser: tsParser,
            ecmaVersion: 2020, // ES2020を指定
            sourceType: "module", // モジュール形成
        },

        rules: {
            "react-refresh/only-export-components": [
                "warn",
                {allowConstantExport: true,}
            ],
        },
    }
];