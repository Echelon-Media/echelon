import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const BannerCarousel = React.memo(({ bannerPosts }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);

  // Throttle function to limit state updates
  const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  };

  const updateCarousel = useCallback(
    throttle(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 1000), // throttle to prevent too frequent updates
    [images.length]
  );

  useEffect(() => {
    const imageUrls = bannerPosts.map((post) => post.featured_image);
    setImages(imageUrls);

    if (imageUrls.length > 0) {
      const interval = setInterval(updateCarousel, 3000);
      return () => clearInterval(interval);
    }
  }, [bannerPosts, updateCarousel]);

  useEffect(() => {
    const cachedBannerPosts = localStorage.getItem("bannerPosts");
    if (cachedBannerPosts) {
      setImages(JSON.parse(cachedBannerPosts));
    }
  }, []);

  useEffect(() => {
    if (bannerPosts.length) {
      localStorage.setItem("bannerPosts", JSON.stringify(bannerPosts));
    }
  }, [bannerPosts]);

  // Memoize rendering of banner posts to avoid unnecessary re-renders
  const bannerItems = useMemo(() => {
    return bannerPosts.map((post, index) => (
      <div
        className={`w-1/4 space-x-5 carasol-box border-1 cursor-pointer ${currentImage === index
            ? " border-t-4 border-gray-900"
            : " border-t-4 border-transparent opacity-30"
          }`}
        key={index}
        onMouseOver={() => setCurrentImage(index)}
      >
        <div>
          <div className={`p-1 ${post.type}`}>
            <div className="w-1/4 banner-category category-name mb-1">
              <Link
                href={`/category/[slug]`}
                as={`/category/${post.category
                  ?.toString()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                {post.category}
              </Link>
            </div>
            <Link href="/[slug]/" as={`/${post.slug}/`}>
              <h2 className="carasolText titlefont text-black mb-5 tracking-wide">
                {post.title
                  .replace(/&#8217;/g, "'")
                  .replace(/(^|\.\s+)([a-z])/g, (match) => match)}
              </h2>
            </Link>
          </div>
        </div>
      </div>
    ));
  }, [bannerPosts, currentImage]);

  return (
    <div className="absolute md:contents hidden caresoul-home-desktop">
      <div className="overflow-hidden">
        {images.length > 0 && (
          <>

{/* 
            <div
              className="cover"
              style={{
                background: `url(${images[currentImage]}) center / cover`,
              }}
              priority
            /> */}

            <div className="cover">
              <Image
                src={`${images[currentImage]}`}
                alt="Cover Image"
                layout="fill"
                objectFit="cover"
                
                priority
              />
            </div>

          </>
        )}
      </div>
      <div className="inherit banner-box-list mb-5 inset-x-0 bottom-0 flex justify-center space-x-2 px-16 py-0">
        {bannerItems}
      </div>
    </div>
  );
});

export default BannerCarousel;
