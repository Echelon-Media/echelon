import Image from "next/image";
import Footer from "../../../../components/shine50-components/Footer";
import Thunder from "@/images/shine50/Star_Character_right.webp";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Header from "../../../../components/shine50-components/Header";
import Head from "next/head";
import FadeInWhenVisible from "../../../../components/shine50-components/motions/FadeInWhenVisible";
import SlideUpWhenVisible from "../../../../components/shine50-components/motions/SlidesUpWhenVisible";
import SlideIn from "../../../../components/shine50-components/motions/SlideIn";
import star from "@/images/shine50/star.svg";
import thunder from "@/images/shine50/thunder.svg";

import FloatingUpDown from "@/components/shine50-components/motions/FloatingUpDown";
import pattern from "@/images/shine50/profile-elements/dottedshape.svg";



const Howwedidit = () => {
  // Track the scroll position
  const { scrollY } = useViewportScroll();

  // Transform the opacity and y position based on scroll
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  return (
    <>
      <Head>
        <title>How We Did It | Shine 50</title>
        <meta
          name="description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.

       Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
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
      
       Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
        />

        <meta
          name="keywords"
          content="Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
        />
        <link
          rel="canonical"
          href={`https://echelon.lk/shine-50/english/how-we-did-it`}
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          property="og:url"
          content={`https://echelon.lk/shine-50/english/how-we-did-it`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shine 50" />
        <meta
          property="og:description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      
       Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
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
          content="https://echelon.lk/_next/static/media/shine.a48f7e76.jpg
          "
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="echelon.lk/shine-50" />
        <meta
          property="twitter:url"
          content={`https://echelon.lk/shine-50/english/how-we-did-it`}
        />

        <meta name="twitter:title" content="Shine 50" />
        <meta
          name="twitter:description"
          content="Shine 50 is all about shining the spotlight on remarkable young women,
      aged between 18 and 35, who are making significant contributions to social
      and cultural progress in Sri Lanka. Whether they're rocking it in tech,
      activism, sports, business, art, science or any other field, Shine 50
      celebrates their achievements and tells their incredible stories.
      
       Shine 50 awards, shine 50 Sri Lanka, shine 50 inductees, nominees,
        usaid, supported by USAID, impactfull women, young women , Women in tech"
        />
        <meta
          name="twitter:image"
          content="https://echelon.lk/_next/static/media/shine.a48f7e76.jpg
          "
        />
      </Head>
      <div className="shine-50-english">
        <div className="about-page">
          <Header />
          <div className="about-top">
            <div className="header-container"></div>
            <FadeInWhenVisible>
              <div className="page-title">
                <h1>How We Did It?</h1>
              </div>
            </FadeInWhenVisible>
          </div>
          <FloatingUpDown y={[-250, -255]}>
            <div
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "-5%",
                transform: "rotate(200deg)",
              }}
            >
              <Image
                style={{
                  filter:
                    "invert(80%) sepia(37%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                  zIndex: 1000,
                }}
                width={100}
                height={200}
                src={thunder}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <FloatingUpDown y={[530, 510]}>
            <div
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "85%",
                transform: "rotate(260deg)",
              }}
            >
              <Image
                // style={{
                //   filter:
                //     "invert(80%) sepia(37%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                // }}
                width={200}
                height={200}
                src={thunder}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <Image
            style={{
              position: "absolute",
              marginTop: "30%",
              marginLeft: "-10%",
            }}
            width={150}
            height={200}
            src={pattern}
            alt={`left side pattern`}
          />{" "}
          <Image
            style={{
              position: "absolute",
              marginTop: "-50%",
              marginLeft: "90%",
              zIndex: "0",
            }}
            width={150}
            height={200}
            src={pattern}
            alt={`left side pattern`}
          />
          <div className="about-middle-section">
            <SlideIn x={"1000vw"}>
              <div className="about-shine50">
                <div className="text-container">
                  {/* <motion.div
            style={{
                opacity: opacity,
                y: y,
            }}
        > */}
                  <h2>About Shine50</h2>
                  <h3>
                    Shine50 is a production of Echelon Media. Here is how we did
                    it.
                  </h3>
                  <p>
                    Shine 50 is all about shining the spotlight on remarkable
                    young women, aged between 18 and 35, who are making
                    significant contributions to social and cultural progress in
                    Sri Lanka. Whether they're rocking it in tech, activism,
                    sports, business, art, science or any other field, Shine 50
                    celebrates their achievements and tells their incredible
                    stories. It’s about boosting their influence and inspiring
                    more women to chase their dreams and shake things up!
                  </p>
                  {/* </motion.div> */}
                </div>
              </div>
            </SlideIn>
            <SlideIn x={"-100vw"}>
              <div className="about-neon">
                <div className="text-container">
                  <h2 className="neon-h2">About Neon</h2>

                  <p className="neon-p">
                    Neon, part of Echelon Media Group, is Sri Lanka's ultimate
                    youth media brand! We bring you the hottest topics, freshest
                    trends, and coolest stories. Our mission? To inform,
                    inspire, and connect through cutting-edge digital media,
                    spotlighting innovation and culture to empower young Sri
                    Lankans to create change.
                  </p>
                  <h2>About Echelon</h2>
                  <p>
                    Echelon is a business media brand for curious minds, with an
                    editorial focus on innovation, leadership, investment,
                    governance, and individual freedom. Echelon is published in
                    print, digital and video.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
          <Image
            style={{
              position: "absolute",
              marginTop: "10%",
              marginLeft: "85%",
              transform: "rotate(-10deg)",
            }}
            width={150}
            height={100}
            src={pattern}
            alt={`right side pattern`}
          />
          <div className="methodology-section">
            <FloatingUpDown y={[30, 10]}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginLeft: "70%",
                  transform: "rotate(260deg)",
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
            <FadeInWhenVisible>
              <h2> Methodology</h2>{" "}
            </FadeInWhenVisible>
            <SlideUpWhenVisible>
              <p>
                Following the call for online nominations the Neon and Echelon
                editorial teams reviewed over 700 submissions we received to
                select the final 50. Candidates were assessed on a diverse array
                of criteria, including leadership, advocacy, impact, innovation,
                creativity, scale, and sustainability. All inductees for the
                Shine50 are between 18 and 35 years old as of June 20, 2024.
              </p>
            </SlideUpWhenVisible>
            <FloatingUpDown y={[10, 20]}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginLeft: "-10%",
                  transform: "rotate(-155deg)",
                }}
              >
                <Image
                  style={{
                    filter:
                      "invert(84%) sepia(87%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                  }}
                  width={150}
                  height={120}
                  src={thunder}
                  alt={`left side thunder character`}
                />
              </div>
            </FloatingUpDown>
          </div>
          <div className="credit-section">
            <FadeInWhenVisible>
              {" "}
              <FloatingUpDown y={[0, 10]}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginLeft: "85%",
                  }}
                >
                  <Image
                    style={{
                      filter:
                        "invert(84%) sepia(87%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                    }}
                    width={150}
                    height={120}
                    src={star}
                    alt={`left side thunder character`}
                  />
                </div>
              </FloatingUpDown>
              <h2> Credits</h2>
            </FadeInWhenVisible>
            <FloatingUpDown y={[0, 10]}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginLeft: "-10%",
                }}
              >
                <Image
                  style={{
                    filter:
                      "invert(84%) sepia(87%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                  }}
                  width={150}
                  height={120}
                  src={star}
                  alt={`left side thunder character`}
                />
              </div>
            </FloatingUpDown>
            <SlideUpWhenVisible>
              <ul>
                <li>
                  <span>Edited by:</span> Indika Sakalasooriya and Devan Daniel
                </li>
                <li>
                  <span>Project Management:</span> Pasindu Gunawardana
                </li>
                <li>
                  <span>Database and Event Management:</span> Fahad Ibrahim
                </li>
                <li>
                  <span>Video Creative Directors:</span> Darren Lowe, Buddhi
                  Samarajeewa
                </li>
                <li>
                  <span>Art Direction:</span> Budddhika Pigera, Harshani Upeksha
                </li>
                <li>
                  <span>Design:</span> Pubudi Premarathna, Anjana Kalindu,
                  Nilesh Adipathy
                </li>
                <li>
                  <span>Production and Post Production:</span> Manojanth
                  Mahendren and Roshan Rathnakake assisted by Amila Madhusanka
                </li>
                <li>
                  <span>Engineering:</span> Sachintha Behethge, Tharika Pramodi
                </li>
                <li>
                  <span>Editorial Operations:</span> Chamithiri Kayshala, Zia
                  Qureshi
                </li>
                <li>
                  <span>Writers:</span> Dhanodya Kariyapperuma, Nethmi
                  Rajawasam, Ashanthi Ratnasingham Madawela, Manushi Silva
                </li>
                <li>
                  <span>QA:</span> Mary Ferdinands
                </li>
                <li>
                  <span>Shine50 Photography:</span> Saaliya Thilakarathna
                </li>
                <li>
                  <span>Executive Director:</span> Antoinette Ludowyk
                </li>
              </ul>
            </SlideUpWhenVisible>
            <FloatingUpDown y={[100, 10]}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginLeft: "5%",
                }}
              >
                <Image
                  style={{
                    filter:
                      "invert(84%) sepia(87%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                  }}
                  width={150}
                  height={120}
                  src={star}
                  alt={`left side thunder character`}
                />
              </div>
            </FloatingUpDown>
            <div className="thunder-character-right">
              <Image
                width={100}
                height={300}
                src={Thunder}
                alt={`left side thunder character`}
                className="bounce"
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Howwedidit;
