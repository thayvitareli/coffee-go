/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#271310",
        "primary-container": "#3e2723",
        "on-primary": "#ffffff",
        surface: "#fcfbf8",
        "on-surface": "#1a1c1a",
        "surface-variant": "#ebeae7",
        "outline-variant": "#c4c2be",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f3f1",
        "surface-container": "#f0efec",
        "surface-container-high": "#e9e8e5",
        "surface-container-highest": "#dedcd9",
        "secondary-container": "#f0e5e3",
        "secondary-fixed-dim": "#d3c8c5",
        "tertiary-fixed": "#94f990",
        "on-tertiary-fixed-variant": "#005313",
      },
      fontFamily: {
        serif: ['"Noto Serif"', "serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "4rem", letterSpacing: "-0.015em" }],
        "headline-md": ["1.75rem", { lineHeight: "2.25rem" }],
        "headline-sm": ["1.5rem", { lineHeight: "2rem" }],
        "label-md": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.05em" }],
      },
      spacing: {
        "10": "3.5rem",
        "24": "8.5rem",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.75rem",
        xl: "1.5rem",
      },
      boxShadow: {
        ambient: "0 8px 24px 0 rgba(26, 28, 26, 0.06)",
        floating: "0 24px 24px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
