import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getAllPostsPaginate } from "../api/api";
import PostSection from "@/components/home-components/PostSection";
import Loading from "@/components/Loading";
import PostList from "@/components/home-components/PostList";
import Head from "next/head";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
const ScrollToTop = dynamic(() =>
  import("@/components/story-components/ScrollToTop")
);

const PaginatePosts = () => {
  const router = useRouter();
  const { pageNumber } = router.query;
  const pageNumberAsNumber = parseInt(pageNumber, 10);

  const [set1, setSet1] = useState([]);
  const [set2, setSet2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const perPage = 30;

  useEffect(() => {
    if (pageNumberAsNumber) {
      fetchPosts(pageNumberAsNumber);
    }
  }, [pageNumberAsNumber]);

  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const results = await getAllPostsPaginate(perPage, pageNumber);
      setTotalPages(results?.max_pages); // Ensure totalPages is a number
      setSet1(results.results.slice(0, 15)); // Ensure this is an array
      setSet2(results.results.slice(15, 30)); // Ensure this is an array
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pageNumberAsNumber < totalPages) {
      const nextPage = pageNumberAsNumber + 1;
      router.push(`/page/${nextPage}`);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumberAsNumber > 1) {
      const previousPage = pageNumberAsNumber - 1;
      router.push(`/page/${previousPage}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;
      const screenWidth = window.innerWidth;

      if (screenWidth > 760) {
        setIsDesktop(true);
        setIsFixed(winTop > 400);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const popularFixed = isFixed ? "popular-fixed" : "popular-relative-story";
  const leftMargin = isFixed ? "3%" : "12%";

  return (
    <>
      <Head>
        <title>All Stories - Echelon</title>
        <meta name="description" content="All stories on Echelon Magazine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://echelon.lk" />
        <meta property="og:url" content="https://echelon.lk/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Echelon Magazine" />
        <meta property="og:image" content="https://echelon.lk/logo.png" />
      </Head>

      <Navbar />
      <br />

      {loading ? (
        <Loading />
      ) : (
        <>
          <main id="main" className="lg:max-w-screen-xl">
            <div className="paginationpage">
              <PostSection homePagePosts={set1} />
            </div>

            <div className="desktop-right-side sm-fulls">
              <div
                className={`postList ${popularFixed}`}
                style={
                  isDesktop
                    ? { marginTop: "9.5vh", marginLeft: leftMargin }
                    : { margin: "15% 2%" }
                }
              >
                <div className="list-header bg-black h-10">
                  <h2 className="text-xl text-white home-popular-header">
                    Most Popular
                  </h2>
                  <div className="hr" />
                </div>
                <PostList />
              </div>
            </div>
          </main>

          <main id="main" className="max-w-screen-md lg:max-w-screen-xl">
            <div className="paginationpage">
              <PostSection homePagePosts={set2} />
            </div>
          </main>
        </>
      )}

      <div className="pagination-bar items-center flex justify-between">
        {pageNumberAsNumber !== 1 && (
          <div className="pagination-previous-button">
            <button
              onClick={handlePreviousPage}
              className="text-gray-500 hover:text-gray-700"
            >
              Previous
            </button>
          </div>
        )}
        <div className="pagination-page-numbers text-gray-500">
          PAGE {pageNumberAsNumber} OF {totalPages}
        </div>
        {pageNumberAsNumber < totalPages && (
          <div className="pagination-next-button">
            <button
              onClick={handleNextPage}
              className="text-gray-500 hover:text-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ScrollToTop />
      <Footer />
    </>
  );
};

export default PaginatePosts;
