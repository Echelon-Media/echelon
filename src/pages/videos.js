/**
 * @file Video Page Component - Echelon Magazine Video Page
 * @description Main Video content displaying page developed with using Next.js ISR
 * @author vihanga Mallawaarachchi 
 */

/**
 * @import dependencies
 */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

/**
 * @import Fontawesome icons
 */
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @import swiperJS ( carousel library)
 */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";


/**
 * @import components
 * 
 */
const VideoPageCarousel = dynamic(() => import("@/components/inner-pages/VideoPageCarousel"));
const Navbar = dynamic(() => import("../components/Navbar"));
const Footer = dynamic(() => import("../components/Footer"));
const BannerAd = dynamic(() => import("@/components/ads/BannerAd"), {
  ssr: false,
});
const MobileAd = dynamic(() => import("@/components/ads/MobileAd"), {
  ssr: false,
});
import echelon_logo from "@/images/echelon_logo_round.png";


/**
 * @import API functions
 */
import {
  getBrandedVideos,
  getVideoCategories,
  getVideoCategoryPosts,
  getVideos,
} from "./api/api";

import Slider from "react-slick";
import { faL } from "@fortawesome/free-solid-svg-icons";

/**
 * Fetches static data at build time using SSG + ISR.
 * Regenerates every 60 seconds.
 */
export async function getStaticProps() {
  try {
    const [videoCategories, videoData] = await Promise.all([
      getVideoCategories(),
      getVideoCategoryPosts("", 0),
    ]);

    const sortedCategories = videoCategories.sort(
      (a, b) => parseInt(b.acf.date || "0", 10) - parseInt(a.acf.date || "0", 10)
    );

    return {
      props: {
        videoCategories: sortedCategories || [],
        videos: videoData.results || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching static props:", error);
    return {
      props: {
        videoCategories: [],
        videos: [],
      },
      revalidate: 60,
    };
  }
}

/**
 * @typedef {Object} Video
 * @property {string} id - Unique ID of the video
 * @property {string} title - Title of the video
 * @property {string} slug - URL-friendly identifier
 * @property {string} video_thumbnail - Thumbnail image URL
 * @property {boolean} editors_pick - Whether it's an editor's pick
 * @property {string} type - Type of video (e.g., 'branded-videos')
 * @property {Array<string>} video_categories - List of categories this video belongs to
 */

/**
 * Main Video Landing Page Component
 *
 * @param {Object} props
 * @param {Array<Object>} props.videoCategories - List of available video categories
 * @param {Array<Object>} props.videos - All fetched video content
 */
const VideoPage = ({ videoCategories, videos }) => {
  const [categories, setCategories] = useState([]);

  // Responsive layout check
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Filter videos once from props
  const editorials = videos.filter((video) => video.editors_pick === true);
  const brandedVideos = videos.filter(
    (video) => video.type === "branded-videos"
  );
  const brandedVideos1 = brandedVideos.slice(0, 6);
  const brandedVideos2 = brandedVideos.slice(6, 12);

  // const [editorials, setEditorials] = useState([]);
  // const [brandedVideos1, setBrandedVideos1] = useState([]);
  // const [brandedVideos2, setBrandedVideos2] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  

  /**
   * Sort video categories by date (descending)
   */
  useEffect(() => {
    if (videoCategories && videoCategories.length > 0) {
      const sortedCategories = videoCategories.sort(
        (a, b) => parseInt(b.acf.date, 10) - parseInt(a.acf.date, 10)
      );
      setCategories(sortedCategories);
    }
  }, [videoCategories]);

  // useEffect(() => {
  //   async function FetchData() {
  //     try {
  //       const VideosCategoryData = await getVideoCategoryPosts("", 0);

  //       setAllVideos(VideosCategoryData.results);
  //       const editorPicks = VideosCategoryData.results.filter(
  //         (video) => video?.editors_pick == true
  //       );

  //       const brandedVideos = VideosCategoryData.results.filter(
  //         (video) => video?.type == "branded-videos"
  //       );
  //       setBrandedVideos1(brandedVideos.slice(0, 6));
  //       setBrandedVideos2(brandedVideos.slice(6, 12));

  //       setEditorials(editorPicks);
  //     } catch (error) {
  //       console.log(`Error Fetching data`, error);
  //     }
  //   }
  //   FetchData();
  // }, []);

  // Enable Swiper modules
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  return (
    <>
      <Head>
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
        <title>Videos | Echelon</title>
        <meta name="description" content="Video Page of the Echelon.lk " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta name="description" content="Video Page of the Echelon.lk " />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link rel="canonical" href="https://echelon.lk/videos" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://echelon.lk/videos" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Video | Echelon" />
        <meta
          property="og:description"
          content="Video Page of the Echelon.lk "
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
        <meta property="twitter:url" content="https://echelon.lk/videos" />
        <meta name="twitter:title" content="Video | Echelon" />
        <meta
          name="twitter:description"
          content="Video Page of the Echelon.lk "
        />
        <meta
          name="twitter:image"
          content="https://echelon.lk/_next/static/media/logo.c39512be.png"
        />
      </Head>
      <Navbar />
      <div className="video-landing-page-page-wrapper">
        <div className="video-landing-page-upper-section">
          <Image
            src={echelon_logo}
            width={100}
            className="vido-landing-page-brand-logo"
          />
          <div className="video-landing-page-upper-section-right-side">
            <div>
              <div className="video-landing-page-upper-section-right-side-first-row">
                Inspiring, insightful and informative stories from Sri Lanka's
                economy and business landscape
              </div>
              <div className="video-landing-page-upper-section-right-side-second-row">
                <div className="video-landing-page-social-icons-wrpapper">
                  <a href="https://twitter.com/EchelonMag" target="_blank">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="video-landing-page-social-icons"
                    />
                  </a>
                  <a href="https://www.facebook.com/echelonmag" target="_blank">
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="video-landing-page-social-icons"
                    />
                  </a>
                  <a href="https://instagram.com/echelon_mag" target="_blank">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="video-landing-page-social-icons"
                    />
                  </a>
                  <a
                    href="https://lk.linkedin.com/company/echelon-sri-lanka"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="video-landing-page-social-icons"
                    />
                  </a>
                  <a href="https://youtube.com/@Echelonmag" target="_blank">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="video-landing-page-social-icons"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Videos Carousel */}
        <div className="video-landing-page-bottom-section">
          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"./category/editorial-videos/"}>
              <div className="video-landing-page-section-category-name">
                Editorial
              </div>
            </Link>
            <div>
              <div className="video-landing-page-carousel-main-wrapper">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={isMobile ? 5 : 10}
                  dots={false}
                  slidesPerView={isMobile ? 3 : 5.5}
                  observer={true}
                  observeParents={true}
                  speed={1800}
                  parallax={true}
                  simulateTouch={true}
                  style={{ "--swiper-navigation-color": "black" }}
                  navigation={{
                    el: ".swiper-button-next",
                    el: ".swiper-button-prev",
                  }}
                  loop={false}
                  autoplay={{ delay: 5000, disableOnInteraction: true }}
                >
                  {editorials.slice(0, 6).map((video) => (
                    <SwiperSlide key={video.id}>
                      <VideoPageCarousel
                        key={video.id}
                        title={video.title}
                        image={video.video_thumbnail}
                        slug={video.slug}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Branded Videos Carousel 1 */}
          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name">
                brand voice
              </div>
            </Link>

            <div className="video-landing-page-carousel-main-wrapper">
              <Swiper
                modules={[Navigation]}
                spaceBetween={isMobile ? 5 : 10}
                dots={false}
                slidesPerView={isMobile ? 3 : 5.5}
                observer={true}
                observeParents={true}
                speed={1800}
                parallax={true}
                simulateTouch={true}
                style={{ "--swiper-navigation-color": "black" }}
                navigation={{
                  el: ".swiper-button-next",
                  el: ".swiper-button-prev",
                }}
                loop={false}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
              >
                {brandedVideos1.map((video) => (
                  <SwiperSlide key={video.id}>
                    <VideoPageCarousel
                      key={video.id}
                      title={video.title}
                      image={video.video_thumbnail}
                      slug={video.slug}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Branded Videos Carousel 2 */}
          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name">
                brand voice
              </div>{" "}
            </Link>

            <div className="video-landing-page-carousel-main-wrapper">
              <Swiper
                modules={[Navigation]}
                spaceBetween={isMobile ? 5 : 10}
                dots={false}
                slidesPerView={isMobile ? 3 : 5.5}
                observer={true}
                observeParents={true}
                speed={1800}
                parallax={true}
                simulateTouch={true}
                style={{ "--swiper-navigation-color": "black" }}
                navigation={{
                  el: ".swiper-button-next",
                  el: ".swiper-button-prev",
                }}
                loop={false}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
              >
                {brandedVideos2.map((video) => (
                  <SwiperSlide key={video.id}>
                    <VideoPageCarousel
                      key={video.id}
                      title={video.title}
                      image={video.video_thumbnail}
                      slug={video.slug}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <br></br>
         

           <BannerAd slot={'home_middle_wide'} />
           <MobileAd slot={"home_mobile_square_2"} />
           <br></br>

          {/* Category-based Carousels */}
          <div>
          {categories.map((category) => {
            const videosInCategory = videos.filter(
              (video) => video?.video_categories[0] === category?.slug
            );

            return (
              <div
                className="video-landing-page-section-container"
                key={category.id}
              >
                <hr className="video-landing-page-section-separator" />
                <Link href={`/videos/playlist/${category.slug}`}>
                  <h2 className="video-landing-page-section-category-name">
                    {category.name}
                  </h2>
                </Link>
                <div className="video-landing-page-carousel-main-wrapper">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={isMobile ? 5 : 10}
                    slidesPerView={isMobile ? 3 : 5.5}
                    navigation
                    loop={false}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                  >
                    {videosInCategory.slice(0, 6).map((video) => (
                      <SwiperSlide key={video.id}>
                        <VideoPageCarousel
                          title={video.title}
                          image={video.video_thumbnail}
                          slug={video.slug}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      <br></br> <br></br>
      <Footer />
    </>
  );
};


export default VideoPage;