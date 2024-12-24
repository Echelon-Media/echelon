import React from "react";
import Image from "next/image";
import textimage from "@/images/Capture2.PNG";

export default function FestivalRightSubSections() {
  return (
    <>
      <div className="home-festival-sub-section-wrapper">
        <div className="home-festival-sub-section-image">
          <Image src={textimage} alt="" />
        </div>
        <div className="home-festival-sub-section-bottom">
          <div className="home-festival-sub-section-title">
            How to balance a big job with a big side hustle
          </div>
        </div>
      </div>
    </>
  );
}
