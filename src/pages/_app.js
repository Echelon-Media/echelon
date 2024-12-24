import "@/styles/globals.scss";
import "@/styles/shine-50/styles.scss";
import "@/styles/shine-50/homepage.scss";

import Link from "next/link";
import Snowfall from "react-snowfall";

export default function App({ Component, pageProps }) {
  return (
    <>
    
                  <Snowfall   style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 5000,
          pointerEvents: 'none', // Optional: to prevent interference with user interactions
        }} /> 

      <Component {...pageProps} />
      {/* <CookieConsent style={{ background: "rgba(53, 53, 53,0.8)" }}>
        ECHELON.lk uses cookies to enhance the user experience. By continuing to
        use this website you accept our cookies policy. Read our privacy policy{" "}
        <Link
          style={{ color: "white", textDecoration: "underline" }}
          href={"/privacy_policy"}
        >
          here.
        </Link>{" "}
        🍪
      </CookieConsent> */}
     
    </>
  );
}
