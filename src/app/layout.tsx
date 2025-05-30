import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import type { Metadata } from 'next';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Simon Karman',
  description: 'Portfolio of Simon Karman',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type='image/x-icon' href="/favicon.ico" />
        <link rel="icon" type='image/png' href="/favicon-16x16.png" />
        <link rel="icon" type='image/png' href="/favicon-32x32.png" />
        <link rel="icon" type='image/png' href="/favicon-96x96.png" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arvo%7COswald&display=swap" />
      </head>
      <body className='antialiased bg-white'>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        {/* The following line is added to ensure a scroll bar is ALWAYS shown */}
        <div className='h-1 bg-darkblue-700'></div>
      </body>
    </html>
  )
  ;
}
