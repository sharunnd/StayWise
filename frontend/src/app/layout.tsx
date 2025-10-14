import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "StayWise",
  description: "Your trusted property rental platform",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
