// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Carbon Emissions Calculator</title>
      </head>
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-white shadow p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Carbon Emissions Calculator</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-white shadow p-4 mt-4">
          <div className="container mx-auto text-center">
            © 2024 Carbon Calculator Inc.
          </div>
        </footer>
      </body>
    </html>
  );
}
