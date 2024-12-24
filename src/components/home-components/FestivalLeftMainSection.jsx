import React from "react";
import Image from "next/image";
import textimage from "@/images/Capture1.PNG";
// import textimage from "/images/Capture1.PNG";

export default function FestivalLeftMainSection() {
  return (
    <>
      <div className="home-festival-main-section-wrapper">
        <div className="home-festival-main-section-image">
          <Image src={textimage} alt="" />
        </div>
        <div className="home-festival-main-section-bottom">
          <div className="home-festival-main-section-title">
            {
              "Fortnite' maker Epic Games lays off 830 employees, 16% of workforce"
            }
          </div>
        </div>
      </div>
    </>
  );
}
