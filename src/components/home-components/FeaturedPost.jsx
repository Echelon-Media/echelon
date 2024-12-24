import Image from "next/image";
import React from "react";
import CategoryName from "./CategoryName";
import Link from "next/link";
import altImg from "@/images/alternative-image.jpg";

const FeaturedPost = ({
  category,
  headline,
  strapline,
  imageUrl,
  slug,
  verticalImage,
}) => {
  const categorySlug = category?.toString().replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="home-featured-post text-gray-700 hover:text-black overflow-hidden mb-3 pb-4 border-b-2  sm:flex ">
      {/* //p-4 */}
      <Link href="/[slug]/" as={`/${slug}/`}>
        {imageUrl ? (
          <Image
            className={`featuredImage sm:float-right`}
            src={imageUrl}
            alt="Post Image"
            width={2480}
            height={1395}
            // priority
            blurDataURL="URL"
            placeholder="blur"
            loading="lazy"
          />
        ) : (
          <Image
            className={`featuredImage sm:float-right`}
            src={altImg}
            alt="Post Image"
            width={2480}
            height={1395}
            priority
          />
        )}
      </Link>

      <div className="posttextContainerFeatured">
        {/* {categories &&
          categories.length > 0 &&
          categories.map((categoryId) => (
            <CategoryName
              className="w-2/5 category-text mt-1 sm:float-left"
              key={categoryId}
              categoryId={categoryId}
            />
          ))} */}
        {/* <div className=" ">{category}</div> */}
        {category ? (
          <>
            <div className="w-2/5 category-text mt-1 sm:float-left">
              <Link href={"/category/[slug]"} as={`/category/${categorySlug}`}>
                {category.toString()}
              </Link>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}
        <Link href="/[slug]/" as={`/${slug}/`}>
          <h2 className="home-featured-title home-mobile-featured-title titlefont mb-2">
            {headline
              ?.replace(/&#8217;/g, "'")
              .replace(/&#038;/g, "&")
              .replace(/&#8211;/g, "-")
              ?.replace(/(^|\.\s+)([a-z])/g, (match) => match)}
          </h2>

          <div
            className="home-strap-line"
            dangerouslySetInnerHTML={{
              __html: strapline
                ?.replace(/&#8217;/g, "'")
                .replace(/&#038;/g, "&")
                .replace(/&#8211;/g, "-")
                ?.replace(/(^|\.\s+)([a-z])/g, (match) => match),
            }}
          ></div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPost;
