// src/app/layout.js
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Carbon Emissions Calculator</title>
      </head>
      <body className="bg-gray-100 text-gray-800">
        {/* <Header /> */}
        <main className="container mx-auto p-4">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
