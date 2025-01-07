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
          <link rel="preconnect" href="https://backend.echelon.lk"></link>
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="icon" href={"/favicon.png"}></link>
          <meta
            name="google-adsense-account"
            content="ca-pub-3125013168548093"
          ></meta>

          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          />

          <Script id="ga-script" strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
          </Script>
          <meta name="robots" content="index, follow"></meta>
          <meta name="nogooglebot" content="index, follow"></meta>
          <meta name="theme-color" content="#e6ecf5"></meta>

          <meta name="robots" content="max-image-preview:large"></meta>

          <script
            async
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            media="print"
            onLoad="this.media='all'"
          />

        </Head>


        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
