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
            background: { value: 'rgba(14, 19, 17, 1.0)' },
            primaryContainer: { value: 'rgba(16, 23, 21, 0.4)' },
            secondaryContainer: { value: 'rgba(21, 27, 25, 0.5)' },
            tertiaryContainer: { value: 'rgba(26, 32, 30, 0.6)' },
            border: { value: 'rgba(42, 60, 57, 0.5)' },
            hover: { value: 'rgba(101, 146, 139, 0.2)' },
            active: { value: 'rgba(101, 146, 139, 0.1)' },
          },
          scheme2: {
            background: { value: 'rgba(18, 18, 18, 1.0)' },
            primaryContainer: { value: 'rgba(20, 20, 20, 1.0)' },
            secondaryContainer: { value: 'rgba(24, 24, 24, 1.0)' },
            tertiaryContainer: { value: 'rgba(28, 28, 28, 1.0)' },
            border: { value: 'rgba(58, 58, 58, 1.0)' },
            hover: { value: 'rgba(224, 224, 224, 0.2)' },
            active: { value: 'rgba(224, 224, 224, 0.1)' },
          },

          // Text colors
          text: {
            primary: { value: 'rgba(200, 210, 205, 1.0)' },
            secondary: { value: 'rgba(150, 160, 155, 1.0)' },
            primaryLight: { value: 'rgba(20, 20, 20, 1.0)' },
            secondaryLight: { value: 'rgba(28, 28, 28, 1.0)' },
          },

          // Accent colors (teal/green shades)
          accent: {
            5: { value: 'rgba(32, 201, 151, 0.05)' },
            10: { value: 'rgba(32, 201, 151, 0.1)' },
            20: { value: 'rgba(32, 201, 151, 0.2)' },
            100: { value: 'rgba(32, 201, 151, 1.0)' },
            200: { value: 'rgba(93, 227, 181, 1.0)' },
            300: { value: 'rgba(59, 209, 162, 1.0)' },
            400: { value: 'rgba(24, 143, 110, 1.0)' },
            500: { value: 'rgba(15, 125, 86, 1.0)' },
          },

          // Red colors
          red: {
            20: { value: 'rgba(255, 76, 76, 0.2)' },
            50: { value: 'rgba(255, 76, 76, 0.5)' },
            100: { value: 'rgba(255, 76, 76, 1.0)' },
            200: { value: 'rgba(255, 127, 127, 1.0)' },
            300: { value: 'rgba(178, 34, 34, 1.0)' },
          },
        },
        gradients: {
          teal: {
            100: {
              value:
                'linear-gradient(96deg, rgba(0, 255, 127, 1.0) -8.93%, rgba(32, 201, 151, 1.0) 25.09%, rgba(0, 128, 128, 1.0) 137.77%)',
            },
            50: {
              value:
                'linear-gradient(96deg, rgba(0, 255, 127, 0.5) -8.93%, rgba(32, 201, 151, 0.5) 25.09%, rgba(0, 128, 128, 0.5) 137.77%)',
            },
            20: {
              value:
                'linear-gradient(96deg, rgba(0, 255, 127, 0.2) -8.93%, rgba(32, 201, 151, 0.2) 25.09%, rgba(0, 128, 128, 0.2) 137.77%)',
            },
            10: {
              value:
                'linear-gradient(96deg, rgba(0, 255, 127, 0.1) -8.93%, rgba(32, 201, 151, 0.1) 25.09%, rgba(0, 128, 128, 0.1) 137.77%)',
            },
            5: {
              value:
                'linear-gradient(96deg, rgba(0, 255, 127, 0.05) -8.93%, rgba(32, 201, 151, 0.05) 25.09%, rgba(0, 128, 128, 0.05) 137.77%)',
            },
          },
          red: {
            100: {
              value:
                'linear-gradient(104deg, rgba(255, 127, 127, 1.0) -14.17%, rgba(255, 76, 76, 1.0) 41.16%, rgba(178, 34, 34, 1.0) 98.06%)',
            },
            50: {
              value:
                'linear-gradient(104deg, rgba(255, 127, 127, 0.5) -14.17%, rgba(255, 76, 76, 0.5) 41.16%, rgba(178, 34, 34, 0.5) 98.06%)',
            },
            20: {
              value:
                'linear-gradient(104deg, rgba(255, 127, 127, 0.2) -14.17%, rgba(255, 76, 76, 0.2) 41.16%, rgba(178, 34, 34, 0.2) 98.06%)',
            },
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
    keyframes: {
      figure8_1: {
        '0%': { transform: 'translate(0, 0)', opacity: 0.2 },
        '12.5%': { transform: 'translate(200px, -100px)', opacity: 0.3 },
        '25%': { transform: 'translate(400px, 0)', opacity: 0.4 },
        '37.5%': { transform: 'translate(200px, 100px)', opacity: 0.3 },
        '50%': { transform: 'translate(0, 0)', opacity: 0.2 },
        '62.5%': { transform: 'translate(-200px, -100px)', opacity: 0.3 },
        '75%': { transform: 'translate(-400px, 0)', opacity: 0.4 },
        '87.5%': { transform: 'translate(-200px, 100px)', opacity: 0.3 },
        '100%': { transform: 'translate(0, 0)', opacity: 0.2 },
      },
      figure8_2: {
        '0%': { transform: 'translate(0, 0)', opacity: 0.1 },
        '12.5%': { transform: 'translate(-100px, 50px)', opacity: 0.15 },
        '25%': { transform: 'translate(-200px, 0)', opacity: 0.2 },
        '37.5%': { transform: 'translate(-100px, -50px)', opacity: 0.15 },
        '50%': { transform: 'translate(0, 0)', opacity: 0.1 },
        '62.5%': { transform: 'translate(100px, 50px)', opacity: 0.15 },
        '75%': { transform: 'translate(200px, 0)', opacity: 0.2 },
        '87.5%': { transform: 'translate(100px, -50px)', opacity: 0.15 },
        '100%': { transform: 'translate(0, 0)', opacity: 0.1 },
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
          letterSpacing: '0.01em',
        },
      },
      heading2: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '32px',
          lineHeight: '90%',
          letterSpacing: '0.02em',
        },
      },
      heading3: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '90%',
          letterSpacing: '0.02em',
        },
      },
      heading4: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0.03em',
        },
      },
      heading5: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: 'regular',
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0.04em',
        },
      },
      heading6: {
        description: 'Heading text style (PP Nikkei Pacific)',
        value: {
          fontFamily: 'heading',
          fontWeight: 'regular',
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '0.06em',
        },
      },
      body1: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '24px',
          lineHeight: '100%',
          letterSpacing: '-0.01em',
        },
      },
      body2: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '32px',
          lineHeight: '100%',
          letterSpacing: '0em',
        },
      },
      body3: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0em',
        },
      },
      body4: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0.02em',
        },
      },
      body5: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '100%',
          letterSpacing: '0.02em',
        },
      },
      body6: {
        description: 'Body text style (PP Neue Montreal)',
        value: {
          fontFamily: 'body',
          fontWeight: '400',
          fontSize: '10px',
          lineHeight: '100%',
          letterSpacing: '0.03em',
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
