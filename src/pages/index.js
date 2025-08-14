/**
 * @file Home Page Component - Echelon Magazine Homepage
 * @description Main landing page for Echelon website, Display news articles,
 *              banners, carousels, ads , and branded content using Next.js ISR
 * @author vihanga Mallawaarachchi
 */


/**
 * @import dependencies
 */
import Head from "next/head";
import Script from "next/script";  //remove if not used @vihangamallawaarachchi2001
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * @import fonts
 */
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

/**
 * @setup fontawesome
 *
 */
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

/**
 * @import apicall functions
 *
 */
import { getAdvertorials, getAdvertorials2, getBrandedPicks, getEditorials, getTopStories } from "./api/api";

/**
 * @import components
 */
import BannerCarousel from "@/components/home-components/BannerCarousel";
import HomeTopCarouselMobile from "@/components/home-components/HomeTopCarouselMobile";
import Navbar from "@/components/Navbar";

/**
 * @imports dynamic components
 */
const BannerAd = dynamic(() => import("@/components/ads/BannerAd"), {ssr: false,}); // remove if not used @vihangamallawaarachchi2001
const MobileAd = dynamic(() => import("@/components/ads/MobileAd"), {ssr: false,});
const VerticalAd = dynamic(() => import("@/components/ads/verticalAd"), {ssr: false,});
const HomebrandedPicksMobiles = dynamic(() => import("../components/home-components/HomeBrandedPicksMobile.tsx"),{ ssr: false });
const HomeEditorsPickCarouselMobile = dynamic(() => import("@/components/home-components/HomeEditorsPickCarouselMobile"),{ ssr: false });
const HomeEditorsPickCarouselDesktop = dynamic(() => import("@/components/home-components/HomeEditorsPickCarouselDesktop"),{ ssr: false });
const PostSection = dynamic(() => import("@/components/home-components/PostSection"),{ ssr: false });
const PostList = dynamic(() => import("@/components/home-components/PostList"),{ ssr: false });
const BrandVoiceCarouselDesktop = dynamic(() => import("@/components/home-components/HomeBrandedPicksDesktop"),{ ssr: false });
const ScrollToTop = dynamic(() => import("@/components/story-components/ScrollToTop"),{ ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

/**
 *
 * @returns Fetch data at build time using ISR ( Incremental static Regeneration )
 * @reference https://nextjs.org/docs/app/guides/incremental-static-regeneration
 * ( Hi, before you work ISR please go through the documentation )
 * @returns {Object} Props containing fetched editorials, branded, and advertorial content.
 */
export async function getStaticProps() {

  console.log("get static Props is running at ", new Date().toISOString()); //remove this once the testing is over

  try {
    // API call execution
    const [editorialData, brandedData, brandedPicks, topStoryPosts, branded_content] = await Promise.all([
      getEditorials(),
      getAdvertorials(),
      getBrandedPicks(),
      getTopStories(),
      getAdvertorials2()
    ]);

    console.log("Branded Data Count:", branded_content.length, branded_content);

    // Filter outvideo posts and prioritize top stories
    const nonVideoPosts = editorialData.filter((post) => post.type !== "videos");
    const topPosts = nonVideoPosts.filter((post) => post.is_a_top_story);
    const firstThreePosts = topStoryPosts.length ? topStoryPosts : topPosts.slice(0, 3);
    const restOfEditorials = nonVideoPosts.filter((post) => !firstThreePosts.includes(post));

    // Mix editorials  and edvetorials in chunk of 2 each
    const homepagePosts = [];
    const minLength = Math.min(restOfEditorials.length, brandedData.length);
    for (let i = 0; i < minLength; i += 2) {
      homepagePosts.push(
        ...restOfEditorials.slice(i, i + 2),
        ...branded_content.slice(i, i + 2),
        ...brandedData.slice(i, i + 2)
      );
    }

    // console.log(editorialData);
    // console.log("=======================================================")
    // console.log(brandedData)
    // console.log("=======================================================")
    // console.log(brandedPicks)
    return {
      props: {
        initialBannerPosts: firstThreePosts.concat(brandedPicks[0] || []),
        initialEditorials: restOfEditorials,
        initialAdvertorials: branded_content,
        initialHomepagePosts1: homepagePosts.slice(0, 20),
        initialHomepagePosts2: homepagePosts.slice(20, 40),
        initialHomepagePosts3: homepagePosts.slice(40, 60),
      },
      revalidate: 60, // ⏱ ISR: Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialBannerPosts: [],
        initialEditorials: [],
        initialAdvertorials: [],
        initialHomepagePosts1: [],
        initialHomepagePosts2: [],
        initialHomepagePosts3: [],
      },
      revalidate: 60,
    };
  }
}

/**
 * Main Homepage Component
 * Display banners, articles , ads, carousels, and navigation.
 * Uses client-side effects for layout adjustments and ad scripts.
 * @param {*initialBannerPosts} param0
 * @param {*initialEditorials} params1
 * @param {*initialAdvertorials} param2
 * @param {*initialHomepagePosts1} param3
 * @param {*initialHomepagePosts2} param4
 * @param {*initialHomepagePosts3} param5
 *
 * @returns HomePage UI
 */
export default function Home({
  initialBannerPosts,
  initialEditorials,
  initialAdvertorials,
  initialHomepagePosts1,
  initialHomepagePosts2,
  initialHomepagePosts3,
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  // State for article section
  const [homepagePosts1, setHomepagePosts1] = useState(initialHomepagePosts1);
  const [homepagePosts2, setHomepagePosts2] = useState(initialHomepagePosts2);
  const [homepagePosts3, setHomepagePosts3] = useState(initialHomepagePosts3);

  // References for equal-height layout syncing
  // const leftContainerRef1 = useRef(null);
  // const rightContainerRef1 = useRef(null);
  // const leftContainerRef2 = useRef(null);
  // const rightContainerRef2 = useRef(null);
  // const leftContainerRef3 = useRef(null);
  // const rightContainerRef3 = useRef(null);
  // const leftContainerRef4 = useRef(null);
  // const rightContainerRef4 = useRef(null);
  // const leftContainerRef5 = useRef(null);
  // const rightContainerRef5 = useRef(null);
  // const leftContainerRef6 = useRef(null);
  // const rightContainerRef6 = useRef(null);
  // const leftContainerRef7 = useRef(null);
  // const rightContainerRef7 = useRef(null);

  const leftRefs = Array.from({length: 7}, () => useRef(null));
  const rightRefs = Array.from({length: 7}, () => useRef(null));

  //Debounce utility for rsize/scroll events
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Inject GPT script for ads
  useEffect(() => {
  const gptScript = document.createElement("script");
  gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
  gptScript.async = true;
  document.head.appendChild(gptScript);
  return () => document.head.removeChild(gptScript);
  }, []);

  // Memoize carousel for performance
  const memoizedBannerCarousel = useMemo(
  () => <BannerCarousel bannerPosts={initialBannerPosts} />,
  [initialBannerPosts] // if did not work change to  initialBannerPosts => bannerPosts
  );

  const handleSeeMoreClick = useCallback(() => {
  router.push(`/page/${currentPage}`); // if did not work change to currentPage + 1 ;
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBannerLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sync left-right container heights on desktop
  useEffect(() => {
    const updateHeights = () => {
      if (window.innerWidth > 768) {
        leftRefs.forEach((leftRef, index) => {
          const rightRef = rightRefs[index];
          if (leftRef.current && rightRef.current) {
            rightRef.current.style.height = `${leftRef.current.offsetHeight}px`;
          }
        });
      } else {
        rightRefs.forEach((rightRef) => {
          if (rightRef.current) {
            rightRef.current.style.height = "auto";
          }
        });
      }
    };

    const debouncedUpdate = debounce(updateHeights, 50);
    updateHeights();
    window.addEventListener("resize", debouncedUpdate);
    window.addEventListener("scroll", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      window.removeEventListener("scroll", debouncedUpdate);
    };
  }, []);




  //const [editorials, setEditorials] = useState(initialEditorials);
  //const [bannerPosts, setBannerPosts] = useState(initialBannerPosts);
  //const [advertorials, setAdvertorials] = useState(initialAdvertorials);
  // const [homepagePosts, setHomepagePosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;
  //   async function fetchInitialData() {
  //     try {
  //       const [editorialData, brandedData, brandedPicks] = await Promise.all([
  //         getEditorials(),
  //         getAdvertorials(),
  //         getBrandedPicks(),
  //       ]);

  //       if (!isMounted) return;

  //       const nonVideoPosts = editorialData.filter(
  //         (post) => post.type !== "videos"
  //       );
  //       const topPosts = nonVideoPosts.filter((post) => post.is_a_top_story);
  //       const firstThreePosts = topPosts.length
  //         ? topPosts.slice(0, 3)
  //         : nonVideoPosts.slice(0, 3);
  //       const restOfEditorials = nonVideoPosts.filter(
  //         (post) => !firstThreePosts.includes(post)
  //       );

  //       const homepagePosts = [];
  //       const minLength = Math.min(restOfEditorials.length, brandedData.length);
  //       for (let i = 0; i < minLength; i += 2) {
  //         homepagePosts.push(
  //           ...restOfEditorials.slice(i, i + 2),
  //           ...brandedData.slice(i, i + 2)
  //         );
  //       }

  //       // Batch state updates to prevent multiple re-renders
  //       setBannerPosts(firstThreePosts.concat(brandedPicks[0] || []));

  //       setEditorials(restOfEditorials);
  //       setAdvertorials(brandedData);

  //       setHomepagePosts1(homepagePosts.slice(0, 20));
  //       setHomepagePosts2(homepagePosts.slice(20, 40));
  //       setHomepagePosts3(homepagePosts.slice(40, 60));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       if (isMounted) setLoading(false);
  //     }
  //   }
  //   fetchInitialData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);





  // intergration test update testing
  //testing



  // useEffect(() => {
  //   const updateHeights = () => {
  //     if (window.innerWidth > 768) {
  //       const pairs = [
  //         [leftContainerRef1, rightContainerRef1],
  //         [leftContainerRef2, rightContainerRef2],
  //         [leftContainerRef3, rightContainerRef3],
  //         [leftContainerRef4, rightContainerRef4],
  //         [leftContainerRef5, rightContainerRef5],
  //         [leftContainerRef6, rightContainerRef6],
  //         [leftContainerRef7, rightContainerRef7],
  //       ];

  //       pairs.forEach((pair) => {
  //         const [leftRef, rightRef] = pair;

  //         if (leftRef.current && rightRef.current) {
  //           const leftHeight = leftRef.current.offsetHeight;
  //           rightRef.current.style.height = `${leftHeight}px`;
  //         }
  //       });
  //     } else {
  //       const rightContainers = [
  //         rightContainerRef1,
  //         rightContainerRef2,
  //         rightContainerRef3,
  //         rightContainerRef4,
  //         rightContainerRef5,
  //         rightContainerRef6,
  //         rightContainerRef7,
  //       ];

  //       rightContainers.forEach((rightRef) => {
  //         if (rightRef.current) {
  //           rightRef.current.style.height = "auto";
  //         }
  //       });
  //     }
  //   };

  //   const debouncedUpdateHeights = debounce(updateHeights, 50);

  //   updateHeights();

  //   window.addEventListener("resize", debouncedUpdateHeights);
  //   window.addEventListener("scroll", debouncedUpdateHeights);

  //   return () => {
  //     window.removeEventListener("resize", debouncedUpdateHeights);
  //     window.removeEventListener("scroll", debouncedUpdateHeights);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>Echelon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#e6ecf5"></meta>
        <meta
          name="description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://echelon.lk" />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://echelon.lk/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Echelon Magazine" />

        <meta property="og:locale" content="en_US" />
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
        <meta property="twitter:url" content="https://echelon.lk/" />
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
          rel="preconnect"
          href="https://backend.echelon.lk/wp-json/custom/v1/"
        ></link>
      </Head>

      {/* Hidden heading for screen readers */}
      <h1 hidden>Latest Articles - Homepage</h1>

      {/* Show navbar after delay */}
      {isBannerLoaded && <Navbar />}

    {/* TODO un used banner section needed to check for usage and remove */}
      {/* <BannerAd />
      <MobileAd />  */}

      {/* Hero Banner Carousel */}
      {memoizedBannerCarousel}

      {/* Mobile Top Carousel */}
      <HomeTopCarouselMobile bannerPosts={initialBannerPosts} />

      {/* <BannerAd /> */}
      <MobileAd slot={"home_mobile_square_2"} />

      {/* Main Section */}
      <main className="section-container first-main mt-5">
        <div
          className="home-second-section-left-side-container"ref={leftRefs[0]} >
          <PostSection homePagePosts={homepagePosts1} />
        </div>

        <div className="home-second-section-right-main-wrapper">
          <div className="home-second-section-right-side-container" ref={rightRefs[0]}
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
                slot={"home_top_right_vertically_long_300*500"}
              />
            </div>
          </div>
        </div>
      </main>

      {/* TODO un used add needed a consideration */}
      {/* <MobileAd slot={"home_mobile_square_2"} /> */}

      {/* branded pick section */}
      <HomebrandedPicksMobiles />

      {/* Branded Picks Section  */}
      <div className="home-branded-picks-hide-on-mobile">
        <Link href="./category/brand-voice/">
          <div className="home-branded-picks-headline-desktop">
            Brand Voice
          </div>
        </Link>
        <BrandVoiceCarouselDesktop />
      </div>

      {/* Second Article Section */}
      <main className="section-container">
        <div
          className="home-second-section-left-side-container"
          ref={leftRefs[1]}
        >
          <PostSection homePagePosts={homepagePosts2} />
        </div>

        <div className="home-second-section-right-main-wrapper">
          <div
            className="home-second-section-right-side-container"
            ref={rightRefs[1]}
          >
            <div className="home-second-section-right-side-content">
              {/* <div className="ad-box">

        Ad Content
      </div> */}
              <VerticalAd
                adClass={""}
                slot={"story_top_right_vertically_long_300*500"}
              />
            </div>
          </div>
        </div>
      </main>

      <br></br>

      {/* Editor's Pick Carousel */}
      {/* <MobileAd slot={"home_mobile_square_3"} /> */}
      <div className="editor-pick-hide-on-mobile">
        <div className="editors-pick-carousel-main-wrapper">
          <div className="editors-pick-carousel-header-section">
            <div className="editors-pick-carousel-headline titlefont">
              Editor's Pick
            </div>
          </div>
          <HomeEditorsPickCarouselDesktop />
        </div>
      </div>
      <div className="home-editors-pick-carousel-main-wrapper-mobile">
        <div className="home-editors-pick-carousel-headline titlefont">
          Editor's Pick
        </div>
        <HomeEditorsPickCarouselMobile />
      </div>
      <br></br>

      {/* Third Article Section */}
      <main className="section-container">
        <div
          className="home-second-section-left-side-container"
          ref={leftRefs[2]}
        >
          <PostSection homePagePosts={homepagePosts3} />
        </div>

        <div className="home-second-section-right-main-wrapper">
          <div
            className="home-second-section-right-side-container"
            ref={rightRefs[2]}
          >
            <div className="home-second-section-right-side-content">
              <VerticalAd
                adClass={""}
                slot={"story_top_right_vertically_long2"}
              />
            </div>
          </div>
        </div>
      </main>

      {/* See More Button */}
       <div className="see-more-button-wrapper">
          <button onClick={handleSeeMoreClick} className="see-more-button">
            See More Stories{" "}
          </button>
        </div>

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />


    </>
  );
}

/*
{loading ? (
        <div className="min-h-screen">{/* <Loading /> }</div>
      ) : (
        <>
          <HomeTopCarouselMobile bannerPosts={initialBannerPosts} />
          {/* <BannerAd /> }
          <MobileAd slot={"home_mobile_square_2"} />

          {/* section 1 }
          <main className="section-container first-main mt-5">
            <div
              className="home-second-section-left-side-container"
              ref={leftContainerRef1}
            >
              <PostSection homePagePosts={homepagePosts1} />
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
                    slot={"home_top_right_vertically_long_300*500"}
                  />
                </div>
              </div>
            </div>
          </main>
          {/* <MobileAd slot={"home_mobile_square_2"} /> }
          {/* branded pick section/}
          <HomebrandedPicksMobiles />
          <div className="home-branded-picks-hide-on-mobile">
            <Link href="./category/brand-voice/">
              <div className="home-branded-picks-headline-desktop">
                Brand Voice
              </div>
            </Link>

            <BrandVoiceCarouselDesktop />
          </div>
          <br></br>

          {/* section 2 /}

          <main className="section-container">
            <div
              className="home-second-section-left-side-container"
              ref={leftContainerRef2}
            >
              <PostSection homePagePosts={homepagePosts2} />
            </div>

            <div className="home-second-section-right-main-wrapper">
              <div
                className="home-second-section-right-side-container"
                ref={rightContainerRef2}
              >
                <div className="home-second-section-right-side-content">
                  {/* <div className="ad-box">

            Ad Content
          </div> }
                  <VerticalAd
                    adClass={""}
                    slot={"story_top_right_vertically_long_300*500"}
                  />
                </div>
              </div>
            </div>
          </main>
          {/* Edirotrial picks section /}
          {/* <MobileAd slot={"home_mobile_square_3"} /> /}
          <div className="editor-pick-hide-on-mobile">
            <div className="editors-pick-carousel-main-wrapper">
              <div className="editors-pick-carousel-header-section">
                <div className="editors-pick-carousel-headline titlefont">
                  Editor's Pick
                </div>
              </div>
              <HomeEditorsPickCarouselDesktop />
            </div>
          </div>
          <div className="home-editors-pick-carousel-main-wrapper-mobile">
            <div className="home-editors-pick-carousel-headline titlefont">
              Editor's Pick
            </div>
            <HomeEditorsPickCarouselMobile />
          </div>
          <br></br>

          {/* main section 3 /}

          <main className="section-container">
            <div
              className="home-second-section-left-side-container"
              ref={leftContainerRef3}
            >
              <PostSection homePagePosts={homepagePosts3} />
            </div>

            <div className="home-second-section-right-main-wrapper">
              <div
                className="home-second-section-right-side-container"
                ref={rightContainerRef3}
              >
                <div className="home-second-section-right-side-content">
                  <VerticalAd
                    adClass={""}
                    slot={"story_top_right_vertically_long2"}
                  />
                </div>
              </div>
            </div>
          </main>

          <div className="see-more-button-wrapper">
            <button onClick={handleSeeMoreClick} className="see-more-button">
              See More Stories{" "}
            </button>
          </div>
          <ScrollToTop />
        </>
      )}
      <Foo
*/