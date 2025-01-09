import Head from "next/head";
import { getCategory, getCategoryPosts } from "@/pages/api/api";
import Navbar from "@/components/Navbar";
import PostList from "@/components/home-components/PostList";
import PostSection from "@/components/home-components/PostSection";
import ScrollToTop from "@/components/story-components/ScrollToTop";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CategoryPage({ categoryName, posts, slug }) {
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
        const response = await getCategoryPosts(slug, seeMoreCount);
        if (response.results.length >= 0) {
          setTotalPages(response.max_pages);
          setSeeMorePosts((prevPosts) => [...prevPosts, ...response.results]);
        } else {
          // setHideButton(true);
        }
        if (response.max_pages < seeMoreCount) {
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

  console.log("max-pages - ", totalPages);

  return (
    <>
      <Head>
        <title> {categoryName} | Echelon </title>
        <meta
          name="description"
          content={`All Stories of the ${categoryName} Category`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta
          name="description"
          content={`All Stories of the ${categoryName} Category`}
        />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link rel="canonical" href={`https://echelon.lk/category/${slug}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property="og:url"
          content={`https://echelon.lk/category/${slug}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${categoryName} Stories - Echelon`}
        />
        <meta
          property="og:description"
          content={`All Stories of the ${categoryName} Category`}
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
        <meta
          property="twitter:url"
          content={`https://echelon.lk/category/${slug}`}
        />
        <meta
          name="twitter:title"
          content={`${categoryName} Stories - Echelon`}
        />
        <meta
          name="twitter:description"
          content={`All Stories of the ${categoryName} Category`}
        />
        <meta
          name="twitter:image"
          content="https://testing.neonmedia.lk/_next/static/media/logo.c39512be.png"
        />

        {/* <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          media="print"
          onLoad="this.media='all'"
        /> */}
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
    const category = await getCategory(slug);
    const categoryName = category[0].name;
    const data = await getCategoryPosts(slug, 1);
    
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
