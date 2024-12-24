import Navbar from "@/components/Navbar";
import Image from "next/image";
import imageurl from "../../images/Capture6.jpg";
import PostList from "@/components/home-components/PostList";
import PostShare from "@/components/story-components/PostShare";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryLink from "../CategoryLink";
import StoryBottomList from "../story-components/StoryBottomList";
import Head from "next/head";
import moment from "moment";
import ScrollToTop from "../story-components/ScrollToTop";
import { updatePostviews } from "@/pages/api/api";
import BannerAd from "../ads/BannerAd";
import MobileAd from "../ads/MobileAd";
import VerticalAd from "../ads/verticalAd";
import ad1 from "@/images/vertical.gif";
import ad2 from "@/images/new_issue.jpg";
import Author from "../story-components/Author";

const Featured = ({
  title,
  excerpt,
  content,
  imageUrl,
  date,
  categoryId,
  postId,
  verticalImageUrl,
  verticalImagecaption,
  slug,
  authorId,
}) => {
  const d = moment(date);
  //date.locale('si');
  const formattedDate = d.format("YYYY/MM/DD");
  const [isFixed, setIsFixed] = useState(false);
  const [top, setTop] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [isPopularFixed, setPopularFixed] = useState(false);

  useEffect(() => {
    const updateViews = async () => {
      try {
        await updatePostviews({ postId });
        setUpdateComplete(true);
        console.log(`post view update successfully`);
      } catch (error) {
        console.error("Error updating post view count:", error);
      }
    };

    const timeout = setTimeout(() => {
      if (!updateComplete) {
        updateViews();
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [updateComplete]);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      const left = document.getElementById("left-side");

      const leftHeight = left ? left.scrollHeight : 0;

      let screenWidth = window.innerWidth;

      if (screenWidth > 760) {
        setIsDesktop(true);
        setTop(leftHeight / 10);
        if (winTop > 800 && winTop <= leftHeight - 1000) {
          setIsFixed(true);
        }
        if (winTop > 800 && winTop <= leftHeight - 1300) {
          setPopularFixed(true);
        } else {
          setIsFixed(false);
          setPopularFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const popularClass = isPopularFixed
    ? "story-page-popular-floating"
    : "story-page-popular-not-Floating";
  const popularMarginTopStyle = {
    marginTop: `25%`,
  };

  const style = isFixed
    ? {
        position: "relative",
        bottom: "10px",
        top: "30px",
      }
    : {
        position: "relative",
        bottom: "10px",
        top: "30px",
        // marginTop: "50%",
      };

  const socialShareStyle = isFixed
    ? {
        position: "fixed",
        top: "15%",
        left: "13.3%",
        margin: "0% % 0% -5%",
      }
    : { position: "relative", marginTop: "3%" };

  const paragraphStyle = isFixed ? { marginLeft: "10%" } : { marginLeft: "5%" };
  const mobileImage = verticalImageUrl ? verticalImageUrl : imageUrl;

  return (
    <>
      <img src="" alt="" />
      <div className="story-container" id="story-container">
        <div id="left-side" className="desktop-left-side sm-fulls">
          <div style={{ display: "flex", paddingTop: "2%" }}>
            <span className="story-date ">{`${date} `} </span>
            {categoryId ? (
              <>
                <span style={{ margin: " -0.10% 1% 0" }}>|</span>

                <CategoryLink color={"black"} categoryId={categoryId} />
              </>
            ) : (
              <></>
            )}
          </div>

          <h1 className="story-headline titlefont ">{title}</h1>
          <h2
            className="story-strapline"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></h2>

          <div className="story-image-container">
            <>
              {" "}
              <div className=" hidden mobile-image-and-caption">
                <Image
                  className={`featured-page-image`}
                  src={mobileImage}
                  alt={title}
                  width={1200}
                  height={1650}
                  priority
                />
                <h3 className="story-page-imagecap">{verticalImagecaption}</h3>
                <div className="mobile-story-share-icons">
                  <PostShare slug={slug} title={title} excerpt={excerpt} />
                </div>
              </div>
            </>

            <>
              <div className="story-desktop-image-and-caption">
                <Image
                  className={`featured-page-image`}
                  src={imageUrl}
                  alt={title}
                  width={2480}
                  height={1395}
                  // width={2040}
                  // height={809.8}
                  priority
                />
                <h3 className="story-page-imagecap">{verticalImagecaption}</h3>
              </div>
            </>
          </div>

          <div className="story-post-content">
            {isDesktop ? (
              <div style={socialShareStyle} className="">
                <PostShare slug={slug} title={title} excerpt={excerpt} />
              </div>
            ) : (
              <></>
            )}

            <div style={isDesktop ? paragraphStyle : { margin: 0 }}>
              <div className=" story-date-byline date-byline ">
                {/* by <span className="story-byline"> Devan Daniel</span> */}
                {authorId ? (
                  <>
                    {/* by <span className="story-byline"> {author}</span> */}
                    <Author authorId={authorId} />
                  </>
                ) : (
                  <></>
                )}
                {/* <span className="story-date">{date}</span> */}
              </div>
              <div
                className={`body-font story-body`}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>
        </div>
        <div className="desktop-right-side pt-10 sm-fulls">
          <div id="rightShort" style={style}>
            <VerticalAd
              adStyle={{ marginTop: "8%" }}
              url={
                "https://backend.echelon.lk/wp-content/uploads/2024/09/Echelon-September-2024.pdf"
              }
              img={ad2}
            />
            {/* <MobileAd /> */}
          </div>
          <div
            className={`postList ${popularClass}`}
            style={popularMarginTopStyle}
          >
            <div className="list-header bg-black h-10 ">
              <h2 className=" text-xl text-white home-popular-header ">
                Most Popular
              </h2>
              <div className="hr" />
            </div>

            <PostList
              key={1}
              category={"Next"}
              headline={
                "Decoding The Code: Bridging Boundaries For An Exceptional Journey"
              }
              imageUrl={imageurl}
              slug={"podt"}
            />
          </div>
        </div>
      </div>
      <BannerAd />
      {/* <MobileAd /> */}

      <StoryBottomList category_id={categoryId} />
      <ScrollToTop />

      <Footer />
    </>
  );
};
export default Featured;
