import Head from "next/head";
import { getCategory, getCategoryPosts } from "@/pages/api/api";
import Navbar from "@/components/Navbar";
// import PostList from "@/components/home-components/PostList";
import PostSection from "@/components/home-components/PostSection";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideoCategories, getVideoCategoryPosts } from "@/pages/api/api";
import dynamic from "next/dynamic";

const PostList = dynamic(() => import("@/components/home-components/PostList"));

export default function VideoCategoryPage({ categoryName, posts, slug }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [seeMoreCount, setSeeMoreCount] = useState(2);
  const [hideButton, setHideButton] = useState(false);
  const [morePosts, setSeeMorePosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      // const leftHeight = left ? left.scrollHeight : 0;

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
    async function fetchCategoryPosts() {
      try {
        const response = await getVideoCategoryPosts(slug, seeMoreCount, 2);
        if (response.results.length >= 0) {
          setTotalPages(response.max_pages);
          setSeeMorePosts((prevPosts) => [...prevPosts, ...response.results]);
        } else {
        }

        if (response.max_pages <= seeMoreCount) {
          setHideButton(true);
        }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    }

    fetchCategoryPosts();
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
      <h1 className="category-page-litle">{categoryName}</h1>
      <main id="main">
        <div>
          <PostSection homePagePosts={posts} />
          <div className="category-seemore-posts-desktop">
            <PostSection homePagePosts={morePosts} />
          </div>
        </div>

        <div className="desktop-right-side sm-fulls">
          <div
            className={`postList category-page-post-list`}
            // style={
            //   isDesktop
            //     ? { marginTop: "5vh", marginLeft: "3%" }
            //     : { margin: " 15% 2%" }
            // }
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
        <div className="d-none category-seemore-posts-mobile">
          <PostSection homePagePosts={morePosts} />
        </div>
      </main>
      {!hideButton && (
        <div className="see-more-button-wrapper">
          <button onClick={handleSeeMoreClick} className="see-more-button">
            See More Stories
          </button>
        </div>
      )}

      <ScrollToTop />

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  try {
    const category = await getVideoCategories(slug);
    const categoryName = category[0].name;
    const data = await getVideoCategoryPosts(slug, 1, 2);
    const categoryPosts = data.results;
    const posts = categoryPosts.length > 0 ? categoryPosts : [];

    return {
      props: {
        categoryName,
        posts,
        slug,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryName: "",
        posts: [],
      },
    };
  }
}
