import { list } from 'postcss';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      terracotta: '#AD5F40',
      blue: '#3F5E78',
      green: '#687259',
      beige: '#DFE0DA',
      'gray-warm': '#948B88',
      'gray-cool': '#AFB5B3',
      'gray-text': '#474747',
      white: '#FFFFFF',
      black: '#000000'
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Cardo', 'serif']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            p: {
              marginTop: '0',
              marginBottom: '0',
              lineHeight: '2'
            },
            // h1: {
            //   margin: '0'
            // },
            // h2: {
            //   margin: '0'
            // },
            // Quill alignment classes
            '.ql-align-center': {
              textAlign: 'center'
            },
            '.ql-align-right': {
              textAlign: 'right'
            },
            '.ql-align-left': {
              textAlign: 'left'
            },

            // Base lists with proper padding
            'ul, ol': {
              paddingLeft: '1.5em',
              marginTop: '0',
              marginBottom: '0',
              listStylePosition: 'outside'
            },

            li: {
              marginBottom: '0.25em',
              marginLeft: '2em'
            },

            // Ordered list number styles
            'ol > li': {
              listStyleType: 'decimal'
            },
            'ol > li::marker': {
              color: '#474747'
            },
            'ol > li.ql-indent-1': {
              listStyleType: 'lower-alpha'
            },
            'ol > li.ql-indent-2': {
              listStyleType: 'lower-roman'
            },
            'ol > li.ql-indent-3': {
              listStyleType: 'decimal'
            },
            'ol > li.ql-indent-4': {
              listStyleType: 'lower-alpha'
            },

            // Unordered lists
            'ul > li': {
              listStyleType: 'disc'
            },
            'ul > li::marker': {
              color: '#474747'
            },

            // Quill indent classes - ADD EXTRA PADDING for each level
            '.ql-indent-1': {
              marginLeft: '3em !important'
            },
            '.ql-indent-2': {
              marginLeft: '6em !important'
            },
            '.ql-indent-3': {
              marginLeft: '9em !important'
            },
            '.ql-indent-4': {
              marginLeft: '12em !important'
            },
            '.ql-indent-5': {
              marginLeft: '15em !important'
            },
            '.ql-indent-6': {
              marginLeft: '18em !important'
            },
            '.ql-indent-7': {
              marginLeft: '21em !important'
            },
            '.ql-indent-8': {
              marginLeft: '24em !important'
            },

            // Link styling
            a: {
              color: '#1D4ED8',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1E3A8A'
              }
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
