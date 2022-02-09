module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
