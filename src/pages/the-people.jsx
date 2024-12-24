import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import { useEffect, useState } from "react";
import { getPages } from "./api/api";

const ThePeople = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState([]);

  useEffect(() => {
    async function fetchPage() {
      try {
        const privacy = "privacy-policy";
        const privacyData = await getPages();
        if (privacyData.lenghth > 0) {
          setPrivacyPolicy(privacyData);
        } else {
        }
      } catch (error) {
        console.log(`unable to fetch privacy policy data `, error);
      }
    }
    fetchPage();
  }, []);
  console.log(`privacy-policy-data ${JSON.stringify(privacyPolicy)}`);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      if (winTop > 1000 && winTop <= 1500) {
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
        <div className="banner-ads-background">
          <div
            id="banner-ad"
            className="main-ad"
            style={{ width: "970px", height: "250px" }}
          ></div>
        </div>
        <div className="mobile-ad-background">
          <div className="mobile-ad"></div>
        </div>
        <Navbar />
        <img src="" alt="" />
        <div className="story-container" id="story-container">
          <div id="left-side" className="desktop-left-side sm-fulls">
            <h1 className="about-us-title titlefont">Editorial</h1>
            <div className="story-post-content">
              <div>
                <div
                  className="body-font"
                  dangerouslySetInnerHTML={{
                    __html: privacyPolicy.content,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="desktop-right-side pt-10 sm-fulls">
            <div id="rightShort" style={style}>
              <div
                className="vertical-ads-background"
                style={{ marginTop: "14%" }}
              >
                <div className="side-ad " id="side-ad"></div>
              </div>
            </div>
          </div>
        </div>

        <ScrollToTop />

        <Footer />
      </>
    </>
  );
};

export default ThePeople;
