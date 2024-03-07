import type { Config } from "tailwindcss";

const COLORS = {
  success: {
    100: "#E9F6EC",
    200: "#DFFCE6",
    300: "#88CE97",
    400: "#28A745",
    500: "#20913A",
  },
  info: {
    100: "#E5F2FF",
    200: "#CCE7FF",
    300: "#72B7FB",
    400: "#2395FF",
    500: "#0184FF",
  },
  warning: {
    100: "#FEF6E9",
    200: "#FCF0CB",
    300: "#F8CE8B",
    400: "#FFC107",
    500: "#F3A72E",
  },
  error: {
    100: "#FDEBE9",
    200: "#FCE6EA",
    300: "#F17585",
    400: "#EB3B5B",
    500: "#DA072D",
  },
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
  tertiary: {
    1: "#005F59",
    2: "#00A198",
    3: "#A4EEEA",
    4: "#E3F5F4",
    5: "#F8FBFB",
  },
  quaternary: {
    1: "#D98905",
    2: "#ED970B",
    3: "#FFA004",
    4: "#FFB741",
    5: "#FDC871",
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
      fontSize: {
        "heading-1": ["48px", "56px"],
        "heading-2": ["36px", "44pc"],
        "heading-3": ["28px", "40px"],
        "heading-4": ["24px", "32px"],
        "heading-5": ["22px", "32px"],
        "heading-6": ["18px", "28px"],
        "heading-7": ["16px", "24px"],
        "body-1": ["18px", "28px"],
        "body-2": ["16px", "24px"],
        "body-3": ["14px", "18px"],
        caption: ["12px", "16px"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-top-in": {
          from: {
            opacity: "0%",
            "margin-top": "-200px",
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
        fadeTopIn: "fade-top-in 300ms ease-out",
        fadeTopOut: "fade-top-out 300ms ease",
      },
    },
  },
  plugins: [],
};
export default config;
