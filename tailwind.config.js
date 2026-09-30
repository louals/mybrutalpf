module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // =================================================================
        // CHANGE THIS SINGLE LINE TO CHANGE THE ENTIRE WEBSITE THEME COLOR!
        // Examples:
        // Lime (default): "#a3e635"
        // Cyan / Aqua:    "#00f0ff"
        // Emerald Green:  "#10b981"
        // Electric Pink:  "#ff0055"
        // Purple / Violet:"#a855f7"
        // Gold / Yellow:  "#facc15"
        // Orange / Amber: "#f97316"
        // =================================================================
        lime: {
          400: "#8827e2ff",
        },
        primary: "#0f172a",
        secondary: "#6b21a8",
        accent: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};