import { useEffect, useState } from "react";
import { getIssuesPosts } from "../../api/api";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import PostSection from "@/components/home-components/PostSection";
import { useRouter } from "next/router";
import PostList from "@/components/home-components/PostList";
import Footer from "@/components/Footer";

const MagIssu = ({ posts, slug }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [seeMoreCount, setSeeMoreCount] = useState(1);
  const [hideButton, setHideButton] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      let screenWidth = window.innerWidth;

      if (screenWidth > 760) {
        setIsDesktop(true);
        if (winTop > 400 && winTop <= winTop) {
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

  useEffect(() => {
    async function fetchIssuesPosts() {
      try {
        const results = await getIssuesPosts(slug, seeMoreCount);
        if (results.results.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...results.results]);
        } else {
         
        }

          if (response.max_pages < seeMoreCount) {
            setHideButton(true);
          }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    }

    fetchIssuesPosts();
  }, [seeMoreCount]);

  const handleSeeMoreClick = () => {
    setSeeMoreCount((prevCount) => prevCount + 1);
  };

  const popularFixed = isFixed
    ? "popular-fixed-category"
    : "popular-relative-category";

  return (
    <>
      <Head>
        <title> {slug} Magazine Issue Stories | Echelon </title>
        <meta
          name="description"
          content={`${slug} Magazine Issue - All Stories`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta
          name="description"
          content={`${slug} Magazine Issue - All Stories`}
        />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link rel="canonical" href={`https://echelon.lk/${slug}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={`https://echelon.lk/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${slug} Stories - Echelon`} />
        <meta
          property="og:description"
          content={`${slug} Magazine Issue - All Stories`}
        />
        <meta
          property="og:image"
          content="https://testing.echelon.lk/_next/static/media/logo.c39512be.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />

        <meta
          property="og:image"
          content="https://testing.echelon.lk/_next/static/media/logo.c39512be.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk" />
        <meta property="twitter:url" content={`https://echelon.lk/${slug}`} />
        <meta name="twitter:title" content={`${slug} Stories - Echelon`} />
        <meta
          name="twitter:description"
          content={`${slug} Magazine Issue - All Stories`}
        />
        <meta
          name="twitter:image"
          content="https://testing.neonmedia.lk/_next/static/media/logo.c39512be.png"
        />

        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>

      <Navbar />
      <main id="main" style={{ paddingTop: "5%" }}>
        <PostSection homePagePosts={posts} />

        <div className="desktop-right-side sm-fulls">
          <div
            className={`postList `}
            style={
              isDesktop
                ? { marginTop: "6vh", marginLeft: "3%" }
                : { margin: " 15% 2%" }
            }
          >
            <div className={`${popularFixed}`}>
              <div className="list-header bg-black h-10 ">
                <h2 className=" text-xl text-white home-popular-header ">
                  Most Popular
                </h2>
                <div className="hr" />
              </div>
              <PostList />
            </div>
          </div>
        </div>
      </main>
      {!hideButton && (
        <div className="see-more-button-wrapper">
          <button onClick={handleSeeMoreClick} className="see-more-button">
            See More Stories
          </button>
        </div>
      )}
      <screenTop />
      <Footer />
    </>
  );
};

export default MagIssu;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const postsData = await getIssuesPosts(slug, 1);
    const posts = postsData.results || [];

    return {
      props: {
        posts,
        slug,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
        slug,
      },
    };
  }
}
