import type { Config } from "tailwindcss";

console.log("AAAAAAAAAAAAAAAAAAAAAA");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#23E583",
      },
    },
  },
  plugins: [],
};

export default config;
