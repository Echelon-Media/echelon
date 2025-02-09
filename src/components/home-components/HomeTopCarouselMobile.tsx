import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerPost {
  vertical_image: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface Props {
  bannerPosts: BannerPost[];
}

export default function TopCarouselMobiles({ bannerPosts }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const animationFrame = useRef<number | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const duration = 5000;
  let startTime = useRef<number>(performance.now());

  useEffect(() => {
    startAnimation();
    return () => cancelAnimationFrame(animationFrame.current!);
  }, [activeIndex]);

  const startAnimation = () => {
    startTime.current = performance.now();
    const animate = () => {
      const elapsedTime = performance.now() - startTime.current;
      const progress = Math.min((elapsedTime / duration) * 100, 100);
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
      if (progress < 100) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        handleNextSlide();
      }
    };
    animationFrame.current = requestAnimationFrame(animate);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
    startAnimation();
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="home-top-carousel-mobile-main-wrapper">
      <Swiper
        autoplay={{ delay: duration, disableOnInteraction: false }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {bannerPosts.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="home-top-carousel-mobile-featured-image">
              <Image
                src={post.vertical_image}
                width={400}
                height={200}
                alt={post.title}
                layout="intrinsic"
                priority={index === 0}
              />
            </div>
            <div className="home-top-carousel-mobile-bottom-wrapper">
              <Link href={`/category/${post.category.replace(/\s+/g, "-").toLowerCase()}`}>
                <div className="home-top-carousel-mobile-category titlefont">
                  {post.category}
                </div>
              </Link>
              <Link href={`/${post.slug}/`}>
                <div className="home-top-carousel-mobile-title titlefont">
                  {post.title.replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-")}
                </div>
                <div className="home-top-carousel-mobile-stapline">{post.excerpt}</div>
              </Link>
            </div>
            <div className="home-top-carousel-mobile-progress-bar flex justify-center items-center">
              {bannerPosts.map((_, idx) => (
                <button
                  key={idx}
                  className="p-1 rounded focus:outline-none focus-visible:ring-red-200"
                  onClick={() => swiperRef.current?.slideTo(idx)}
                >
                  <span className="w-14 bg-slate-600 h-1 rounded-full relative">
                    <span
                      ref={idx === activeIndex ? progressRef : null}
                      className="absolute inset-0 bg-white rounded-full"
                      style={{ width: idx === activeIndex ? "100%" : "0%" }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
