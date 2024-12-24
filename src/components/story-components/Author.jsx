import { useEffect, useState } from "react";
import { getAuthor } from "../../pages/api/api";
import Link from "next/link";

const Author = ({ authorId }) => {
  const [author, setAuthorName] = useState([]);

  useEffect(() => {
    async function FetchData() {
      try {
        const authorData = await getAuthor(`/${authorId}`);
        setAuthorName(authorData);
      } catch (error) {
        throw error;
      }
    }
    FetchData();
  }, []);

  return (
    <>
      {author ? (
        <>
          by{" "}
          <span className="story-byline">
            {" "}
            <Link href={"/author/[slug]"} as={`/author/${author?.slug}`}>
              {author?.name}
            </Link>
          </span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Author;
