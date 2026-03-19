import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

export default [
	{ plugins: {
		"@stylistic": stylistic
	},
	rules: {
		"@stylistic/object-curly-spacing": ["error", "always"],
		"@stylistic/array-bracket-spacing": ["error", "never"],
		"@stylistic/arrow-spacing": ["error", { "before": true, "after": true }],
		"@stylistic/key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
		"@stylistic/no-multi-spaces": "error",
		"@stylistic/space-before-blocks": "error",
		"@stylistic/keyword-spacing": ["error", { "before": true, "after": true }]
	} },
	js.configs.recommended,
	{ languageOptions: {
		globals: {
			...globals.node,
		},
	},
	rules: {
		"indent": ["error", "tab"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"no-console": "off",
		"no-unused-expressions": "error",
		"no-unused-vars": "error",
		"linebreak-style": "off",
	},
	},
];