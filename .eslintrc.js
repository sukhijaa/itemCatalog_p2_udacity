module.exports = {
	"settings": {
		"react": {
			"version": "16.9"
		}
	},

	// Parser
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
			"classes": true,
			"modules": true
		}
	},

	// Environment
	"env": {
		"es6": true,
		"jquery": true,
		"node": true,
		"mocha": true
	},
	"globals": {
		"Event": true,
		"window": true,
		"navigator": true,
		"System": true,
		"document": true,
		"localStorage": true,
		"sessionStorage": true,
		"Image": true,
		"requestAnimationFrame": true,
		"cancelAnimationFrame": true,
		"DEBUG": true,
		"SVGElement": true,
		"FormData": true,
		"DEV": true,
		"Blob": true,
		"XMLHttpRequest": true,
		"URL": true,
		"PunchOutRegistry": true,
		"it": true,
		"describe": true
	},

	// Plugins and configuration extensions
	"plugins": [
		"react",
		"import"
	],
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],

	// RULES
	"rules": {

		/* Possible Errors --------------*/
		"no-empty": 2,
		"no-console": [
			"error",
			{
				"allow": [
					"warn",
					"error"
				]
			}
		],
		"no-cond-assign": [
			2,
			"except-parens"
		],

		/* Variables --------------------*/
		"no-unused-vars": 2,
		"no-use-before-define": 2,
		"no-undef": 2,

		/* Best Practices ---------------*/
		"no-eq-null": 2,
		"eqeqeq": 2,
		"wrap-iife": [
			2,
			"any"
		],
		"no-unused-expressions": 2,
		"no-caller": 2,
		"no-invalid-this": 0,
		"dot-notation": 0,
		"curly": 2,
		"yoda": [1, "never"],
		"no-else-return": 1,

		/* Stylistic Issues -------------*/
		"linebreak-style": 0,
		"no-bitwise": 0,
		"new-cap": [
			2,
			{
				"capIsNewExceptionPattern": "UNSAFE_",
				"capIsNewExceptions": [
					"DataTable",
					"V",
					"DragDropContext",
					"DropTarget",
					"DragSource"
				]
			}
		],
		"quotes": [
			2,
			"single",
			"avoid-escape"
		],
		"jsx-quotes": [
			2,
			"prefer-single"
		],
		"no-plusplus": 0,
		"comma-style": [
			2,
			"last"
		],
		"max-len": [
			1,
			{
				"code": 160,
				"ignorePattern": "^import.*",
				"ignoreComments": true
			}
		],
		"id-match": [
			"error",
			"^(([A-Z_]+)|((UNSAFE_|DEPRECATED_|_+)?[a-zA-Z0-9]+))$", {
				"properties": false,
				"onlyDeclarations": true
			}
		],
		"brace-style": 1,
		"semi": [
			1,
			"always"
		],
		"space-infix-ops": 2,
		"keyword-spacing": 1,
		"comma-spacing": [1, {
			"before": false,
			"after": true
		}],
		"key-spacing": [1, {
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict"
		}],
		"comma-dangle": [1, "always-multiline"],
		"indent": [1, "tab", { "SwitchCase": 1 }],
		"space-before-blocks": 1,
		"object-curly-spacing": [1, "never"],
		"array-bracket-spacing": [1, "never"],
		"space-before-function-paren": [1, {
			"anonymous": "always",
			"named": "never"
		}],
		"space-in-parens": [1, "never"],

		/* ECMAScript 6 -----------------*/
		"prefer-const": 1,
		"arrow-spacing": 1,

		/* Complexity -------------------*/
		"max-statements": [1, {
			"max": 20
		}],
		"max-depth": [1, {
			"max": 3
		}],
		"max-params": [1, {
			"max": 5
		}],
		"complexity": [1, {
			"max": 7
		}],
		"max-lines": [1, {
			"max": 500
		}],
		"max-lines-per-function": [1, {
			"max": 40,
			"skipBlankLines": true,
			"skipComments": true
		}],
		"max-nested-callbacks": [1, {
			"max": 4
		}],


		/* ------------------------------*/
		/* PLUGINS ----------------------*/
		/* ------------------------------*/

		/* Import -----------------------*/
		"import/no-named-as-default": 2,
		"import/imports-first": 2,
		"import/export": 2,
		"import/default": 0,
		"import/no-unresolved": 0,
		"import/no-duplicates": 0,

		/* React -----------------*------*/
		"react/jsx-no-duplicate-props": 1,
		"react/jsx-no-undef": 1,
		"react/jsx-uses-react": 1,
		"react/jsx-uses-vars": 1,
		"react/no-danger": 1,
		"react/no-direct-mutation-state": 1,
		"react/no-unknown-property": 1,
		"react/react-in-jsx-scope": 1,
		"react/self-closing-comp": 1,
		"react/jsx-wrap-multilines": 1,
		"react/prop-types": 1,
		"react/require-default-props": 1,
		"react/forbid-prop-types": 1,
		"react/no-unused-prop-types": 1,
		"react/no-unused-state": 1,
		"react/jsx-closing-bracket-location": [
			1,
			{
				"nonEmpty": "after-props",
				"selfClosing": "after-props"
			}
		],
		"react/jsx-indent-props": [
			1,
			"tab"
		],
		"react/jsx-max-props-per-line": [1, {
			"maximum": 2
		}],
		"react/jsx-tag-spacing": [1, {
			"closingSlash": "never",
			"beforeSelfClosing": "never",
			"afterOpening": "never",
			"beforeClosing": "never"
		}],
		"react/jsx-equals-spacing": [1, "never"],
		"react/jsx-curly-spacing": [1, {"when": "never"}],
		"react/jsx-curly-brace-presence": 1,
		"react/jsx-no-literals": 0,
		"react/jsx-sort-prop-types": 0,
		"react/jsx-sort-props": 0,
		"react/no-did-mount-set-state": 0,
		"react/no-did-update-set-state": 0,
		"react/no-multi-comp": 0,
		"react/no-set-state": 0,
		"react/sort-comp": 0,
		"react/display-name": 0,
		"react/jsx-boolean-value": 0,
	},
	"overrides": [{
		"files": ["*.test.js", "*.test.pact.js", "*.stories.js"],
		"rules": {
			"max-lines-per-function": 0,
			"max-lines": 0,
			"max-statements": 0,
			"max-len": 0,
			"max-nested-callbacks": 0
		}
	}]
}
