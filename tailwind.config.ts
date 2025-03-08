// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./app/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//     "*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Safarim colors
        safarim: {
          orange: "#ED5F00",
          blue: "#0060F8",
          green: "#009684",
          lightGreen: "#67E273",
          pink: "#FF79AC",
          black: "#200E32",
          gray: {
            100: "#FDFDFD",
            200: "#F9F9F9",
            300: "#E4E4E4",
            400: "#D9D9D9",
            500: "#C1C1C1",
            600: "#999999",
            700: "#828282",
            800: "#717171",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      fill: ["dark"],
    },
  },
  plugins: ["tailwindcss-animate"],
};
