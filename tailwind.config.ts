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
            '.ql-align-center': {
              textAlign: 'center',
            },
            '.ql-align-right': {
              textAlign: 'right',
            },
            '.ql-align-left': {
              textAlign: 'left',
            },
            '.ql-indent-1': {
              paddingLeft: '2em',
            },
            '.ql-indent-2': {
              paddingLeft: '4em',
            },
            '.ql-list': {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            '.ql-list-ordered': {
              listStyleType: 'decimal',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '1.5em',
            },
            '.ql-list-unordered': {
              listStyleType: 'disc',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '1.5em',
            },
            '.ql-list li': {
              marginBottom: '0.25em',
            },
            'a': {
              color: '#1D4ED8',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1E3A8A',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
