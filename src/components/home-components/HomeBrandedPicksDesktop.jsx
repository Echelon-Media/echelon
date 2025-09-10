import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBrandedPicks } from "@/pages/api/api";

const HomeBrandedPicksDesktop = () => {
  const [brandVoicePicks, setBrandVoicePicks] = useState([]);

  useEffect(() => {
    async function FetchBrandedPicks() {
      try {
        const results = await getBrandedPicks();
        console.log("branded desktop", results);

        if (results && results.length >= 0) {
          const slicedResults = results.slice(0, results.length +1);
          // console.log("branded desktop", slicedResults);
          setBrandVoicePicks(slicedResults);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    FetchBrandedPicks();
  }, []);

  return (
    <div className="home-brand-voice-picks-main-wrapper-desktop">
      {brandVoicePicks.map((brandVoicePick, index) => (
        <div key={index} className="home-brand-voice-pick-component-wrapper-desktop">
          <div className="home-brand-voice-pick-content-desktop">
            <Image
              src={brandVoicePick?.vertical_image.trim()}
              alt={brandVoicePick?.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="home-brand-voice-pick-gradient-overlay-desktop"></div>
            <div className="home-brand-voice-pick-bottom-wrapper-desktop">
              <Link href={`/${brandVoicePick?.slug}`}>
                <div className="home-brand-voice-pick-caption-desktop">{brandVoicePick?.vertical_image_caption}</div>
                <div className="home-brand-voice-pick-title-desktop titlefont">{brandVoicePick?.title}</div>
              </Link>
            </div>
          </div>
          <hr className="home-brand-voice-pick-bottom-hr" />
        </div>
      ))}
    </div>
  );
};

export default HomeBrandedPicksDesktop;
