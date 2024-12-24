import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Text from "@/images/shine50/text.png";
import FadeInWhenVisible from "../motions/FadeInWhenVisible";
import SlideUpWhenVisible from "../motions/SlidesUpWhenVisible";
import pattern from "@/images/shine50/profile-elements/dottedshape.svg";


const ShineContentHomeProfiles = ({ profiles }) => {
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Usage

  // const color1 = "invert(%) sepia(7%) saturate(7%) hue-rotate(-20deg) brightness(105%) contrast(101%)";

  const validProfiles = Array.isArray(profiles) ? profiles : [];

  // Shuffle profiles
  const shuffledProfiles = shuffle([...validProfiles]);

  return (
    <div className="shine-content-home-profile-grid-wrapper">
      <div className="shine-content-home-profile-grid-background-wrapper">
        <Image
          style={{ position: "absolute", margin: "0%", marginLeft: "-20%" }}
          width={150}
          height={200}
          src={pattern}
          alt={`left side pattern`}
        />

        <FadeInWhenVisible>
          <div className="shine-content-home-profile-text-image">
            <Image src={Text} width={1600} height={600} />
          </div>
        </FadeInWhenVisible>
        <SlideUpWhenVisible>
          <div className="shine-content-home-profile-grid">
            {shuffledProfiles.map((profile, index) => (
              <>
                <div
                  key={index}
                  className="shine-content-home-profile-grid-item"
                >
                  <img
                    src={profile?.vertical_profile_picture}
                    alt={`${profile?.acf?.inductee_name}'s Profile Image`|| "profile image"}
                  />

                  <Link href={`./english/${profile?.slug}`}>
                    <div className="hover-effect">
                      <p className="inductee-name">
                        {profile?.acf?.inductee_name || "Name"}{" "}
                      </p>

                      <p className="inductee-district">
                        {profile?.acf?.designation}
                      </p>
                      <p className="inductee-district">
                        {profile?.acf?.company}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </SlideUpWhenVisible>
      </div>
    
    </div>
  );
};

export default ShineContentHomeProfiles;
