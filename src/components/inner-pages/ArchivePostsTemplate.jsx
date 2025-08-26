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
  const d = moment(date, "MMM D, YYYY", true);
  const formattedDate = d.isValid() ? d.format("YYYY/MM/DD") : "Invalid Date";

  const [updateComplete, setUpdateComplete] = useState(false);
  const rightContainerRef1 = useRef(null);

  // Handle first load
  useEffect(() => {
    if (localStorage.getItem("firstLoadDone") === null) {
      localStorage.setItem("firstLoadDone", "1");
      console.log("Initial load");
    } else {
      console.log("Page refresh");
    }
  }, []);

  // Update post views after 10 seconds
  useEffect(() => {
    if (updateComplete) return;

    const timer = setTimeout(async () => {
      try {
        await updatePostviews({ postId });
        setUpdateComplete(true);
      } catch (error) {
        console.error("Error updating post view count:", error);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [postId, updateComplete]);

  // Use vertical image for mobile if available
  const mobileImage = verticalImageUrl || imageUrl;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* Featured Image */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        {/* Mobile Image */}
        <div className="md:hidden w-full aspect-[4/5]">
          <Image
            src={mobileImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block w-full aspect-[16/9] max-h-[600px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Headline & Metadata */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{date}</span>
            {categoryId && (
              <>
                <span>|</span>
                <CategoryLink categoryId={categoryId} />
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>

          <div
            className="text-base md:text-lg text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div className="flex-1 min-w-0">
            {/* Share Buttons (Sticky on desktop) */}
            <div className="sticky top-24 mb-6 max-w-sm">
              <PostShare slug={slug} title={title} excerpt={excerpt} />
            </div>

            {/* Author */}
            {authorId && (
              <div className="mb-6 border-t pt-6">
                <Author authorId={authorId} />
              </div>
            )}

            {/* Article Body */}
            <div
              className="body-font text-base md:text-lg text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Sidebar (Hidden on mobile) */}
          <div className="lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-24">
            <div className="space-y-6">
              {/* Most Popular */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Most Popular</h2>
                <PostList limit={5} />
              </div>

              {/* Vertical Ad */}
              <div className="mt-8">
                <VerticalAd
                  adClass="w-full"
                  slot="story_top_right_vertically_long_300*500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Stories (Full Width) */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <StoryBottomList category_id={categoryId} limit={3} />
        </div>
      </div>

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Archives;