import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'terracotta': '#AD5F40',
      'blue': '#3F5E78',
      'green': '#687259',
      'beige': '#DFE0DA',
      'gray-warm': '#948B88',
      'gray-cool': '#AFB5B3',
      'gray-text': '#474747',
      'white': '#FFFFFF',
      'black': '#000000',
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Cardo', 'serif'],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            p: {
              marginTop: '0',
              lineHeight: '2',
            },
            h2: {
              margin: '0',
            },
            ol: {
              'list-style-type': 'decimal',
              'padding-left': '1.5rem',
              'margin-top': '1rem',
              'margin-bottom': '1rem',
              'margin-left': '.5rem',
              'margin-right': '.5rem',

              li: {
                'position': 'relative',
                'padding-left': '.5rem',
                'line-height': '2rem'
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
