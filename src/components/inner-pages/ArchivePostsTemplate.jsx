import Navbar from "@/components/Navbar";
import Image from "next/image";
import PostList from "@/components/home-components/PostList";
import PostShare from "@/components/story-components/PostShare";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import CategoryLink from "../CategoryLink";
import moment from "moment";
import StoryBottomList from "../story-components/StoryBottomList";
import { updatePostviews } from "@/pages/api/api";
import VerticalAd from "../ads/verticalAd";
import Head from "next/head";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import Author from "../story-components/Author";

const Archives = ({
  title,
  excerpt,
  content,
  imageUrl,
  author,
  date,
  categoryId,
  postId,
  verticalImageUrl,
  verticalImagecaption,
  slug,
  authorId,
}) => {
  // ✅ Safely parse date with explicit format
  const d = moment(date, "MMM D, YYYY", true);
  const formattedDate = d.isValid() ? d.format("YYYY/MM/DD") : "Invalid Date";

  const [updateComplete, setUpdateComplete] = useState(false);

  // ✅ Fix: Define missing ref
  const rightContainerRef1 = useRef(null);

  // Handle first load
  useEffect(() => {
    if (localStorage.getItem("firstLoadDone") === null) {
      localStorage.setItem("firstLoadDone", "1");
      console.log("This is the initial load");
    } else {
      console.log("This is a page refresh");
    }
  }, []);

  // Update post views after 10 seconds
  useEffect(() => {
    if (updateComplete) return;

    const timer = setTimeout(async () => {
      try {
        await updatePostviews({ postId });
        setUpdateComplete(true);
        console.log("Post view updated successfully");
      } catch (error) {
        console.error("Error updating post view count:", error);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [postId, updateComplete]);

  // ✅ Preserve mobile image logic
  const mobileImage = verticalImageUrl || imageUrl;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>

      <Navbar />

      {/* Featured Image Container */}
      <div className="featured-image-container">
        {/* Mobile Image (hidden on desktop) */}
        <div className="mobile-image-and-caption hidden">
          <Image
            className="featured-page-image"
            src={mobileImage}
            alt={title}
            width={1200}
            height={1650}
            priority
          />
        </div>

        {/* Desktop Image */}
        <Image
          className="featured-page-image featured-desktop-image"
          src={imageUrl}
          alt={title}
          width={2480}
          height={1395}
          priority
        />
      </div>

      {/* Headline Container */}
      <div className="featured-headline-container">
        <div>
          <div style={{ display: "flex", paddingTop: "2%" }}>
            <span className="story-date">{date}</span>
            {categoryId && (
              <>
                <span style={{ margin: "-0.10% 1% 0" }}>|</span>
                <CategoryLink categoryId={categoryId} />
              </>
            )}
          </div>

          <h1 className="story-headline titlefont">{title}</h1>

          <h6
            className="story-strapline featured-strap"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></h6>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex items-start justify-between max-w-[1500px] mx-auto">
        {/* Left Side: Article Content */}
        <div className="min-w-[50%] w-full max-w-[900px]">
          <div className="story-post-content">
            {/* Desktop Share Icons */}
            <div style={{ position: "relative", marginTop: "3%" }}>
              <PostShare slug={slug} title={title} excerpt={excerpt} />
            </div>

            {/* Author & Content */}
            <div style={{ marginLeft: "5%" }}>
              <div className="date-byline">
                {authorId && <Author authorId={authorId} />}
              </div>
              <div
                className="body-font"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div
          className="home-second-section-right-side-container"
          ref={rightContainerRef1}
        >
          {/* Most Popular Header */}
          <div className="home-popular-header-wrapper">
            <h2
              className="text-xl text-black home-popular-header homepage-popular"
              style={{ color: "black !important" }}
            >
              Most Popular
            </h2>
          </div>

          {/* Most Popular Posts List */}
          <PostList />

          {/* Vertical Ad */}
          <div className="home-second-section-right-side-content mt-10 mb-2">
            <VerticalAd
              adClass=""
              slot="story_top_right_vertically_long_300*500"
            />
          </div>
        </div>
      </div>

      {/* Related Stories */}
      <StoryBottomList category_id={categoryId} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Archives;