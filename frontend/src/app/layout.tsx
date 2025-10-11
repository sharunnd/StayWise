
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
