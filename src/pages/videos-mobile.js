// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import ReactPlayer from "react-player";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import Footer from "@/components/Footer";
// import Image from "next/image";
// import echelon_logo from "../images/echelon_logo_round.png";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faLinkedinIn, faInstagram, faTwitter, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

// import {
//   getBrandedVideos,
//   getVideoCategories,
//   getVideoCategoryPosts,
//   getVideos,
// } from "./api/api";
// import Link from "next/link";
// import VideoPageCarousel from "../components/inner-pages/VideoPageCarousel";
// import Slider from "react-slick";

// const VideoPage = ({ videoCategories }) => {
//   const [categories, setCategories] = useState([]);
//   const [editorials, setEditorials] = useState([]);
//   const [brandedVideos1, setBrandedVideos1] = useState([]);
//   const [brandedVideos2, setBrandedVideos2] = useState([]);
//   const [allVideos, setAllVideos] = useState([]);

//   useEffect(() => {
//     if (videoCategories && videoCategories.length > 0) {
//       const sortedCategories = videoCategories.sort(
//         (a, b) => parseInt(b.acf.date, 10) - parseInt(a.acf.date, 10)
//       );
//       setCategories(sortedCategories);
//     }
//   }, [videoCategories]);

//   useEffect(() => {
//     async function FetchData() {
//       try {
//         const VideosCategoryData = await getVideoCategoryPosts("", 0);

//         setAllVideos(VideosCategoryData.results);
//         const editorPicks = VideosCategoryData.results.filter(
//           (video) => video?.editors_pick == true
//         );

//         const brandedVideos = VideosCategoryData.results.filter(
//           (video) => video?.type == "branded-videos"
//         );
//         setBrandedVideos1(brandedVideos.slice(0, 6));
//         setBrandedVideos2(brandedVideos.slice(6, 12));

//         setEditorials(editorPicks);
//       } catch (error) {
//         console.log(`Error Fetching data`, error);
//       }
//     }
//     FetchData();
//   }, []);

//   // console.log(`editorials - `, editorials);
//   // console.log(`branded vids - `, brandedVideos);
//   console.log(`all editorials vids - `, editorials);

//   const settings = {
//     dots: false,
//     infinite: false,
//     slidesToShow: 5.5,
//     slidesToScroll: 1,
//     arrows: true,
//   };

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive"; // Importing from react-responsive

import Footer from "@/components/Footer";
import Image from "next/image";
import echelon_logo from "../images/echelon_logo_round.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  getBrandedVideos,
  getVideoCategories,
  getVideoCategoryPosts,
  getVideos,
} from "./api/api";
import Link from "next/link";
import VideoPageCarousel from "../components/inner-pages/VideoPageCarousel";
import Slider from "react-slick";

const VideoPage = ({ videoCategories }) => {
  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);
  const [brandedVideos1, setBrandedVideos1] = useState([]);
  const [brandedVideos2, setBrandedVideos2] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  // Using react-responsive to determine screen size
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (videoCategories && videoCategories.length > 0) {
      const sortedCategories = videoCategories.sort(
        (a, b) => parseInt(b.acf.date, 10) - parseInt(a.acf.date, 10)
      );
      setCategories(sortedCategories);
    }
  }, [videoCategories]);

  useEffect(() => {
    async function FetchData() {
      try {
        const VideosCategoryData = await getVideoCategoryPosts("", 0);

        setAllVideos(VideosCategoryData.results);
        const editorPicks = VideosCategoryData.results.filter(
          (video) => video?.editors_pick == true
        );

        const brandedVideos = VideosCategoryData.results.filter(
          (video) => video?.type == "branded-videos"
        );
        setBrandedVideos1(brandedVideos.slice(0, 6));
        setBrandedVideos2(brandedVideos.slice(6, 12));

        setEditorials(editorPicks);
      } catch (error) {
        console.log(`Error Fetching data`, error);
      }
    }
    FetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: isMobile ? 3 : 5.5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <Navbar />
      <div className="video-landing-page-page-wrapper-mobile">
        <div className="video-landing-page-upper-section">
          <Image
            src={echelon_logo}
            width={100}
            className="vido-landing-page-brand-logo"
          />
          <div className="video-landing-page-upper-section-right-side">
            <div>
              <div className="video-landing-page-upper-section-right-side-first-row">
                Insightful, informative, powerful stories about
              </div>
              <div className="video-landing-page-upper-section-right-side-second-row">
                <div className="video-landing-page-social-icons-wrpapper">
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="video-landing-page-social-icons"
                  />
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="video-landing-page-social-icons"
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="video-landing-page-social-icons"
                  />
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="video-landing-page-social-icons"
                  />
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="video-landing-page-social-icons"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="video-landing-page-bottom-section">
          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <div className="video-landing-page-section-category-name-mobile">
              Editorial
            </div>
            <div className="video-landing-page-section-category-temp-wrapper">
              <Slider {...settings}>
                {editorials.map((video) => (
                  <VideoPageCarousel
                    key={video.id}
                    title={video.title}
                    image={video.video_thumbnail}
                    slug={video.slug}
                  />
                ))}
              </Slider>
            </div>
          </div>

          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name-mobile">
                brand voice
              </div>{" "}
            </Link>
            <div className="video-landing-page-section-category-temp-wrapper">
              <Slider {...settings}>
                {brandedVideos1.map((video) => (
                  <VideoPageCarousel
                    key={video.id}
                    title={video.title}
                    image={video.video_thumbnail}
                    slug={video.slug}
                  />
                ))}
              </Slider>
            </div>
          </div>

          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name-mobile">
                brand voice
              </div>{" "}
            </Link>
            <div className="video-landing-page-section-category-temp-wrapper">
              <Slider {...settings}>
                {brandedVideos1.map((video) => (
                  <VideoPageCarousel
                    key={video.id}
                    title={video.title}
                    image={video.video_thumbnail}
                    slug={video.slug}
                  />
                ))}
              </Slider>
            </div>
          </div>

          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name-mobile">
                brand voice
              </div>{" "}
            </Link>
            <div className="video-landing-page-section-category-temp-wrapper">
              <Slider {...settings}>
                {brandedVideos1.map((video) => (
                  <VideoPageCarousel
                    key={video.id}
                    title={video.title}
                    image={video.video_thumbnail}
                    slug={video.slug}
                  />
                ))}
              </Slider>
            </div>
          </div>

          <div className="video-landing-page-section-container">
            <hr className="video-landing-page-section-separator" />
            <Link href={"category/brand_voice_videos/"}>
              <div className="video-landing-page-section-category-name-mobile">
                brand voice
              </div>{" "}
            </Link>
            <div className="video-landing-page-section-category-temp-wrapper">
              <Slider {...settings}>
                {brandedVideos2.map((video) => (
                  <VideoPageCarousel
                    key={video.id}
                    title={video.title}
                    image={video.video_thumbnail}
                    slug={video.slug}
                  />
                ))}
              </Slider>
            </div>
          </div>

          <div>
            {categories.map((category) => (
              <div
                className="video-landing-page-section-container"
                key={category.id}
              >
                <hr className="video-landing-page-section-separator" />

                <Link
                  href={"/videos/playlist/[slug]/"}
                  as={`/videos/playlist/${category.slug}`}
                >
                  <h2 className="video-landing-page-section-category-name-mobile">
                    {category.name}
                  </h2>
                </Link>

                <div className="video-landing-page-section-category-temp-wrapper">
                  <Slider {...settings}>
                    {allVideos
                      .filter(
                        (video) => video?.video_categories[0] == category?.slug
                      )
                      .slice(0, 6)
                      .map((video) => (
                        <VideoPageCarousel
                          key={video.id}
                          title={video.title}
                          image={video.video_thumbnail}
                          slug={video.slug}
                        />
                      ))}
                  </Slider>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br></br> <br></br>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  // Fetch video categories data from API
  try {
    const videoCategories = await getVideoCategories();

    return {
      props: {
        videoCategories: videoCategories || [],
      },
    };
  } catch (error) {
    return {
      props: {
        videoCategories: [],
      },
    };
  }
}

export default VideoPage;
