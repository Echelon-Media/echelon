import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import { useEffect, useState } from "react";
import { getPages } from "./api/api";
import VerticalAd from "../components/ads/verticalAd";
import Head from "next/head";

const PrivacyPolicy = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState([]);

  useEffect(() => {
    async function fetchPage() {
      try {
        const slug = "privacy-policy";
        const response = await getPages(slug);
        const privacyData = response;

        setPrivacyPolicy(privacyData);
      } catch (error) {
        console.log(`unable to fetch privacy policy data `, error);
      }
    }
    fetchPage();
  }, []);
  console.log(`privacy-policy-data ${privacyPolicy}`);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      if (winTop > 400 && winTop <= 4200) {
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
      <Head>
        <title>Privacy | Echelon</title>
        <meta
          name="description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
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
      <img src="" alt="" />
      <div className="other-page-container">
        <div id="left-side" className="desktop-left-side sm-fulls">
          <h1 className="about-us-title titlefont">Privacy policy</h1>
          <div className="story-post-content">
            <div>
              <div
                className="body-font"
                dangerouslySetInnerHTML={{
                  __html: privacyPolicy[0]?.content.rendered,
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
  );
};

export default PrivacyPolicy;
