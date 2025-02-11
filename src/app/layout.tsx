import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import '../styles/main.css';

const poppinsFont = Poppins({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  variable: '--font-poppins'
});

const className = `${poppinsFont.variable}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={className}>
      <body>{children}</body>
    </html>
  );
}
