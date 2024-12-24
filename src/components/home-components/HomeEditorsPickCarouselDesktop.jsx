import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getEditorsPicks } from "@/pages/api/api";

const HomeEditorsPickCarouselDesktop = () => {
  const [editorsPicks, setEditorsPicks] = useState([]);

  const dataPromise = getEditorsPicks();

  useEffect(() => {
    async function FetchEditorsPicks() {
      try {
        const results = await getEditorsPicks();

        if (results.length > 0) {
          setEditorsPicks(results);
          console.log("editors", item.slug);
        }
      } catch (error) {
        //console.error("Error fetching editorials:", error);
      }
    }

    FetchEditorsPicks();
  }, []);

  return (
    <div className="editors-pick-carousel-container">
      {editorsPicks.map((item, index) => (
        <div key={index}>
          <Link href={`/${item.slug}`}>
            <div className="editors-pick-carousel-box-wraper">
              <div className="editors-pick-carousel-image">
                <Image
                  src={item.featured_image}
                  alt={item.title}
                  width={500}
                  height={200}
                />
              </div>
              <div className="editors-pick-carousel-bottom">
                <div className="editor-picks-carousel-category">
                  {item.category}
                </div>
                <div className="editors-pick-carousel-title titlefont">
                  {item.title}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeEditorsPickCarouselDesktop;
