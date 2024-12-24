import Navbar from "@/components/Navbar";
import Image from "next/image";
import imageurl from "../../images/Capture6.jpg";
import PostList from "@/components/home-components/PostList";
import Footer from "@/components/Footer";
import PostShare from "@/components/story-components/PostShare";
import CategoryLink from "../CategoryLink";
import YouTubeEmbed from "../story-components/YoutubeEmbed";
import StoryBottomList from "../story-components/StoryBottomList";
import MoreVideos from "../story-components/MoreVideos";
import ScrollToTop from "../story-components/ScrollToTop";
import { useEffect, useState } from "react";
import logo from "@/images/favicon.png";

const Video = ({
  postId,
  title,
  excerpt,
  content,
  imageUrl,
  author,
  date,
  categoryId,
  youtubeId,
  slug,
  resolution,
  videoThumbnail,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let screenWidth = window.innerWidth;

    if (screenWidth > 760) {
      setIsDesktop(true);
    }
  }, []);
  console.log("thumbnail is -", videoThumbnail);

  const display = isDesktop ? "flex" : "block";
  return (
    <>
      <div className="top-box bg-black pl-10">
        <div className="flex logo-echelon">
          <Image src={logo} width={10} height={10} />
          <span>{"Echelon Studio"}</span>
        </div>
        <div className="paid-content-text">
          <span>Branded Content</span>
        </div>
      </div>
      <div className={`video-top pt-10 ${display}`}>
        <div>
          <CategoryLink categoryColor={"#fffff"} categoryId={categoryId} />
          <h1 className="story-headline titlefont text-white ">{title}</h1>

          <div className="date-byline">
            <span className="video-date">{date}</span>
          </div>
          <div className="video-share">
            <PostShare slug={slug} title={title} excerpt={excerpt} />
          </div>
        </div>

        <div className="embed-video-container ml-10">
          <YouTubeEmbed
            videoId={youtubeId}
            title={title}
            thumbnail={videoThumbnail}
          />
        </div>
      </div>

      <div className="story-container video-story">
        <div className="video-post-content">
          <div
            className="body-font"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>

      {/* <MoreVideos id={postId} /> */}
      <ScrollToTop />

      <Footer />
    </>
  );
};
export default Video;
