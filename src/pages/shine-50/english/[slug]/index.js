import Image from "next/image";
import { getProfile } from "../../../api/api";
import YouTubeEmbed from "../../../../components/story-components/YoutubeEmbed";
import { useEffect, useRef, useState } from "react";

import Footer from "../../../../components/shine50-components/Footer";
import Thunder from "@/images/shine50/Star_Character_right.webp";
import ProfileTop from "../../../../components/shine50-components/profilepage-components/ProfileTop";
import ProfileMiddleContent from "../../../../components/shine50-components/profilepage-components/ProfileMiddle";
import Header from "../../../../components/shine50-components/Header";
import Head from "next/head";
import { motion } from "framer-motion";
import FloatingUpDown from "../../../../components/shine50-components/motions/FloatingUpDown";
import thunder from "@/images/shine50/thunder.svg";
import star from "@/images/shine50/star.svg";





const Profile = ({ profile, age }) => {
    const constraintsRef = useRef(null);

  return (
    <>
      <Head>
        <title> {profile?.acf?.inductee_name}</title>
        <meta name="description" content={profile?.acf?.bio} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <meta name="description" content={profile?.acf?.bio} />

        <meta
          name="viewport"
          content=" initial-scale=1.0, width=device-width"
        />

        <link
          rel="canonical"
          href={`https://echelon.lk/shine-50/english/${profile.slug}`}
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          property="og:url"
          content={`https://echelon.lk/shine-50/english/${profile.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={profile?.acf?.inductee_name} />
        <meta property="og:description" content={profile?.acf?.bio} />
        <meta property="og:image" content={profile?.featured_image_url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />

        <meta property="og:image" content={profile?.featured_image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk/shine-50" />
        <meta
          property="twitter:url"
          content={`https://echelon.lk/shine-50/english/${profile.slug}`}
        />
        <meta name="twitter:title" content={profile?.acf?.inductee_name} />
        <meta name="twitter:description" content={profile?.acf?.bio} />
        <meta name="twitter:image" content={profile?.featured_image_url} />
      </Head>

      <div className="shine-50-english">
        <Header />
        <div className="top-div"></div>

        <ProfileTop
          inducteeName={profile?.acf?.inductee_name}
          profilePic={profile?.vertical_profile_picture}
          bio={profile?.acf?.bio}
        />

        <div className="profile-middle-section">
          <ProfileMiddleContent
            profile_video_link={profile?.acf?.profile_video_link}
            profile_video_thumbnail={profile?.profile_video_thumbnail}
            inducteeName={profile?.acf?.inductee_name
              .split(" ")
              .slice(0, 1)
              .join(" ")}
            company={profile?.acf?.company}
            designation={profile?.acf?.designation}
            district={profile?.acf?.district}
            age={profile?.acf?.age}
            education={profile?.acf?.education}
            profilePic={profile?.vertical_profile_picture}
            facebook={profile?.acf?.facebook || "#"}
            linkedIn={profile?.acf?.linkedin || "#"}
            website={profile?.acf?.website || "#"}
            youtube={profile?.acf?.youtube || "#"}
            twitter={profile?.acf?.twitter || "#"}
            instagram={profile?.acf?.instagram || "#"}
            tiktok={profile?.acf?.tiktok || "#"}
            email={profile?.acf?.email}
          />
        </div>

        <div className="thunder-character">
          <Image
            width={300}
            height={900}
            src={Thunder}
            alt={`left side thunder character`}
          />
        </div>

        <div className="profile-stroy-section">
          <div
            className="profile-story"
            dangerouslySetInnerHTML={{ __html: profile.profile_description }}
          ></div>
        </div>
        <FloatingUpDown y={[-1000, -1015]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "5%",
              transform: "rotate(250deg)",
            }}
          >
            <Image
              width={180}
              height={180}
              src={star}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>
        <FloatingUpDown y={[-1000, -1010]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "5%",
              transform: "rotate(220deg)",
            }}
          >
            <Image
              width={180}
              height={180}
              src={star}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>

        <FloatingUpDown y={[-600, -700]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "89%",
              transform: "rotate(260deg)",
              transformBox: "fill-box",
            }}
          >
            <Image
              style={{
                filter:
                  "invert(80%) sepia(37%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
              }}
              width={150}
              height={120}
              src={thunder}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>
        <div className="profile-midle-wide-image-section">
          <motion.div drag dragConstraints={constraintsRef}>
            <Image
              width={1440}
              height={720}
              src={profile?.featured_image_url}
              alt={`${profile?.acf?.inductee_name}'s wide Image"`}
            />
          </motion.div>
        </div>
        <FloatingUpDown y={[0, 10]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "10%",
              transform: "rotate(220deg)",
            }}
          >
            <Image
              width={100}
              height={100}
              src={thunder}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>

        <Footer />
      </div>
    </>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const { slug } = context.query;

  try {
    const data = await getProfile(slug);
    const profile = data[0];

    const parseBirthday = (birthdayString) => {
      const year = parseInt(birthdayString.substring(0, 4), 10);
      const month = parseInt(birthdayString.substring(4, 6), 10) - 1;
      const day = parseInt(birthdayString.substring(6, 8), 10);

      return new Date(year, month, day);
    };

    const calculateAge = (birthdayString) => {
      const birthDate = parseBirthday(birthdayString);

      if (isNaN(birthDate.getTime())) {
        console.error("Invalid date format:", birthdayString);
        return null;
      }

      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    };

    const age = profile?.acf?.birthday
      ? calculateAge(profile.acf.birthday)
      : null;

    return {
      props: {
        profile,
        age,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      notFound: true,
    };
  }
}
