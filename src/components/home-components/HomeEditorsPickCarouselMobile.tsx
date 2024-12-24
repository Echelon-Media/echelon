import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { getEditorsPicks } from "@/pages/api/api";

interface EditorPick {
  id: number;
  title: string;
  category: string;
  featured_image: string;
  slug: string;
}

const HomeEditorsPickCarousel = () => {

  const [editorsPicks, setEditorsPicks] = useState<EditorPick[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [brandedPicks, setBrandedPicks] = useState<any[]>([]);
  const swiperRef = useRef<SwiperCore>(null) as React.MutableRefObject<SwiperCore>;

  const duration = 5000;
  const animationFrame = useRef<number>(0);
  const startTime = useRef<number>(0);
  const pauseTime = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getEditorsPicks();
        setEditorsPicks(results);
      } catch (error) {
        console.error("Error fetching editorials:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    startAnimation();
    return () => cancelAnimationFrame(animationFrame.current);
  }, [activeIndex]);

  const startAnimation = () => {
    startTime.current = performance.now() - progress * (duration / 100);
    const animate = (now: number) => {
      const elapsedTime = now - startTime.current;
      const timeFraction = elapsedTime / duration;
      setProgress((timeFraction % 1) * 100);
      if (timeFraction >= 1) {
        handleNextSlide();
      } else {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };
    animationFrame.current = requestAnimationFrame(animate);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
    startTime.current = performance.now();
    pauseTime.current = null;
    setProgress(0);
  };

  const handleProgressBarClick = (index: number) => {
    setActiveIndex(index);
    setProgress(index * (100 / brandedPicks.length));
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % brandedPicks.length);
    setProgress(0);
    startTime.current = performance.now();
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleTouchStart = () => {
    pauseTime.current = performance.now();
    cancelAnimationFrame(animationFrame.current);
  };

  const handleTouchEnd = () => {
    if (pauseTime.current !== null) {
      const pauseDuration = performance.now() - pauseTime.current;
      startTime.current += pauseDuration;
      startAnimation();
    }
  };

  return (
    <div className="home-editors-pick-carousel-component-wrapper-mobile">
      <Swiper
        autoplay={{
          delay: duration,
          disableOnInteraction: true,
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}>

        {editorsPicks.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="editors-pick-carousel-image-mobile">
              <Image
                src={post.featured_image}
                width={400}
                height={200}
                alt={post.title}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <div className="editors-pick-carousel-bottom-mobile">
              <Link href="/[slug]/" as={`/${post.slug}/`}>
                <div className="editors-pick-carousel-category-mobile">
                  {post.category}
                </div>
                <div className="editors-pick-carousel-title-mobile titlefont">
                  {post.title
                    .replace(/&#8217;/g, "'")
                    .toLowerCase()
                    .replace(/(^|\.\s+)([a-z])/g, (match) =>
                      match.toUpperCase()
                    )}
                </div>
              </Link>

              <div className="max-w-xs sm:max-w-sm md:max-w-3xl mx-auto flex grid-rows-4 md:grid-cols-4 gap-4 flex flex-nowrap justify-center items-center home-top-carousel-mobile-progress-bar-wrapper-editors-picks">
                {editorsPicks.map((_, index) => (
                  <button
                    key={index}
                    className={`p-1 rounded focus:outline-none focus-visible:ring focus-visible:ring-red-200 group`}
                    onClick={() => handleProgressBarClick(index)}
                  >
                    <span
                      aria-label={`progressbar-${index}`}
                      className="flex w-14 bg-slate-600 h-1 rounded-full relative"
                      role="progressbar"
                      aria-valuenow={activeIndex === index ? progress : 0}
                    >
                      <span
                        className="absolute inset-0 bg-white rounded-full"
                        style={{
                          width: activeIndex === index ? `${progress}%` : "0%",
                        }}
                      ></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeEditorsPickCarousel;
