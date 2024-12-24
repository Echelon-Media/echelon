import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import Head from "next/head";
import { useEffect, useState } from "react";
import VerticalAd from "../components/ads/verticalAd";

const AboutUs = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      if (winTop > 1000 && winTop <= 1600) {
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
        bottom: "15%",

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
        <title>About Us | Echelon</title>
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

        <link rel="canonical" href="https://echelon.lk/about" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://echelon.lk/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Echelon Magazine" />
        <meta
          property="og:description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
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
        <meta property="twitter:url" content="https://echelon.lk/about" />
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
      <img src="" alt="" />
      <div className="other-page-container">
        <div id="left-side" className="desktop-left-side sm-fulls">
          <h1 className="about-us-title titlefont">About Us</h1>
          <div className="story-post-content">
            <div>
              <div className="body-font">
                <p>
                  <strong>INTELLIGENT STORYTELLING</strong>
                </p>

                <p>
                  The one thing that will define Echelon magazine will be the
                  quality of the storytelling. Echelon, published monthly, will
                  cover in depth Sri Lanka’s most successful businesses, examine
                  their winning strategies and profile their leaders in
                  immersive stories. Great stories are also never limited to
                  words, and our approach includes rich photography, bold
                  graphics and cutting edge design, which together will make for
                  a compelling read.
                </p>
                <p>
                  Business doesn’t start and end in a boardroom; it extends to
                  the golf club, to international travel and to pursuits that
                  blur the lines between commercial venture and sheer passion.
                  The Echelon team will present the best in business and
                  lifestyle coverage that will appeal to an exclusive and
                  affluent readership: an otherwise hard-to-reach demographic.
                </p>
                <p>
                  Content will be developed by some of the most experienced and
                  proven editors, financial journalists, photographers and
                  designers in the country.This team has already raised the bar
                  for powerful and expertly crafted business news. Shamindra
                  Kulamannage leads the editorial team.
                </p>
                <p>
                  Echelon’s reputation is built on the separation of editorial
                  and advertising. However, we are also looking for a creative
                  and impactful new format that can be applied in our magazine,
                  iPad app and website to help our clients reach their audience.
                  We are flexible and creative, and we have a solution for every
                  advertiser who wants to reach our audience.
                </p>
                <p>
                  We are passionate about creative results and working with our
                  advertisers to help them create bespoke multi-platform
                  creative solutions with our in-house creative and sales teams.
                </p>
                <p>
                  Echelon will be a great place to show off the products and
                  capabilities of our clients, because they will be surrounded
                  by an editorial product that is expertly crafted, and full of
                  integrity and intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop-right-side pt-10 sm-fulls">
          <div id="rightShort" style={style}>
            {/* <div
              className="vertical-ads-background"
              style={{ marginTop: "14%" }}
            >
              <div className="side-ad " id="side-ad"></div>
            </div> */}
            <VerticalAd adStyle={{ marginTop: "14%" }} />
          </div>
        </div>
      </div>

      <ScrollToTop />

      <Footer />
    </>
  );
};

export default AboutUs;
