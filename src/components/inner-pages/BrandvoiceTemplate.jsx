import Navbar from "@/components/Navbar";
import Image from "next/image";
import PostList from "@/components/home-components/PostList";
import Footer from "@/components/Footer";
import PostShare from "@/components/story-components/PostShare";
import BrandVoiceTop1 from "@/components/story-components/BrandVoiceTop1";
import BrandVoiceTop2 from "@/components/story-components/BrandVoiceTop2";
import brandlogo from "../../images/Capture4.PNG";
import { useEffect, useState } from "react";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import { updatePostviews } from "@/pages/api/api";

const Video = ({

  title,
  excerpt,
  content,
  imageUrl,
  author,
  date,
  categoryId,
  youtubeId,
  verticalImageUrl,
  verticalImagecaption,
  sponseredLogo,
  postId,
  slug,
  companyName
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [updateComplete, setUpdateComplete] = useState(false);

  useEffect(() => {
    const updateViews = async () => {
      try {
        await updatePostviews({ postId });
        setUpdateComplete(true);
        console.log(`post view update successfully`);
      } catch (error) {
        console.error("Error updating post view count:", error);
      }
    };

    const timeout = setTimeout(() => {
      if (!updateComplete) {
        updateViews();
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [updateComplete]);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      const left = document.getElementById("branded-post-content");
      let screenWidth = window.innerWidth;

      const leftHeight = left ? left.scrollHeight : 0;
      if (screenWidth > 760) {
        setIsDesktop(true);
        if (winTop > 1200 && winTop <= leftHeight + 500) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const socialShareStyle = isFixed
    ? {
        position: "fixed",
        top: "15%",
        left: "28.4%",
        margin: "0% % 0% -5%",
      }
    : { position: "relative", marginTop: "3%", left: "10.4%" };

  const paragraphStyle = isFixed
    ? { marginLeft: "20%" }
    : { marginLeft: "15%" };

  const paddingInnerShareMobile = sponseredLogo
    ? { padding: "10% 0 5%" }
    : { padding: "2% 0 7%" };

  return (
    <>
   
      {!verticalImageUrl ? (
        <BrandVoiceTop1
          isDesktop={isDesktop}
          title={title}
          strap={excerpt}
          image={imageUrl}
          date={date}
          categoryId={categoryId}
          coompanyName={companyName}
        />
      ) : (
        <BrandVoiceTop2
          title={title}
          strap={excerpt}
          image={verticalImageUrl}
          date={date}
          caption={verticalImagecaption}
          categoryId={categoryId}
          companyName={companyName}
        />
      )}
      <div className=" brandvoice-container story-container">
        <div id="branded-post-content" className="branded-post-content">
          <div style={socialShareStyle} className="desktop-share">
            <PostShare slug={slug} title={title} excerpt={excerpt} />
          </div>

          <div
            className="branded-body"
            style={isDesktop ? paragraphStyle : { margin: 0 }}
          >
            {!isDesktop ? (
              <>
                <div className="mobile-story-share-icons">
                  <PostShare
                    padding={paddingInnerShareMobile}
                    slug={slug}
                    title={title}
                    excerpt={excerpt}
                  />
                </div>
                {sponseredLogo ? (
                  <>
                    {" "}
                    <div className="mobile-share-and-body-content">
                      <div className="brand-partnership">
                        <p>Brand Partnership with</p>
                        <Image src={sponseredLogo} height={150} width={150} />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {sponseredLogo ? (
                  <>
                    {" "}
                    <div className="mobile-share-and-body-content">
                      <div className="brand-partnership">
                        <p>Brand Partnership with</p>
                        <Image src={sponseredLogo} height={150} width={150} />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            <div
              className="body-font"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
        <ScrollToTop />
      </div>

      <Footer />
    </>
  );
};
export default Video;
