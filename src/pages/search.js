import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSearchResults, getTopStories } from "./api/api";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { Search, X } from "lucide-react";
import VerticalAd from "@/components/ads/verticalAd";

const DefaultPost = dynamic(() =>
  import("@/components/home-components/DefaultPost")
);
const Footer = dynamic(() => import("@/components/Footer"));

// Number of posts per page
const POSTS_PER_PAGE = 10;

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultsCount, setSearchResultsCount] = useState(0);
  const [topStories, setTopStories] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // Helper: perform real search
  const fetchResults = async (kw) => {
    const safeKw = (kw ?? "").toString().trim();

    // If empty keyword -> show top stories
    if (!safeKw) {
      setSearchResults(topStories);
      setSearchResultsCount(topStories.length);
      setTotalPages(Math.max(1, Math.ceil(topStories.length / POSTS_PER_PAGE)));
      setPaginatedData(topStories.slice(0, POSTS_PER_PAGE));
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    try {
      const data = await getSearchResults(safeKw);
      const results = data?.results || [];
      setSearchResultsCount(data?.count ?? results.length);
      setSearchResults(results);
      setTotalPages(Math.max(1, Math.ceil(results.length / POSTS_PER_PAGE)));
      setCurrentPage(1);
      setPaginatedData(results.slice(0, POSTS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching search results:", err);
      setSearchResults([]);
      setPaginatedData([]);
      setSearchResultsCount(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch top stories once on mount
  useEffect(() => {
    const fetchTop = async () => {
      try {
        const response = await getTopStories();
        if (Array.isArray(response)) {
          setTopStories(response);
          // set initial results to top stories
          setSearchResults(response);
          setSearchResultsCount(response.length);
          setTotalPages(
            Math.max(1, Math.ceil(response.length / POSTS_PER_PAGE))
          );
          setPaginatedData(response.slice(0, POSTS_PER_PAGE));
        } else {
          setTopStories([]);
        }
      } catch (error) {
        console.error("Failed to fetch top stories:", error);
        setTopStories([]);
      }
    };

    fetchTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // When keyword changes (typing), we debounce a little and fetch results
  useEffect(() => {
    const safeKw = (keyword ?? "").toString();
    // small debounce
    const t = setTimeout(() => {
      // call the shared fetch function
      fetchResults(safeKw);
    }, 250);

    return () => clearTimeout(t);
    // include topStories so empty search uses latest topStories
  }, [keyword, topStories]);

  // Update paginated data when current page changes
  useEffect(() => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      setPaginatedData([]);
      return;
    }

    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setPaginatedData(searchResults.slice(start, end));
  }, [currentPage, searchResults]);

  // Handle input change (only for input onChange)
  const handleInputChange = (e) => {
    const val = (e?.target?.value ?? "").toString();
    setKeyword(val);
    setCurrentPage(1);
  };

  // Handle Enter key inside input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Immediately fetch using the current value (no debounce wait)
      fetchResults(keyword);
    }
  };

  // Search button click (icon) - trigger fetch
  const handleSearchClick = () => {
    // focus input for UX
    if (inputRef.current) inputRef.current.focus();
    fetchResults(keyword);
  };

  // Clear search
  const handleClear = () => {
    setKeyword("");
    setCurrentPage(1);
    // results will revert to top stories via effect
    if (inputRef.current) inputRef.current.focus();
  };

  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Show pagination only if more than one page
  const showPagination = totalPages > 1 && paginatedData.length > 0;

  return (
    <>
      <Head>
        <title>Search | Echelon</title>
        <meta
          name="description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta
          name="description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link rel="canonical" href="https://echelon.lk/search" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://echelon.lk/search" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Echelon Magazine" />
        <meta
          property="og:description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
        <meta
          property="og:image"
          content="https://echelon.lk/_next/static/media/logo.c39512be.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />

        <meta
          property="og:image"
          content="https://echelon.lk/_next/static/media/logo.c39512be.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk" />
        <meta property="twitter:url" content="https://echelon.lk/search" />
        <meta name="twitter:title" content="Echelon Magazine" />
        <meta
          name="twitter:description"
          content="Echelon stands for the pursuit of intelligent storytelling, spotlighting Sri Lanka’s governance and policy framework, unravelling market intricacies, and profiling the leaders, winning strategies, and bold innovations driving successful businesses. Compelling reads, immersive videos, rich photography, bold graphics, and engaging design enrich our content."
        />
        <meta
          name="twitter:image"
          content="https://echelon.lk/_next/static/media/logo.c39512be.png"
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
          onload="this.media='all'"
        /> */}
      </Head>

      <nav className="w-full py-4 md:py-8 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-[1366px] w-full md:mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center group">
            <Link href={"/"}>
              <p className="px-2 text-white text-3xl md:text-4xl font-bold tracking-wide logo-font transition-all duration-300 group-hover:scale-105 group-hover:text-cyan-400">
                ECHELON
              </p>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center min-w-[280px] max-w-[600px] bg-white/90 rounded-full shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-300">
              <input
                ref={inputRef}
                type="text"
                className="p-2 px-4 w-full bg-transparent text-gray-900 outline-none placeholder-gray-500"
                onChange={handleInputChange}
                value={keyword}
                placeholder="Search..."
                onKeyDown={handleKeyDown}
                aria-label="Search input"
              />

              <button
                type="button"
                onClick={handleSearchClick}
                className="w-12 h-12 flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Clear button */}
              {keyword && (
                <button
                  onClick={handleClear}
                  className="px-3 py-2 text-sm font-medium rounded-full text-black hover:font-bold  transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-[1366px] mx-auto flex flex-col lg:flex-row items-start justify-between px-4 min-h-[80vh] gap-6 py-8">
        {/* Left Side - Search Results */}
        <div className="flex-1 mt-2">
          {loading && (
            <div className="mb-4 text-sm text-gray-600">Searching...</div>
          )}

          {searchResults.length !== 0 && keyword !== "" && (
            <h2 className="font-bold text-2xl md:text-3xl mb-6">
              {resultsCount} results found for "{keyword}"
            </h2>
          )}

          <ul className="space-y-6">
            {paginatedData.map((post, index) => (
              <DefaultPost
                key={post.slug ?? index}
                category={post.category}
                headline={post.title}
                strapline={post.excerpt}
                imageUrl={
                  typeof post.featured_image === "string"
                    ? post.featured_image
                    : Array.isArray(post.featured_image)
                    ? post.featured_image[0]
                    : ""
                }
                slug={post.slug}
                type={post.post_type}
              />
            ))}

            {/* show a friendly "no results" message */}
            {!loading && searchResults.length === 0 && (
              <div className="text-gray-600 py-8">
                No results found. Try different keywords or clear the search to
                view top stories.
              </div>
            )}
          </ul>
        </div>

        {/* Right Side - Sticky Ad + Pagination */}
        <aside className="hidden lg:block w-[320px] mt-2">
          <div className="sticky top-20 flex flex-col items-center gap-6">
            <div className="w-full">
              <VerticalAd
                adClass=""
                slot="home_top_right_vertically_long_300*500"
              />
            </div>

            {/* {showPagination && (
      <div className="w-full bg-white shadow-md p-4 rounded-lg">
        <div className="flex flex-col gap-3">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 w-full rounded-lg font-medium transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="text-center text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 w-full rounded-lg font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    )} */}
          </div>
        </aside>
      </section>

      {/* Mobile / small screens: show ad + pagination below content so they're always accessible */}
      <div className="lg:hidden max-w-[1366px] mx-auto px-4 pb-8">
        <div className="w-full mb-6">
          <VerticalAd
            adClass=""
            slot="home_top_right_vertically_long_300*500"
          />
        </div>

        {showPagination && (
          <div className="w-full flex items-center justify-between gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>

            <div className="text-gray-700 font-semibold whitespace-nowrap">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* Pagination - bottom center */}
      {showPagination && (
        <div className="flex justify-center my-10">
          <div className=" shadow-lg border  rounded-full px-6 py-3 flex items-center gap-4">
            <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Prev
            </button>
            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Next
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SearchPage;
