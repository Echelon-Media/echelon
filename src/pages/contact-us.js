import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import { useEffect, useState } from "react";
import { getPages } from "./api/api";
import Head from "next/head";
import VerticalAd from "../components/ads/verticalAd";

const ContactUs = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [contactUs, setContactUs] = useState([]);

  useEffect(() => {
    async function fetchPage() {
      try {
        const slug = "contact-us";
        const response = await getPages(slug);
        const contactData = response;

        setContactUs(contactData);
      } catch (error) {
        console.log(`unable to fetch privacy policy data `, error);
      }
    }
    fetchPage();
  }, []);
  console.log(`contact-us-data ${contactUs}`);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      if (winTop > 1000 && winTop <= 1300) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const style = isFixed
    ? {
        position: "fixed",
        bottom: "-9%",

        margin: "29% 0% 0% 0%",
      }
    : {
        position: "relative",
        bottom: "10px",
        top: "30px",
        // marginTop: "50%",
      };

  return (
    <>
      <>
        <Head>
          <title>Contact Us | Echelon</title>
          <meta
            name="description"
            content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />

          <meta
            name="description"
            content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
          />

          <meta
            name="viewport"
            content=" initial-scale=1.0, width=device-width"
          />

          <link rel="canonical" href="https://echelon.lk/contact-us" />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://echelon.lk/contact-us" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Echelon Magazine" />
          <meta property="og:description" content="" />
          <meta
            property="og:image"
            content="https://echelon.lk/_next/static/media/logo.c39512be.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpg" />

          <meta
            property="og:image"
            content="https://echelon.lk/_next/static/media/logo.c39512be.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="echelon.lk" />
          <meta
            property="twitter:url"
            content="https://echelon.lk/contact-us"
          />
          <meta name="twitter:title" content="Echelon Magazine" />
          <meta
            name="twitter:description"
            content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
          />
          <meta
            name="twitter:image"
            content="https://echelon.lk/_next/static/media/logo.c39512be.png"
          />

          <link
            rel="preload"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            media="print"
            onload="this.media='all'"
          />
        </Head>

        <Navbar />

        <div className="other-page-container">
          <div id="left-side" className="desktop-left-side sm-fulls">
            <h1 className="about-us-title titlefont">Contact Us</h1>
            <div className="story-post-content">
              <div>
                <div
                  className="body-font"
                  dangerouslySetInnerHTML={{
                    __html: contactUs[0]?.content.rendered,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="desktop-right-side pt-10 sm-fulls">
            <div id="rightShort" style={style}>
              <VerticalAd adStyle={{ marginTop: "14%" }} />
            </div>
          </div>
        </div>

        <ScrollToTop />

        <Footer />
      </>
    </>
  );
};

export default ContactUs;
