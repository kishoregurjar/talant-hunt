import "../style/globals.css";
import Navbar from "../components/navbar/Navbar";
import Providers from "./providers";
import ScrollToTop from "../components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import RazorpayScript from "../components/RazorpayScript";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Talent Hunt",
  description: "Official Cricket Club website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800" suppressHydrationWarning
      >
        <>
        <Providers>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
        <RazorpayScript />
        <ToastContainer/>
        </>
      </body>
    </html>
  );
}















