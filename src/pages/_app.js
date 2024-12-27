import "@/styles/globals.scss";
import "@/styles/shine-50/styles.scss";
import "@/styles/shine-50/homepage.scss";

import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
    
          
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
