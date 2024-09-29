import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import {
  FontPreloadLinks,
  FontStyleDeclaration,
} from '@/components/fonts/fonts';
import { css } from '../../styled-system/css';

export const metadata: Metadata = {
  title: 'Wordware App',
  description: 'A design for Wordware',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FontPreloadLinks />
      </head>
      <body
        className={css({
          bg: 'scheme1.background',
          color: 'text.primary',
          fontFamily: 'body',
          display: 'flex',
          flexDirection: 'column',
          minH: '100vh',
          padding: '40px',
        })}
      >
        <FontStyleDeclaration />
        {children}
      </body>
    </html>
  );
}
