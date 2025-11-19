import "../style/globals.css";
import Navbar from "../components/navbar/Navbar";
import Providers from "./providers";
import ScrollToTop from "../components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Cricket Club",
  description: "Official Cricket Club website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <>
        <Providers>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
        <ToastContainer/>
        </>
      </body>
    </html>
  );
}















