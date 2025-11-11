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
            '.ql-align-center': {
              textAlign: 'center'
            },
            '.ql-align-right': {
              textAlign: 'right'
            },
            '.ql-align-left': {
              textAlign: 'left'
            },
            'ul, ol': {
              paddingLeft: '1.5em',
              marginTop: '0',
              marginBottom: '0',
              listStylePosition: 'outside',
              counterReset: 'item0 item1 item2'
            },

            li: {
              marginBottom: '0.25em',
              marginLeft: '2em'
            },
            'ol > li': {
              listStyleType: 'decimal',
              counterIncrement: 'item0'
            },
            'ol > li::marker': {
              content: 'counter(item0) ". "',
              color: '#474747'
            },
            'ol > li.ql-indent-1': {
              counterIncrement: 'item1',
              counterReset: 'item2'
            },
            'ol > li.ql-indent-1::marker': {
              content: 'counter(item1, lower-alpha) ". "'
            },
            'ol > li.ql-indent-2': {
              counterIncrement: 'item2'
            },
            'ol > li.ql-indent-2::marker': {
              content: 'counter(item2, lower-roman) ". "'
            },
            'ul > li': {
              listStyleType: 'disc'
            },
            'ul > li::marker': {
              color: '#474747'
            },
            '.ql-indent-1': {
              marginLeft: '3em !important'
            },
            '.ql-indent-2': {
              marginLeft: '6em !important'
            },
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
