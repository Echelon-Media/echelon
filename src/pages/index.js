import Head from "next/head";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Inter } from "next/font/google";
import { getAdvertorials, getBrandedPicks, getEditorials } from "./api/api";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import BannerCarousel from "@/components/home-components/BannerCarousel";
import HomeTopCarouselMobile from "@/components/home-components/HomeTopCarouselMobile";
import Navbar from "@/components/Navbar";

const BannerAd = dynamic(() => import("@/components/ads/BannerAd"), { ssr: false });
const MobileAd = dynamic(() => import("@/components/ads/MobileAd"), { ssr: false });
const VerticalAd = dynamic(() => import("@/components/ads/verticalAd"), { ssr: false });
const HomebrandedPicksMobiles = dynamic(() => import("../components/home-components/HomeBrandedPicksMobile.tsx"), { ssr: false });
const HomeEditorsPickCarouselMobile = dynamic(() => import("@/components/home-components/HomeEditorsPickCarouselMobile"), { ssr: false });
const HomeEditorsPickCarouselDesktop = dynamic(() => import("@/components/home-components/HomeEditorsPickCarouselDesktop"), { ssr: false });
const PostSection = dynamic(() => import("@/components/home-components/PostSection"), { ssr: false });
const PostList = dynamic(() => import("@/components/home-components/PostList"), { ssr: false });
const BrandVoiceCarouselDesktop = dynamic(() => import("@/components/home-components/HomeBrandedPicksDesktop"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/story-components/ScrollToTop"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [editorials, setEditorials] = useState([]);
  const [bannerPosts, setBannerPosts] = useState([]);
  const [advertorials, setAdvertorials] = useState([]);
  // const [homepagePosts, setHomepagePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);
  const router = useRouter();
  const [homepagePosts1, setHomepagePosts1] = useState([]);
  const [homepagePosts2, setHomepagePosts2] = useState([]);
  const [homepagePosts3, setHomepagePosts3] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const handleSeeMoreClick = useCallback(() => {
    router.push(`/page/${currentPage}`);
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBannerLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    let isMounted = true;
    async function fetchInitialData() {
      try {
        const [editorialData, brandedData, brandedPicks] = await Promise.all([
          getEditorials(),
          getAdvertorials(),
          getBrandedPicks(),
        ]);

        if (!isMounted) return;

        const nonVideoPosts = editorialData.filter((post) => post.type !== "videos");
        const topPosts = nonVideoPosts.filter((post) => post.is_a_top_story);
        const firstThreePosts = topPosts.length ? topPosts.slice(0, 3) : nonVideoPosts.slice(0, 3);
        const restOfEditorials = nonVideoPosts.filter((post) => !firstThreePosts.includes(post));

        const homepagePosts = [];
        const minLength = Math.min(restOfEditorials.length, brandedData.length);
        for (let i = 0; i < minLength; i += 2) {
          homepagePosts.push(...restOfEditorials.slice(i, i + 2), ...brandedData.slice(i, i + 2));
        }

        // Batch state updates to prevent multiple re-renders
        setBannerPosts(firstThreePosts.concat(brandedPicks[0] || []));

      
          setEditorials(restOfEditorials);
          setAdvertorials(brandedData);
          
          setHomepagePosts1(homepagePosts.slice(0, 20));
          setHomepagePosts2(homepagePosts.slice(20, 40));
          setHomepagePosts3(homepagePosts.slice(40, 60));
        
       
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const gptScript = document.createElement("script");
    gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    gptScript.defer = true;
    document.head.appendChild(gptScript);
    return () => {
      document.head.removeChild(gptScript);
    };
  }, []);

 
  

  

  const memoizedBannerCarousel = useMemo(() => <BannerCarousel bannerPosts={bannerPosts} />, [bannerPosts]);

  // intergration test update testing
  //testing

  const leftContainerRef1 = useRef(null);
  const rightContainerRef1 = useRef(null);
  const leftContainerRef2 = useRef(null);
  const rightContainerRef2 = useRef(null);
  const leftContainerRef3 = useRef(null);
  const rightContainerRef3 = useRef(null);
  const leftContainerRef4 = useRef(null);
  const rightContainerRef4 = useRef(null);
  const leftContainerRef5 = useRef(null);
  const rightContainerRef5 = useRef(null);
  const leftContainerRef6 = useRef(null);
  const rightContainerRef6 = useRef(null);
  const leftContainerRef7 = useRef(null);
  const rightContainerRef7 = useRef(null);

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
          [leftContainerRef3, rightContainerRef3],
          [leftContainerRef4, rightContainerRef4],
          [leftContainerRef5, rightContainerRef5],
          [leftContainerRef6, rightContainerRef6],
          [leftContainerRef7, rightContainerRef7],
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
          rightContainerRef2,
          rightContainerRef3,
          rightContainerRef4,
          rightContainerRef5,
          rightContainerRef6,
          rightContainerRef7,
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

      <h1 hidden>Latest Articles - Homepage</h1>

      {/* <BannerAd />
      <MobileAd /> */}
      {isBannerLoaded ? (
        <>
          <Navbar />
        </>
      ) : (
        <></>
      )}

{memoizedBannerCarousel}
      {loading ? (
        <div className="min-h-screen">{/* <Loading /> */}</div>
      ) : (
        <>
          <HomeTopCarouselMobile bannerPosts={bannerPosts} />
          {/* <BannerAd /> */}
          <MobileAd slot={"home_mobile_square_2"} />

          {/* section 1 */}
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
          {/* <MobileAd slot={"home_mobile_square_2"} /> */}
          {/* branded pick section */}
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

          {/* section 2 */}

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
          </div> */}
                  <VerticalAd
                    adClass={""}
                    slot={"story_top_right_vertically_long_300*500"}
                  />
                </div>
              </div>
            </div>
          </main>
          {/* Edirotrial picks section */}
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

          {/* main section 3 */}

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
                    slot={"story_top_right_vertically_long_2_300*500"}
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
      <Footer />
    </>
  );
}
