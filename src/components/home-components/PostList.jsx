import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPopularPosts } from "@/pages/api/api";

const PostList = () => {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    async function fetchData() {
      try {
        // Check if popular posts exist in localStorage
        const cachedPosts = localStorage.getItem("popularPosts");
        if (cachedPosts) {
          setPopularPosts(JSON.parse(cachedPosts));
        } else {
          // Fetch data from API if not cached
          const results = await getPopularPosts();         
          if (results?.data?.length > 3) {
            setPopularPosts(results?.data?.slice(0, 5));
            // Cache the fetched data in localStorage
            localStorage.setItem("popularPosts", JSON.stringify(results?.data?.slice(0, 5)));
          }
        }
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {popularPosts.map((post, index) => (
        <div className="listrow flex" key={index}>
          <div className={`listTextContainer sm:w-5/6 min-w-5/6`}>
            <Link
              href={`/category/[slug]`}
              as={`/category/${post?.category
                .toString()
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              <div className="w-1/4 category-text sm:float-left">
                {post.category}
              </div>
            </Link>
            <Link href={`/${post.slug}`} key={index}>
              <h2 className={`listTitle mb-2`}>
                {post.title
                  ?.replace(/&#8217;/g, "'")
                  ?.replace(/(^|\.\s+)([a-z])/g, (match) => match)}
              </h2>
            </Link>
          </div>
          <Image
            className={`listImage sm:float-right`}
            src={post.featured_image}
            alt={post.title}
            width={2480}
            height={1395}
          />
        </div>
      ))}
    </>
  );
};

export default PostList;