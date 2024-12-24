import Image from "next/image";
import { useEffect, useState } from "react";
import { getCategoryPopularPosts } from "../../pages/api/api";
import Link from "next/link";

const StoryBottomList = ({ category_id }) => {
  const [popularPosts, setPopularPosts] = useState([]);
  useEffect(() => {
    async function FetchData() {
      try {
        const results = await getCategoryPopularPosts(category_id);

        if (results?.data?.length > 3) {
          setPopularPosts(results.data);
        }
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      } finally {
      }
    }

    FetchData();
  }, []);

  return (
    <>
      {popularPosts?.length > 3 ? (
        <div className="story-bottom-list mobile-story-bottom-list">
          <div className="story-bottom-list-title">
            <h2>Popular in this category</h2>
          </div>
          <div className="story-bottom-list-content">
            {popularPosts?.map((post, index) => (
              <div className="story-bottom-list-card" key={index}>
                <div className="image">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={300}
                    height={200}
                  ></Image>
                </div>
                <div>
                  <div className="ml-3 category-div-story-bottom">
                    <div className="w-1/4  category-text sm:float-left">
                      {post.category}
                    </div>
                  </div>

                  <div className="story-bottom-list-headlines">
                    <Link href={`/${post.slug}`}>
                      <h3>
                        {post.title
                          ?.replace(/&#8217;/g, "'")

                          ?.replace(/(^|\.\s+)([a-z])/g, (match) => match)}
                      </h3>
                    </Link>
                  </div>
                  {/* <div className="story-bottom-list-strapline">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            impedit voluptates autem perferendis eum animi, 
          </p>
        </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default StoryBottomList;
