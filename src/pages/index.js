import Head from "next/head";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import HomeEditorsPickCarouselDesktop from "@/components/home-components/HomeEditorsPickCarouselDesktop";
import FestivalLeftMainSection from "@/components/home-components/FestivalLeftMainSection";
import FestivalRightSubSections from "@/components/home-components/FestivalRightSubSections";
config.autoAddCss = false;
import { Exo_2, Inter } from "next/font/google";
import { getAdvertorials, getBrandedPicks, getEditorials } from "./api/api";
import { useEffect, useState } from "react";
import HomeTopCarouselMobile from "@/components/home-components/HomeTopCarouselMobile";
import HomeEditorsPickCarouselMobile from "@/components/home-components/HomeEditorsPickCarouselMobile";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Loading from "../components/Loading";
import logo from "@/images/logo.png";
import ad1 from "@/images/vertical.gif";
import ad2 from "@/images/new_issue.jpg";
import { useRef } from "react";
import HomebrandedPicksMobiles from "../components/home-components/HomeBrandedPicksMobile.tsx";
import Link from "next/link";
import Navbar from "@/components/Navbar";
// import BannerCarousel from "@/components/home-components/BannerCarousel";


// ADS Lazy Loadinf
const BannerAd = dynamic(() => import("@/components/ads/BannerAd"));
const MobileAd = dynamic(() => import("@/components/ads/MobileAd"));
const VerticalAd = dynamic(() => import("@/components/ads/verticalAd"));


//componenets Lazy loading

const BannerCarousel = dynamic(() =>
  import("@/components/home-components/BannerCarousel")
);
const PostSection = dynamic(() =>
  import("@/components/home-components/PostSection")
);
const PostList = dynamic(() => import("@/components/home-components/PostList"));

const BrandVoiceCarouselDesktop = dynamic(() =>
  import("@/components/home-components/HomeBrandedPicksDesktop")
);
const ScrollToTop = dynamic(() =>
  import("@/components/story-components/ScrollToTop")
);

const Footer = dynamic(() => import("@/components/Footer"));

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [editorials, setEditorials] = useState([]);
  const [bannerPosts, setBannerPosts] = useState([]);
  const [advertorials, setAdvertorials] = useState([]);
  const [homepagePosts1, setHomepagePosts1] = useState([]);
  const [homepagePosts2, setHomepagePosts2] = useState([]);
  const [homepagePosts3, setHomepagePosts3] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [isFixed2, setIsFixed2] = useState(false);
  const [isFixed3, setIsFixed3] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPopularFixed, setIsPopularFixed] = useState(false);
  const [isTopAd, setIsTopAd] = useState(false);

  const TkUrl =
    "https://backend.echelon.lk/wp-json/jwt-auth/v1/token?username=Sachintha&password=xJ(cMWpDUpY1*Vy9";

  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const handleSeeMoreClick = () => {
    setCurrentPage(currentPage);
    router.push(`/page/${currentPage}`);
  };

  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    // Ensure the code only runs on the client
    if (typeof window !== "undefined") {
      const elem = document.querySelector("first-main");
      if (elem) {
        const { height } = elem.getBoundingClientRect();
        setElementHeight(height);
      }
    }
  }, []); 

  // console.log('height is -',elementHeight);
  
  
  //  useEffect(() => {
  //    const cachedBannerPosts = localStorage.getItem("bannerPosts");
  //    if (cachedBannerPosts) {
  //      setImages(JSON.parse(cachedBannerPosts));
  //    }
  //  }, []);

  // Function to cache data in localStorage

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [editorialData, brandedData, brandedPicks] = await Promise.all([
          getEditorials(),
          getAdvertorials(),
          getBrandedPicks(),
        ]);

        // Filter and process editorial data
        const nonVideoPosts = editorialData.filter(
          (post) => post.type !== "videos"
        );

        const topPosts = nonVideoPosts.filter((post) => post.is_a_top_story);
        let firstThreePosts;
        let restOfEditorials;

        if (topPosts.length > 0) {
          // Sort topPosts by "top_position"
          const sortedTopPosts = topPosts.sort(
            (a, b) => a.top_position - b.top_position
          );

          if (sortedTopPosts.length < 3) {
            // If there are less than 3 top posts, fill the remaining slots from nonVideoPosts
            const remainingPostsCount = 3 - sortedTopPosts.length;
            firstThreePosts = sortedTopPosts.concat(
              nonVideoPosts.slice(0, remainingPostsCount)
            );
          } else {
            // Take the first three posts from the sorted top posts
            firstThreePosts = sortedTopPosts.slice(0, 3);
          }

          restOfEditorials = editorialData.filter(
            (post) => !firstThreePosts.includes(post)
          );
        } else {
          firstThreePosts = nonVideoPosts.slice(0, 3);
          restOfEditorials = editorialData.filter(
            (post) => !firstThreePosts.includes(post)
          );
        }

        const firstFourPosts = brandedPicks.length
          ? firstThreePosts.concat(brandedPicks[0])
          : firstThreePosts;

        setBannerPosts(firstFourPosts);

        setEditorials(restOfEditorials);

        // Set advertorials
        setAdvertorials(brandedData);

        // Combine editorial and advertorial data for homepage posts
        const homepagePosts = [];
        for (
          let i = 0;
          i < Math.min(restOfEditorials.length, brandedData.length);
          i += 2
        ) {
          homepagePosts.push(...restOfEditorials.slice(i, i + 2));
          homepagePosts.push(...brandedData.slice(i, i + 2));
        }
        setHomepagePosts1(homepagePosts.slice(0, 20));
        setHomepagePosts2(homepagePosts.slice(20, 40));
        setHomepagePosts3(homepagePosts.slice(40)); // Assuming 60 is a reasonable number for homepage posts
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;
      let screenWidth = window.innerWidth;
      if (screenWidth > 760) {
        setIsDesktop(true);
        if (winTop > 1450 && winTop <= 5200) {
          setIsFixed(true);
        } else if (winTop >= 4900 && winTop <= 5200) {
          //setIsPopularFixed(true);
        } else if (winTop >= 6400 && winTop <= 10300) {

          setIsFixed2(true);
        } else if (winTop >= 12000 && winTop) {
          setIsFixed2(false);
          setIsFixed3(true);
        } else {
          setIsPopularFixed(false);
          setIsFixed(false);
          setIsFixed2(false);
          setIsFixed3(false);
          console.log("Setting isFixed to false");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const firstfixclass = isFixed ? "ad1-fixed" : "ad1-relative";
  const popularFixed = isPopularFixed ? "popular-relative" : "popular-relative";
  const Secondfixclass = isFixed2 ? "ad2-fixed" : "ad2-relative";
  const Thirdfixclass = isFixed3 ? "ad3-fixed" : "ad3-relative";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };



   useEffect(() => {
    // Load the GPT script
    const gptScript = document.createElement('script');
    gptScript.async = true;
    gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    document.head.appendChild(gptScript);

    // Initialize GPT after script is loaded
    // gptScript.onload = () => {
    //   window.googletag = window.googletag || { cmd: [] };
    //   googletag.cmd.push(function () {
    //     googletag.defineSlot('/103700377/echelon_test_ad', [300, 250], 'div-gpt-ad-1727089579794-0').addService(googletag.pubads());
    //     googletag.pubads().enableSingleRequest();
    //     googletag.enableServices();
    //   });
    // };

    // Clean up the script if the component unmounts
    return () => {
      document.head.removeChild(gptScript);
    };
  }, []);

  // useEffect(() => {
  //   // Display the ad after initialization
  //   if (window.googletag && window.googletag.cmd) {
  //     googletag.cmd.push(function () {
  //       googletag.display('div-gpt-ad-1727089579794-0');
  //     });
  //   }
  // }, []);

//loading time
 useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    },1500); 
    return () => clearTimeout(timer);
  }, []);

  

  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  const onLoadComplete = () => {
    setIsBannerLoaded(true);
  };


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
      {isBannerLoaded ? <Navbar />:<></>}
      

      <BannerCarousel bannerPosts={bannerPosts} />

      {loading ? (
        <div className="min-h-screen">{/* <Loading /> */}</div>
      ) : (
        <>
          <HomeTopCarouselMobile bannerPosts={bannerPosts} />
          <BannerAd />
          <MobileAd slot={"home_mobile_square_1"} />

          <main id="main" className="first-main mt-5">
            <PostSection homePagePosts={homepagePosts1} />
            <div className="desktop-right-side ">
            <div className={`postList ${popularFixed}`}>
                <div className="home-popular-header-wrapper">
                  <h2
                    className="text-xl text-black home-popular-header homepage-popular"
                    style={{ color: "black !important" }}
                  >
                    Most Popular
                  </h2>
                </div>
                <PostList />
              </div>
              <VerticalAd
                adClass={firstfixclass}
                // img={ad2}
                // url={
                //   "https://backend.echelon.lk/wp-content/uploads/2024/09/Echelon-September-2024.pdf"
                // }
                // target="_blank"
                slot={"home_top_right_vertically_long_300*500"}
              />

              
            </div>
          </main>

          <MobileAd slot={"home_mobile_square_4"} />
          {/* <HomebrandedPicksMobile /> */}
          {/* <HomeBrandedPicks /> */},
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
          <main>
            <PostSection homePagePosts={homepagePosts2} />
            <div className="desktop-right-side sm-fulls">
              <VerticalAd
                adClass={Thirdfixclass}
                // img={ad1}
                // url={
                //   "https://youtube.com/playlist?list=PL85zhIvKzyYYPAE5HipW_u1nsoQaTuKoO&si=VqiWHMpQtleYf00y"
                // }
                slot={"story_top_right_vertically_long_300*500"}/>

  

              
            </div>
          </main>
          <MobileAd slot={"home_mobile_square_3"} />
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
          <main>
            <PostSection homePagePosts={homepagePosts3} />

            <div className="desktop-right-side sm-fulls">
              <VerticalAd
                adClass={Secondfixclass}
                // img={ad1}
                // url={
                //   "https://youtube.com/playlist?list=PL85zhIvKzyYYPAE5HipW_u1nsoQaTuKoO&si=VqiWHMpQtleYf00y"
                // }
                slot={"story_top_right_vertically_long_2_300*500"}
              />

               {/* bottom ad */}

             

                
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
