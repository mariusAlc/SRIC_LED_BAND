module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"@vue/standard",
		"@vue/typescript/recommended"
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"comma-dangle": [
			"error",
			"only-multiline"
		],
		quotes: [
			"error",
			"double"
		],
		semi: [
			"error",
			"always"
		],
		"no-useless-constructor": "off",
		"@typescript-eslint/no-useless-constructor": [
			"error"
		],
		"no-tabs": "off",
		indent: [
			2,
			"tab",
			{
				SwitchCase: 1
			}
		]
	}
};
