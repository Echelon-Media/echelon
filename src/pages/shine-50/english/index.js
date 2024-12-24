import Head from "next/head";
import ShineContentHomeProfiles from "@/components/shine50-components/homepage-components/shine-content-home-profile";
import MiddleSupportedBy from "@/components/shine50-components/homepage-components/middle-supported-usaid";
import HowWedidit from "@/components/shine50-components/homepage-components/how-we-did-it";
import { useState, useEffect, useRef } from "react";
import BytheNumber from "@/components/shine50-components/homepage-components/by-the-numbers";
import { getProfiles, getShine50Videos } from "../../api/api";
import ShineContentBanner from "../../../components/shine50-components/homepage-components/Shine-content-banner";
import FooterSection from "../../../components/shine50-components/homepage-components/footer-desktop";
import shine from "@/images/shine.jpg";
import Image from "next/image";

export default function Index() {
  const [profiles, setProfiles] = useState([]);
  // const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileData = await getProfiles();
        // const videoData = await getShine50Videos();
        setProfiles(profileData);
        // setVideos(videoData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();

    // Set up Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the element's content here
            console.log("Element is in view:", entry.target);
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" }
    );
  }, []);

  useEffect(() => {
    const elementsToObserve = document.querySelectorAll(".lazy-load");
    elementsToObserve.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title> Shine 50 | Englsih</title>
        <meta
          name="description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees, usaid, supported by USAID, impactfull women, young women"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees, usaid, supported by USAID, impactfull women, young women"
        />
        <link rel="canonical" href={`https://echelon.lk/shine-50/english`} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          property="og:url"
          content={`https://echelon.lk/shine-50/english`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shine 50 | English" />
        <meta
          property="og:description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees, usaid, supported by USAID, impactfull women, young women"
        />
        <meta
          property="og:image"
          content="https://echelon.lk/_next/static/media/shine.a48f7e76.jpg
          "
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          property="og:image"
          content="https://echelon.lk/_next/static/media/shine.a48f7e76.jpg"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk/shine-50" />
        <meta
          property="twitter:url"
          content={`https://echelon.lk/shine-50/english`}
        />

        <meta name="msvalidate.01" content="DECF2884F8B55B6E33A14CC68BDB3E5E" />
        <meta name="twitter:title" content="Shine 50 | English" />
        <meta
          name="twitter:description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees, usaid, supported by USAID, impactfull women, young women"
        />
        <meta
          name="twitter:image"
          content="https://echelon.lk/_next/static/media/shine.a48f7e76.jpg
          "
        />

        <meta
          name="keywords"
          content="Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
        />
      </Head>
      {isLoading ? (
        <div></div>
      ) : error ? (
        <div>Error fetching data: {error.message}</div>
      ) : (
        <>
          <div className="shine-50-english-wrapper">
            <Image
              src={shine}
              alt="Shine50 Logo"
              className="shinelogo"
              style={{ display: "none" }}
            />

            <ShineContentBanner />

            <HowWedidit />

            <MiddleSupportedBy />

            <ShineContentHomeProfiles
              profiles={profiles.map((profile) => ({
                ...profile,
                image: (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={200}
                    height={200}
                    className="lazy-load"
                  />
                ),
              }))}
            />

            <BytheNumber />

            <FooterSection />
          </div>
        </>
      )}
    </>
  );
}
