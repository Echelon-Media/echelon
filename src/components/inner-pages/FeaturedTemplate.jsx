import Navbar from "@/components/Navbar";
import Image from "next/image";
import imageurl from "../../images/Capture6.jpg";
import PostList from "@/components/home-components/PostList";
import PostShare from "@/components/story-components/PostShare";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CategoryLink from "../CategoryLink";
import moment from "moment";
import StoryBottomList from "../story-components/StoryBottomList";
import { updatePostviews } from "@/pages/api/api";
import VerticalAd from "../ads/verticalAd";
import BannerAd from "../ads/BannerAd";
import Head from "next/head";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import MobileAd from "../ads/MobileAd";
import ad1 from "@/images/vertical.gif";
import ad2 from "@/images/new_issue.jpg";
import Author from "../story-components/Author";

const Featured = ({
  title,
  excerpt,
  content,
  imageUrl,
  author,
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
  const [isFixed1, setIsFixed1] = useState(false);
  const [isFixed2, setIsFixed2] = useState(false);
  const [top, setTop] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  // console.log(`image link : `, verticalImageUrl);

  useEffect(() => {
    // Check if this is the first load by seeing if our object exists in local storage
    if (localStorage.getItem("firstLoadDone") === null) {
      // If it's the first load, set the flag in local storage to true and reload the page
      localStorage.setItem("firstLoadDone", 1);
      console.log("This is the initial load");
    } else {
      console.log("This is a page refresh");
    }
  }, []);

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

        setTop(leftHeight / 8.8);
        if (winTop > 1060 && winTop <= leftHeight) {
          setIsFixed(true);
          setIsFixed1(false);
          if (winTop > 1000 && winTop <= leftHeight - 1700) {
            setIsFixed1(true);
          } else if (winTop > leftHeight / 7 && winTop < leftHeight + 100) {
            setIsFixed2(true);
          } else {
            setIsFixed2(false);
            setIsFixed1(false);
          }
          if (
            winTop > 1000 + (leftHeight - 3000) &&
            winTop <= leftHeight - 800
          ) {
            // setIsFixed1(false);
          }
        } else {
          setIsFixed(false);
          setIsFixed2(false);
          setIsFixed1(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const popularMarginTopStyle = isFixed2
    ? { top: `10vh` }
    : {
        top: `800vh`,
      };

  const style1 = isFixed1
    ? {
        position: "fixed",
        bottom: "-9%",
        margin: "35% 0% 0% 0%",
      }
    : {
        position: "relative",
        bottom: "10px",
        top: "0",
        margiBottom: "10%",
      };

  const firstfixclass = isFixed1 ? "ad1-fixed-story" : "ad1-relative-story";

  const style2 = isFixed2
    ? {
        position: "fixed",
        bottom: "-6%",

        marginTop: `${top - 100}vh`,
      }
    : {
        position: "relative",
        bottom: "10px",
        top: "30px",
        // marginTop: "50%",
      };

  const popularFixed = isFixed2
    ? "popular-fixed-story"
    : "popular-relative-story";

  const socialShareStyle = isFixed
    ? {
        position: "fixed",
        top: "15%",
        left: "13.6%",
        margin: "0% % 0% -5%",
      }
    : { position: "relative", marginTop: "3%" };

  const paragraphStyle = isFixed ? { marginLeft: "10%" } : { marginLeft: "5%" };

  const mobileImage = verticalImageUrl ? verticalImageUrl : imageUrl;


  const leftContainerRef1 = useRef(null);
    const rightContainerRef1 = useRef(null);
    const leftContainerRef2 = useRef(null);
    const rightContainerRef2 = useRef(null);


    const debounce = (func, delay) => {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    useEffect(() => {
      const updateHeights = () => {
        if (window.innerWidth > 768) {
          const pairs = [
            [leftContainerRef1, rightContainerRef1],
            [leftContainerRef2, rightContainerRef2],

          ];

          pairs.forEach((pair) => {
            const [leftRef, rightRef] = pair;

            if (leftRef.current && rightRef.current) {
              const leftHeight = leftRef.current.offsetHeight;
              rightRef.current.style.height = `${leftHeight}px`;
            }
          });
        } else {
          const rightContainers = [
            rightContainerRef1,
          ];

          rightContainers.forEach((rightRef) => {
            if (rightRef.current) {
              rightRef.current.style.height = "auto";
            }
          });
        }
      };

      const debouncedUpdateHeights = debounce(updateHeights, 50);

      updateHeights();

      window.addEventListener("resize", debouncedUpdateHeights);
      window.addEventListener("scroll", debouncedUpdateHeights);

      return () => {
        window.removeEventListener("resize", debouncedUpdateHeights);
        window.removeEventListener("scroll", debouncedUpdateHeights);
      };
    }, []);





  return (
    <>
      <>
        <div className="featured-image-container">
          <>
            {" "}
            <div className="mobile-image-and-caption hidden">
              {/* <h3 className="featured-page-imagecap ">
                  {verticalImagecaption}
                </h3> */}
              <Image
                className={`featured-page-image`}
                src={mobileImage}
                alt={title}
                width={1200}
                height={1650}
                priority
              />
            </div>
          </>

          <>
            <Image
              className={`featured-page-image featured-desktop-image`}
              src={imageUrl}
              alt={title}
              width={2480}
              height={1395}
              // width={2040}
              // height={809.8}
              priority
            />
          </>
        </div>
        <div className="featured-headline-container">
          <div>
            <div style={{ display: "flex", paddingTop: "2%" }}>
              <span className="story-date ">{`${date} `} </span>
              {categoryId ? (
                <>
                  <span style={{ margin: " -0.10% 1% 0" }}>|</span>

                  <CategoryLink categoryId={categoryId} />
                </>
              ) : (
                <></>
              )}
            </div>

            <h1 className="story-headline titlefont ">{title}</h1>
            <h6
              className="story-strapline featured-strap"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></h6>
          </div>
          {!isDesktop ? (
            <>
              <div className="mobile-story-share-icons">
                <PostShare slug={slug} title={title} excerpt={excerpt} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="featured-container  section-container">
          <div id="left-side" ref={leftContainerRef1}  className="home-second-section-left-side-container sm-fulls">
            <div className="story-post-content">
              {isDesktop ? (
                <div style={socialShareStyle} className="">
                  <PostShare slug={slug} title={title} excerpt={excerpt} />
                </div>
              ) : (
                <></>
              )}

              <div style={paragraphStyle} className="w-full overflow-x-scroll lg:overflow-x-hidden max-w-[100vw] ">
                <div className="date-byline ">
                  {authorId ? (
                    <>
                      {/* by <span className="story-byline"> {author}</span> */}
                      <Author authorId={authorId} />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="body-font overflow-x-scroll lg:overflow-x-hidden w-full max-w-[100vw] py-6"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>
          </div>
          <div className="home-second-section-right-main-wrapper">
      <div
        className="home-second-section-right-side-container"
        ref={rightContainerRef1}
      >
        <div className="home-popular-header-wrapper">
          <h2
            className="text-xl text-black home-popular-header homepage-popular"
            style={{ color: "black !important" }}
          >
            Most Popular
          </h2>
        </div>
        <PostList />
        <div className="home-second-section-right-side-content mt-10 mb-2">
          <VerticalAd
            adClass={""}
            slot={"story_top_right_vertically_long_300*500"}
          />
        </div>

        </div>
      </div>
        </div>
        {/* <MobileAd /> */}

        <StoryBottomList category_id={categoryId} />
        <ScrollToTop />

        <Footer />
      </>
    </>
  );
};
export default Featured;
