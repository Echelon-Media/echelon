import Link from "next/link";
import React, { useState, useEffect } from "react";

const BannerCarousel = ({ bannerPosts }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageUrls = bannerPosts.map((post) => post.featured_image);
    setImages(imageUrls);

    if (imageUrls.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [bannerPosts]);

  // Function to fetch data from localStorage if available
  useEffect(() => {
    const cachedBannerPosts = localStorage.getItem("bannerPosts");
    if (cachedBannerPosts) {
      setImages(JSON.parse(cachedBannerPosts));
    }
  }, []);

  // Function to cache data in localStorage
  useEffect(() => {
    localStorage.setItem("bannerPosts", JSON.stringify(bannerPosts));
  }, [bannerPosts]);

  return (
    <div className="absolute md:contents hidden caresoul-home-desktop">
      <div className="overflow-hidden">
        {images.length > 0 && (
          <div
            className="cover"
            style={{
              background: `url(${images[currentImage]})  center / cover`,
            }}
            priority
          />
        )}
      </div>
      <div className="inherit banner-box-list mb-5 inset-x-0 bottom-0 flex justify-center space-x-2 px-16 py-0">
        {bannerPosts.map((post, index) => (
          <div
            className={`w-1/4  space-x-5 carasol-box  border-1  cursor-pointer ${
              currentImage === index
                ? " border-t-4 border-gray-900"
                : " border-t-4 border-transparent opacity-30"
            }`}
            key={index}
            onMouseOver={() => setCurrentImage(index)}
          >
            {" "}
            <div>
              <div className={`p-1 ${post.type}`}>
                <div className="w-1/4 banner-category category-name  mb-1">
                  <Link
                    href={"/category/[slug]"}
                    as={`/category/${post.category
                      ?.toString()
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {" "}
                    {post.category}
                  </Link>
                </div>
                <Link href="/[slug]/" as={`/${post.slug}/`}>
                  <h2
                    className={`carasolText  titlefont  text-black mb-5 tracking-wide`}
                  >
                    {
                      post.title
                        .replace(/&#8217;/g, "'") // Replace &rsquo; with '
                        .replace(/(^|\.\s+)([a-z])/g, (match) => match) // Capitalize the first letter of each sentence
                    }
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
