/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#2874f0",
        "theme-black": "#000000",
        "theme-white": "#FFFFFF",
        "theme-grey": "#F5F5F5",
        "theme-red": "#DB4444",
        "theme-border": "#d9d9d9",
        "theme-green": "#388E3C",
        "theme-golden": "#ffa41c",
        "theme-text-grey": "#6b7280",
        "theme-bg-green": "#e7f8ec",
        "theme-bg-red": "#fde8e8",
        "theme-border-red": "#fa9090",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      Msm: "320px",
      sm: "375px",
      tsm: "410px",
      lsm: "530px",
      msm: "640px",
      md: "768px",
      mdb: "900px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
