import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    '.src/components/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          // Two complete sets of background and container colors
          scheme1: {
            background: { value: 'rgba(18, 18, 18, 1.0)' },
            primaryContainer: { value: 'rgba(20, 20, 20, 1.0)' },
            secondaryContainer: { value: 'rgba(24, 24, 24, 1.0)' },
            tertiaryContainer: { value: 'rgba(28, 28, 28, 1.0)' },
            border: { value: 'rgba(58, 58, 58, 1.0)' },
          },
          scheme2: {
            background: { value: 'rgba(14, 19, 17, 1.0)' },
            primaryContainer: { value: 'rgba(16, 23, 21, 1.0)' },
            secondaryContainer: { value: 'rgba(21, 27, 25, 1.0)' },
            tertiaryContainer: { value: 'rgba(26, 32, 30, 1.0)' },
            border: { value: 'rgba(42, 60, 57, 1.0)' },
          },
          hover: { value: 'rgba(224, 224, 224, 0.1)' },
          active: { value: 'rgba(224, 224, 224, 0.05)' },

          // Text colors
          text: {
            primary: { value: 'rgba(224, 224, 224, 1.0)' },
            secondary: { value: 'rgba(176, 176, 176, 1.0)' },
          },

          // Accent colors (teal/green shades)
          accent: {
            100: { value: 'rgba(32, 201, 151, 1.0)' },
            200: { value: 'rgba(93, 227, 181, 1.0)' },
            300: { value: 'rgba(59, 209, 162, 1.0)' },
            400: { value: 'rgba(24, 143, 110, 1.0)' },
            500: { value: 'rgba(15, 125, 86, 1.0)' },
          },

          // Red colors
          red: {
            100: { value: 'rgba(255, 76, 76, 1.0)' },
            200: { value: 'rgba(255, 127, 127, 1.0)' },
            300: { value: 'rgba(178, 34, 34, 1.0)' },
          },
        },
        gradients: {
          teal100: {
            value:
              'linear-gradient(96deg, rgba(0, 255, 127, 1.0) -8.93%, rgba(32, 201, 151, 1.0) 25.09%, rgba(0, 128, 128, 1.0) 137.77%)',
          },
          teal50: {
            value:
              'linear-gradient(96deg, rgba(0, 255, 127, 0.5) -8.93%, rgba(32, 201, 151, 0.5) 25.09%, rgba(0, 128, 128, 0.5) 137.77%)',
          },
          red: {
            value:
              'linear-gradient(104deg, rgba(255, 127, 127, <alpha-value>) -14.17%, rgba(255, 76, 76, <alpha-value>) 41.16%, rgba(178, 34, 34, <alpha-value>) 98.06%)',
          },
        },
        fonts: {
          heading: {
            value: 'var(--font-pp-nikkei-pacific-regular)',
          },
          body: {
            value: 'var(--font-pp-neue-montreal-regular)',
          },
        },
      },
    },
    textStyles: {
      heading1: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '40px',
          lineHeight: '90%',
          letterSpacing: '1%',
        },
      },
      heading2: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '32px',
          lineHeight: '90%',
          letterSpacing: '2%',
        },
      },
      heading3: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '90%',
          letterSpacing: '2%',
        },
      },
      heading4: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '3%',
        },
      },
      heading5: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: 'regular',
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '3%',
        },
      },
      heading6: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: 'regular',
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '4%',
        },
      },
      body1: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '100%',
          letterSpacing: '-1%',
        },
      },
      body2: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '32px',
          lineHeight: '100%',
          letterSpacing: '0%',
        },
      },
      body3: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0%',
        },
      },
      body4: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '2%',
        },
      },
      body5: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '2%',
        },
      },
      body6: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '10px',
          lineHeight: '100%',
          letterSpacing: '3%',
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
