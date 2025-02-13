import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import Document from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://backend.echelon.lk" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.png" />
          <meta name="google-adsense-account" content="ca-pub-3125013168548093" />

          {/* <Script
          defer
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          />

          <Script defer id="ga-script" strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
          </Script> */}

          <meta name="robots" content="index, follow" />
          <meta name="nogooglebot" content="index, follow" />
          <meta name="theme-color" content="#e6ecf5" />
          <meta name="robots" content="max-image-preview:large" />

          {/* Optimized FontAwesome loading */}

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            media="print"
            onLoad="this.onload=null;this.removeAttribute('media');"
          />
          {/* <noscript>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
          </noscript> */}

          {/* <!-- Preconnect to Google Fonts --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* <!-- Preload critical fonts --> */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;600&display=swap"
            as="style"
          />
         
         
          {/* <!-- Load fonts from Google Fonts --> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;600&display=swap"
            rel="stylesheet"
          />
          

          <Script
            defer
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
            strategy="lazyOnload"
          />
        </Head>

        <body>
          <Main />
          {/* Previously duplicated FontAwesome links removed from here */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
