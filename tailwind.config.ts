import type { Config } from "tailwindcss";

const COLORS = {
  primary: {
    1: "#0062BD",
    2: "#0085FF",
    3: "#6BB8FF",
    4: "#D3EAFF",
    5: "#ECF6FF",
  },
  secondary: {
    1: "#DE5B0D",
    2: "#FF7A00",
    3: "#FE8C48",
    4: "#F99C64",
  },
  "neutral-1": {
    900: "#1E2B36",
    800: "#1F3B53",
    700: "#475765",
    600: "#617382",
    500: "#8E9BA6",
    400: "#A7B1BA",
    300: "#BCC4CC",
    200: "#D0D7DD",
    100: "#DEE1E4",
  },
  "neutral-2": {
    300: "#DFE7EC",
    200: "#E2E7ED",
    100: "#E9EDF2",
    50: "#F2F4F7",
  },
  "neutral-3": {
    300: "#E3E6E9",
    200: "#EBEDEF",
    100: "#F0F1F3",
    50: "#F8F9FB",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        dvh: "100dvh",
      },
      colors: {
        ...COLORS,
      },
      ringColor: {
        ...COLORS,
      },
      borderColor: {
        ...COLORS,
      },
      placeholderColor: {
        ...COLORS,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "zoom-out": {
          from: {
            opacity: "0%",
            scale: "0%",
          },
          to: {
            opacity: "100%",
            scale: "100%",
          },
        },
        "zoom-in": {
          from: {
            opacity: "100%",
            scale: "100%",
          },
          to: {
            opacity: "0%",
            scale: "0%",
          },
        },
        "fade-top-in": {
          from: {
            opacity: "0%",
            "margin-top": "-500px",
          },
          to: {
            opacity: "100%",
            "margin-top": "0px",
          },
        },
        "fade-top-in-2": {
          from: {
            opacity: "0%",
            "margin-top": "50px",
          },
          to: {
            opacity: "100%",
            "margin-top": "0px",
          },
        },
        "fade-top-out": {
          from: {
            opacity: "100%",
            "margin-top": "0px",
          },
          to: {
            opacity: "0%",
            "margin-top": "-200px",
          },
        },
      },
      animation: {
        zoomIn: "zoom-in 300ms ease-out",
        zoomOut: "zoom-out 300ms ease-out",
        fadeTopIn: "fade-top-in 300ms ease-out",
        fadeTopIn2: "fade-top-in-2 500ms ease-out",
        fadeTopOut: "fade-top-out 300ms ease",
      },
    },
  },
  plugins: [],
};
export default config;
