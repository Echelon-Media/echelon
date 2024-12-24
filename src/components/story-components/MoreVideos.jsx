import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoItem from "./video-items";
import { getVideos } from "../../pages/api/api";
import Link from "next/link";

const customArrowStyles = {
  position: "absolute",
  top: "30%",
  zIndex: 1,
  cursor: "pointer",
  fontSize: "10px",
  color: "gray",

  width: "32px",
  height: "32px",

  outline: "none",
  transition: "background 0.3s",
};

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} style={{ ...customArrowStyles, left: "-3%" }}>
    <FontAwesomeIcon icon={faChevronLeft} size="5x" color="#2a2222b5" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} style={{ ...customArrowStyles, right: "-3%" }}>
    <FontAwesomeIcon icon={faChevronRight} size="5x" color="#2a2222b5" />
  </button>
);

const MoreVideos = () => {
 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchMoreVideos() {
      try {
        const videoResults = await getVideos();

        if (videoResults.data.length > 0) {
          setVideos(videoResults.data);
        }
      } catch (error) {
        console.log(`error fetching videos data`, error);
      }
    }

    fetchMoreVideos();
  }, []);

  // console.log(`videos are`, videos);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  return (
    <>
      <div className="story-bottom-list">
        <div className="story-bottom-list-title">
          <h2>More Videos</h2>
        </div>

        <Slider
          {...settings}
          className="story-bottom-list-content"
          style={{ margin: "3% 0" }}
        >
          {videos.map((item, index) => (
            <Link href={`/[slug]`} as={`/${item.slug}`}>
              <VideoItem
                pic={item.featured_image_url}
                key={index}
                title={item.title}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default MoreVideos;
