import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        am: {
          bg: "#0c1312",
          surface: "#101b19",
          line: "rgba(198, 211, 207, 0.15)",
          text: "#e6f0ed",
          muted: "#9fb0aa",
          primary: "#1f8a5b",
          primaryStrong: "#22a06b",
          silver: "#c7ced1"
        }
      },
      boxShadow: {
        glow: "0 30px 80px rgba(6, 20, 16, 0.65)"
      },
      borderRadius: {
        xl2: "28px"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(198, 211, 207, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(198, 211, 207, 0.12) 1px, transparent 1px)",
        "hero-overlay": "radial-gradient(circle at 20% 20%, rgba(31, 138, 91, 0.4), transparent 55%)"
      },
      animation: {
        scroll: "scroll 30s linear infinite"
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
