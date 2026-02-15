import "../style/globals.css";
import Navbar from "../components/navbar/Navbar";
import Providers from "./providers";
import ScrollToTop from "../components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import RazorpayScript from "../components/RazorpayScript";
import Script from 'next/script';
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Talent Hunt",
  description: "Official Cricket Club website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <Script 
          id="facebook-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1017587474768941');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=1017587474768941&ev=PageView&noscript=1"
          />`}
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
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















