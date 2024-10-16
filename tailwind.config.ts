import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "lightBlue": "#E0F7FA",
        "lightGray": "#F5F5F5",
        "greenMint": "#A5D6A7",
        "graySlate": "#90A4AE",
        "softYellow": "#FFF59D",
        "redSalmon": "#EF9A9A",
        "softBlack": "#333333",
        "darkGray": "#757575",
      },
      fontFamily: {
        "body": ["Open Sans", "sans-serif"]
      },
      borderRadius: {
        xs: "10px",
        sm: "14px",
        md: "20px",
        lg: "28px",
        xl: "30px"
      },
      screens: {
        "phone": {'min':'300px', 'max': '768px'},
        "tablet":  {'min':'768px', 'max': '1024px'},
        "desktop":  {'min':'1024px'},
      }
    }
  },
  fontSize: {
    xs: "16px",
    sm: "18px",
    md: "20px",
    lg: "22px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "36px",
  },
  plugins: [],
};
export default config;
