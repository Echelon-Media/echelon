import Image from "next/image";
import React, { useState } from "react";
import CategoryName from "./CategoryName";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Bubbler_One } from "next/font/google";
import altImg from "@/images/alternative-image.jpg";

const DefaultPost = ({
  category,
  headline,
  strapline,
  imageUrl,
  slug,
  type,
}) => {
  const categorySlug = category?.toString().replace(/\s+/g, "-").toLowerCase();
  return (
    <section className="w-full max-w-[800px] bg-black">
      <div className="bg-white text-gray-700 hover:text-black overflow-hidden defaultpost-mobile mb-2 border-b-2">
        <div className="row flex ">
          <div
            className={`default-posttextContainer p-1 sm:p-0 w-5/6 min-w-5/6`}
          >
            {" "}
            {/* React fragment shorthand */}
            <div className="w-1/4 category-text  sm:float-left">
              {" "}
              {/* A div element with specified class names */}
              {type === "branded-videos" ? ( // If type is "brandedvideos", render "Video || Brand Voice"
                <Link href={"/videos"}>Video | Brand Voice</Link>
              ) : type === "videos" ? ( // If type is "videos", render "Video"
                <Link href={"/videos"}>Video</Link>
              ) : category ? ( // If category is truthy (i.e., not null or undefined), execute the following code
                <Link
                  href={"/category/[slug]"}
                  as={`/category/${categorySlug}`}
                >
                  {category.toString()}
                </Link>
              ) : (
                // Render the value of category as a string
                <></> // If category is falsy (i.e., null or undefined), render nothing
              )}
            </div>
            <br />
            <Link href="/[slug]/" as={`/${slug}/`}>
              <h2 className={`home-postTitle titlefont font-bold mb-2`}>
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

          <div className="image-container">
            {imageUrl ? (
              <Link href="/[slug]/" as={`/${slug}/`}>
                <Image
                  className={`defaultImage sm:float-right`}
                  src={imageUrl}
                  alt="Post Image"
                  width={2480}
                  height={1395}
                  // width={2040}
                  // height={809.8}
                  // priority
                  blurDataURL="URL"
                  placeholder="blur"
                  loading="lazy"
                />
              </Link>
            ) : (
              <Link href="/[slug]/" as={`/${slug}/`}>
                <Image
                  className={`defaultImage sm:float-right`}
                  src={altImg}
                  alt="Post Image"
                  width={2480}
                  height={1395}
                  // width={2040}
                  // height={809.8}
                  priority
                />
              </Link>
            )}

            {type == "branded-videos" || type == "videos" ? (
              <div className="vid-icon">
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  color="#eeeeeee8"
                  size="4x"
                  // beatFade
                ></FontAwesomeIcon>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefaultPost;
