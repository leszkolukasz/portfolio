/** @type {import("prettier").Config} */
module.exports = {
  ...require("prettier-config-standard"),
  // pluginSearchDirs: [__dirname],
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss"
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      }
    },
  ],
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  printWidth: 100
}
