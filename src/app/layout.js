// src/app/layout.js
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Roboto } from 'next/font/google';
// import localFont from 'next/font/local'
import './styles/global.scss';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
});

// const pretendard = localFont({
//   src: './fonts/PretendardVariable.woff2',
//   display: 'swap',
//   weight: ['400','500', '600', '700', '800'],
// })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Carbon Emissions Calculator</title>
      </head>
      <body className={roboto.className}>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
