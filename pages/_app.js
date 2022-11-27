import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../stores/authContext";
import Script from "next/script";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        id="google-analytics-tomodiag"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-BEYT663BHX"
      ></Script>
      <Script strategy="lazyOnload" id="google-analytics-tomodiag-body">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BEYT663BHX');    
    `}
      </Script>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
