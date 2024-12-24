import dynamic from "next/dynamic";

const FeaturedPost = dynamic(() =>
  import("@/components/home-components/FeaturedPost")
);
const DefaultPost = dynamic(() =>
  import("@/components/home-components/DefaultPost")
);

const PostSection = ({ homePagePosts }) => {
  return (
    <>
      <div className="desktop-left-side sm-full">
        {homePagePosts.map((post, index) => (
          <>
            {post.type === "featured" ? (
              <FeaturedPost
                category={post.category}
                headline={post.title}
                strapline={post.excerpt}
                imageUrl={post.featured_image}
                slug={post.slug}
                type={post.type}
                key={index+1}
              />
            ) : (
              <DefaultPost
                category={post.category}
                headline={post.title}
                strapline={post.excerpt}
                imageUrl={post.featured_image}
                slug={post.slug}
                type={post.type}
                key={index+1}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default PostSection;
