import { useEffect, useState } from "react";
import YouTubeEmbed from "../../story-components/YoutubeEmbed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faMailchimp,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faLink,
} from "@fortawesome/fontawesome-free-solid";
import Image from "next/image";
import { motion } from "framer-motion";
// import FloatingUpDown from "../motions/FloatingUpDown";
import ShakeWhenVisible from "../motions/ShakeWhenVisible";
import ZoomInFrame from "../motions/ZoomIN";
import star from "@/images/shine50/star.svg";

import Bgstar from "@/images/shine50/bg_star.png";

import FloatingUpDown from "@/components/shine50-components/motions/FloatingUpDown";
import { Twitter } from "@mui/icons-material";
import Link from "next/link";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import pattern from "@/images/shine50/profile-elements/dottedshape.svg";
import outlinestar from "@/images/shine50/profile-elements/outline-star.svg";
import Blink from "../motions/Blink";
import lineart from "@/images/shine50/profile-elements/line-art.svg";




const ProfileMiddleContent = ({
  facebook,
  Twitter,
  tiktok,
  instagram,
  linkedin,
  youtube,
  website,
  profile_video_link,
  profile_video_thumbnail,
  inducteeName,
  designation,
  district,
  sector,
  company,
  age,
  education,
  profilePic,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const stars = Array(3).fill(star);

  useEffect(() => {
    const handleScroll = () => {
      const winTop = window.scrollY;

      let screenWidth = window.innerWidth;
      if (screenWidth > 760) {
        setIsDesktop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const email = "";

  const profVideo = profile_video_link;
  return (
    <>
      <>
        <div className="profile-middle profile-middle-desktop">
          <Image
            style={{ position: "absolute", marginTop: "10%", opacity: "0.7" }}
            width={150}
            height={200}
            src={pattern}
            alt={`left side pattern`}
          />

          <div className="profile-about-title">
            <h1>About</h1>
          </div>
          <FloatingUpDown y={[200, 220]}>
            <div
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "8%",
              }}
            >
              <Image
                width={100}
                height={100}
                src={outlinestar}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <FloatingUpDown y={[200, 180]}>
            <div
              style={{
                display: "block",
                position: "absolute",
                marginLeft: "80%",
              }}
            >
              <Image
                style={{}}
                width={50}
                height={120}
                src={star}
                alt={`left side thunder character`}
              />
              <Image
                style={{}}
                width={50}
                height={120}
                src={star}
                alt={`left side thunder character`}
              />
              <Image
                style={{}}
                width={50}
                height={120}
                src={star}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <FloatingUpDown y={[550, 570]}>
            <div
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "13%",
              }}
            >
              <Image
                style={{ filter: "brightness(0) invert(1)" }}
                width={30}
                height={30}
                src={star}
                alt={`left side thunder character`}
              />
              <Image
                style={{ filter: "brightness(0) invert(1)" }}
                width={30}
                height={30}
                src={star}
                alt={`left side thunder character`}
              />
              <Image
                style={{ filter: "brightness(0) invert(1)" }}
                width={30}
                height={30}
                src={star}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <div className="profile-middle-secton-content">
            <div className="profile-middle-left">
              {!profVideo ? (
                <>
                  {" "}
                  <div className="inductee-second-img-wrapper ">
                    <ZoomInFrame>
                      <Image
                        width={"400"}
                        height={800}
                        src={profilePic}
                        alt={`${inducteeName}'s Profile Image"`}
                        className="inductee-second-img"
                      />
                      {/* <Image width={"200"} height={800} src={Bgstar} className="bg-star" /> */}
                    </ZoomInFrame>{" "}
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-video">
                    <YouTubeEmbed
                      videoId={profVideo}
                      thumbnail={profile_video_thumbnail}
                    />
                  </div>
                </>
              )}

              <FloatingUpDown y={[-30, -10]}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                  }}
                >
                  <Image
                    style={{
                      filter:
                        "invert(84%) sepia(87%) saturate(707%) hue-rotate(-20deg) brightness(105%) contrast(101%)",
                    }}
                    width={100}
                    height={60}
                    src={star}
                    alt={`left side thunder character`}
                  />
                </div>
              </FloatingUpDown>
            </div>

            <div className="profile-middle-right">
              <div className="profile-about">
                {/* <h3 className="title">About</h3> */}

                <Image
                  className="icon-desktop"
                  style={{
                    width: "150px",
                    marginLeft: "105%",
                    filter: "brightness(0) invert(1)",
                    position: "absolute",
                  }}
                  width={5}
                  height={5}
                  src={lineart}
                />

                <ul className="desktop-about-list">
                  {sector ? (
                    <>
                      {" "}
                      <li>
                        <span> {sector}</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {designation ? (
                    <>
                      <Blink o={[1, 1]}>
                        <Image
                          className="icon-desktop"
                          style={{
                            width: "140px",
                            marginTop: "25px",
                            marginLeft: "-57px",
                            transform: "rotate(25deg)",

                            filter: "brightness(100) invert(100)",
                          }}
                          width={5}
                          height={5}
                          src={star}
                        />
                      </Blink>{" "}
                      <li className="designation">
                        <span> {designation}</span>
                        <br />
                        <span className="company-name">{company}</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* {company ? (
                    <>
                      {" "}
                      <Blink o={[1, 1]}>
                        <Image
                          className="icon-desktop"
                          style={{
                            width: "140px",
                            marginTop: "-5px",
                            marginLeft: "-57px",
                            transform: "rotate(125deg)",
                            filter: "brightness(0) invert(1)",
                          }}
                          width={5}
                          height={5}
                          src={star}
                        />
                      </Blink>
                      <li className="company">
                        <span>{company}</span>{" "}
                      </li>
                    </>
                  ) : (
                    <></>
                  )} */}

                  <br />

                  {education ? (
                    <>
                      {" "}
                      <li>
                        <span> {education} </span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {district ? (
                    <>
                      {" "}
                      <Blink o={[1, 1]}>
                        <Image
                          className="icon-desktop"
                          style={{
                            width: "140px",
                            marginTop: "-5px",
                            marginLeft: "-57px",
                            transform: "rotate(250deg)",
                            filter: "brightness(0) invert(1)",
                          }}
                          width={5}
                          height={5}
                          src={star}
                        />
                      </Blink>
                      <li className="district">
                        <span>from {district} </span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <br />
                  {age ? (
                    <>
                      {" "}
                      <Blink o={[1, 1]}>
                        <Image
                          className="icon-desktop"
                          style={{
                            width: "140px",
                            marginTop: "-5px",
                            marginLeft: "-57px",
                            transform: "rotate(25deg)",
                            filter: "brightness(100) invert(100)",
                          }}
                          width={5}
                          height={5}
                          src={star}
                        />
                      </Blink>
                      <li className="age">
                        <span>{age} years</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>

              <FloatingUpDown y={[180, 150]}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginLeft: "80%",
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
              {/* <FloatingUpDown y={[0, 10]}>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginLeft: "50%",
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
              </FloatingUpDown> */}
              <div className="links-in-profile">
                {/* <h3 className="title">Links</h3> */}
                <ul style={{ display: "flex" }}>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={facebook || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faFacebook}
                      />{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={website || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faGlobe}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={linkedin || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faLinkedin}
                        size="xs"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={instagram || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faInstagram}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={tiktok || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faTiktok}
                        size="xs"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={youtube || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faYoutube}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`mailto:${email}` || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faEnvelope}
                        size="xs"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <ShakeWhenVisible y={[-5, 10]}>
                {" "}
                <div className="profile-speech-bubble">
                  <p>
                    Let's Meet {inducteeName?.split(" ").slice(0, 1).join(" ")}
                  </p>
                </div>
              </ShakeWhenVisible>
            </div>

            <Image
              style={{
                position: "absolute",
                marginTop: "30%",
                marginLeft: "90%",
                transform: "rotate(-10deg)",
                opacity: "0.7",
              }}
              width={150}
              height={100}
              src={pattern}
              alt={`right side pattern`}
            />
          </div>
        </div>
      </>

      <>
        <div className="profile-middle  profile-middle-mobile">
          <div className="profile-middle-secton-content">
            <div className="profile-middle-left">
              <div className="profile-about">
                {/* <h3 className="title">About</h3> */}
                <ul>
                  {sector ? (
                    <>
                      {" "}
                      <li>
                        <span> {sector}</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {designation ? (
                    <>
                      {" "}
                      <li
                        style={{
                          background: "#fd4fae",
                          width: "fit-content",
                          padding: "2px 5px",
                        }}
                      >
                        <span> {designation}</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {company ? (
                    <>
                      {" "}
                      <li
                        style={{
                          background: "#fd4fae",
                          width: "fit-content",
                          padding: "2px 5px",
                        }}
                      >
                        <span>{company}</span>{" "}
                      </li>
                    </>
                  ) : (
                    <></>
                  )}

                  <br />

                  {education ? (
                    <>
                      {" "}
                      <li>
                        <span> {education} </span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {district ? (
                    <>
                      {" "}
                      <li
                        style={{
                          background: "yellow",
                          width: "fit-content",
                          padding: "2px 5px",
                        }}
                      >
                        <span>from {district} </span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  <br />
                  {age ? (
                    <>
                      {" "}
                      <li
                        style={{
                          background: "#e73c64",
                          width: "fit-content",
                          padding: "2px 5px",
                        }}
                      >
                        <span>{age} years</span>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>

              <div className="links-in-profile links-in-profile-mobile">
                {/* <h3 className="title">Links</h3> */}
                <ul style={{ display: "flex" }}>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={facebook || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faFacebook}
                      />{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={website || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faGlobe}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={linkedin || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faLinkedin}
                        size="xs"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={instagram || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faInstagram}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={tiktok || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faTiktok}
                        size="xs"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={youtube || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faYoutube}
                        size="xs"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`mailto:${email}` || "#"}
                    >
                      <FontAwesomeIcon
                        className="profile-social-icons"
                        icon={faEnvelope}
                        size="xs"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-middle-right">
          {!profVideo ? (
            <>
              <div className="inductee-second-img-wrapper mobile-inductee-second-img-wrapper">
                <ZoomInFrame>
                  <Image
                    width={"400"}
                    height={800}
                    src={profilePic}
                    alt={`${inducteeName}'s Profile Image"`}
                    className="inductee-second-img"
                  />
                  {/* <Image width={"200"} height={800} src={Bgstar} className="bg-star" /> */}
                </ZoomInFrame>{" "}
              </div>
            </>
          ) : (
            <>
              <div className="profile-video">
                <YouTubeEmbed
                  videoId={profVideo}
                  thumbnail={profile_video_thumbnail}
                />
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ProfileMiddleContent;
