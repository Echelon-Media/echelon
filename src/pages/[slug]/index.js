import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import moment from "moment";
import NotFound from "../../components/inner-pages/NotFound";
import Navbar from "@/components/Navbar";
import BannerAd from "../../components/ads/BannerAd";
import MobileAd from "../../components/ads/MobileAd";
import { useRouter } from "next/router";

const Story = dynamic(() => import("@/components/inner-pages/StoryTemplate"));
const Featured = dynamic(() =>
  import("@/components/inner-pages/FeaturedTemplate")
);
const Archives = dynamic(() =>
  import("@/components/inner-pages/ArchivePostsTemplate")
);
const BrandVoice = dynamic(() =>
  import("@/components/inner-pages/BrandvoiceTemplate")
);
const Video = dynamic(() => import("@/components/inner-pages/VideoTemplate"));
const BrandedVideo = dynamic(() =>
  import("@/components/inner-pages/BrandedVideoTemplate")
);






function Post({ post, type }) {

  const router = useRouter();
  if (post == null) {
    router?.push("/404");
    return null; // Return null to prevent rendering the rest of the component
  } else {
    const renderPostTemplate = () => {
      const [copyClass, setCopyClass] = useState(" ");

      const innerComponentMap = {
        videos: Video,
        branded: BrandVoice,
        featured: Featured,
        brandedvideos: BrandedVideo,
        infographics: Featured,
        stories: Story,
        posts: Archives,
      };

      const Component = innerComponentMap[type];

      const date = new Date(post?.date);

      // Options for formatting the date
      const correctCasedTitle = post?.title.rendered
        .replace(/&#8217;/g, "'")
        .replace(/&#038;/g, "&")
        .replace(/&#8211;/g, "-") // Replace &rsquo; with '
        .replace(/(^|\.\s+)([a-z])(?!\b(?:a|an)\b)/g, (match) => match); // Capitalize the first letter of each sentence
      // Format the date using toLocaleDateString
      const formattedDate = moment(date).format("MMM D, YYYY");
      //date.toLocaleDateString("en-US", options);
      const resolution = post?.acf?.video_resolution_type
        ? post?.acf?.video_resolution_type
        : "";

      const companyName = post?.acf?.company_name
        ? `|  ${post.acf.company_name}`
        : "";

      const thumbnail = post?.thumbnail_url ? post.thumbnail_url : "";

      // console.log('co title - ', correctCasedTitle);

      // console.log("thumbnail -", thumbnail);

      if (Component) {
        return (
          <>
            <Component
              postId={post.id}
              title={correctCasedTitle}
              content={post.content.rendered}
              excerpt={post.excerpt.rendered}
              date={formattedDate}
              imageUrl={post.featured_image_url}
              categoryId={post.categories[0]}
              youtubeId={post.acf.yout_tube_video_url}
              verticalImageUrl={post.vertical_image_url}
              verticalImagecaption={post.acf.vertical_image_caption}
              sponseredLogo={post.sponsered_logo_url}
              author={post.author_name}
              authorId={post.acf.author}
              slug={post.slug}
              copyClass={copyClass}
              resolution={resolution}
              companyName={companyName}
              videoThumbnail={thumbnail}
            />
          </>
        );
      } else {
        return <NotFound />;
      }
    };

    const postUrl = `https://echelon.lk/${post.slug}`;

    // const metaDesc = post.excerpt.rendered.replace(/<p[^>]*>/g, "");
    const ogTitile = post.yoast_head_json.title;
    const metaDesc = post.yoast_head_json.og_description;
    const ogImage =
      post.yoast_head_json.og_image?.[0]?.url || post.featured_image_url;

    // console.log(`og imag is : `, ogImage);
    return (
      <>
        <Head>
          {/* */}
          <title>{ogTitile}</title>
          <meta
            name="description"
            content={`${metaDesc} | Echelon.
            `}
          />

          <link rel="canonical" href={postUrl} />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <meta name="robots" content="index, follow"></meta>
          <meta name="nogooglebot" content="index, follow"></meta>
          <meta property="og:type" content={"article"} />
          <meta property="og:modified_time" content={post.date} />
          {/* <!-- Facebook Meta Tags --> */}
          {/* og:image:secure_url */}
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:url" content={postUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />
          <meta
            data-n-head="ssr"
            data-hid="og:image:type"
            property="og:image:type"
            content="image/png"
          ></meta>
          <meta property="og:title" content={ogTitile} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:type" content="image" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:type" content="image/jpg" />
          {/* <!-- Twitter Meta Tags --> */}
          <meta property="twitter:domain" content="neonmedia.lk" />
          <meta property="twitter:url" content={postUrl} />
          <meta name="twitter:title" content={ogTitile} />
          <meta name="twitter:description" content={metaDesc} />
          <meta name="twitter:image" content={ogImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:alt" content={ogTitile} />
          
        </Head>
        {post.type == "branded" || post.type == "brandedvideos" ? (
          <></>
        ) : (
          <>
            {/* <BannerAd /> */}
            {/* <MobileAd /> */}
          </>
        )}

        <Navbar />

        {renderPostTemplate()}

        {/* <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const isInitialLoad = !context.req.headers.referer;

  const type = null;

  const BASE_URL = "http://localhost/echelon-revamp/backend/wp-json/wp/v2/";
  const LIVE_BASE_URL = "https://backend.echelon.lk/wp-json/wp/v2/";

  const { slug } = context.params;

  const postTypes = [
    "stories",
    "featured",
    "infographics",
    "videos",
    "branded",
    "brandedvideos",
    "posts",
  ]; // Define  post types

  try {
    for (const postType of postTypes) {
      const response = await fetch(`${LIVE_BASE_URL}${postType}?slug=${slug}`);
      const posts = await response.json();

      if (Array.isArray(posts) && posts.length > 0) {
        return {
          props: {
            post: posts[0],
            type: postType,
          },
        };
      }
    }

    return {
      props: {
        post: null,
        type,
        isInitialLoad,
      },
    };
  } catch (error) {
    // console.error("Error fetching post:", error);

    return {
      props: {
        post: null,
      },
    };
  }
}

export default Post;
