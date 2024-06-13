import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'darkblue': {
          '100': '#52657e',
          '200': '#394f6b',
          '300': '#203959',
          '400': '#082447',
          '500': '#07203f',
          '600': '#061c38',
          '700': '#051931',
          '800': '#04152a',
          '900': '#041223',
        },
      },
      borderWidth: {
        '16': '16px',
      },
      spacing: {
        '1/3': '33%',
        '1/4': '25%',
        '1/5': '20%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      height: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '30rem',
      },
      width: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '30rem',
      },
    },
  },
  variants: {
    padding: [ 'responsive', 'hover' ],
    text: [ 'responsive' ],
  },
  plugins: [],
};
export default config;
