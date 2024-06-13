import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import type { Metadata } from 'next';
import './globals.css';

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Arvo%7COswald" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/brands.css" />
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
