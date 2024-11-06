// src/app/layout.js
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Roboto } from 'next/font/google';
import './styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Carbon Emissions Calculator</title>
      </head>
      <body className={roboto.className}>
        {/* <Header /> */}
        <main className="">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
