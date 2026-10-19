/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        surface: "#111113",
        border: "#1F1F23",
        text: "#EDEDED",
        muted: "#8A8A93",
        accent: {
          DEFAULT: "#7C8CFF",
          muted: "rgba(124, 140, 255, 0.4)",
          subtle: "rgba(124, 140, 255, 0.15)",
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}
