import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSearchResults } from "./api/api";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";

const DefaultPost = dynamic(() =>
  import("@/components/home-components/DefaultPost")
);
const Footer = dynamic(() => import("@/components/Footer"));

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultsCount, setSearchResultsCount] = useState("");

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const data = await getSearchResults(keyword);
        setSearchResultsCount(data.count);

        if (data?.results?.length > 0) {
          setSearchResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults();
  }, [keyword]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setKeyword(inputValue);
  };

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

      <nav
        className="fixed w-full z-50 top-0 py-4 backdrop-filter bg-black bg-opacity-90"
        style={{ height: "13%" , display:"block "}} 
      >
        <div className="container  mx-auto flex justify-between items-center">
          <div className=" md:flex search-logo space-x-2">
            <Link href={"/"}>
              <div className="text-white text-xl md:text-4xl sm:text-lg font-bold logo-font">
                ECHELON
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="md:flex search-input items-center w-2/3  space-x-10">
            <input
              type="text"
              className="mr-3 p-1 w-full bg-white border"
              onChange={handleInputChange}
              value={keyword}
            />
            <div className="relative searchicon">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-400">
                <Link href={"/"}>
                  <FontAwesomeIcon icon={faClose} width={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="search-container container  min-h-screen mx-auto mt-20">
          {searchResults.length !== 0 ? (
            <h2 className="font-bold text-3xl">
              {resultsCount} results found for "{keyword}"
            </h2>
          ) : (
            <></>
          )}

          <ul className="mt-10">
            {searchResults.map((post, index) => (
              // <li key={index}>{result.title}</li>
              <DefaultPost
                key={index}
                category={post.category}
                headline={post.title}
                strapline={post.excerpt}
                imageUrl={post.featured_image[0]}
                slug={post.slug}
                type={post.post_type}
              />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
