import Image from "next/image";
import { useEffect, useState } from "react";
import FadeInWhenVisible from "../motions/FadeInWhenVisible";
import SlideUpWhenVisible from "../motions/SlidesUpWhenVisible";
import lineart from "@/images/shine50/profile-elements/line-art.svg";
import Blink from "../motions/Blink";
import linear from "@/images/shine50/profile-elements/linear.svg";
import star from "@/images/shine50/profile-elements/star.svg";
import blueline from "@/images/shine50/profile-elements/bluelines.svg";
import outlinestar from "@/images/shine50/profile-elements/outline-star.svg";
import thunder from "@/images/shine50/profile-elements/thunder.svg";
import WavyMotion from "../motions/Wavy";
import ShakeWhenVisible from "../motions/ShakeWhenVisible";





const ProfileTop = ({ inducteeName, profilePic, bio }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const text =bio;
  // const text = "Hello! How are you today? Visit us at echelon.lk.";
  
// const sentences = text.match(/(?:[A-Z][a-z]+\s[A-Z]\.|[^\.!\?])+[\.!\?]+/g);


const sentences = text.split(/(?<!\b[A-Z])(?<!\.[a-z]{2,})(?<=\.)\s+/);
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
  return (
    <>
      <>
        <div className="profile-top mobile-profile-top">
          <div className="profile-top-leftside">
            <div className="blink-items">
              <Blink o={[0, 0, 1]}>
                <Image
                  style={{ width: "60px", marginTop: "-200%" }}
                  width={5}
                  height={5}
                  src={lineart}
                />
              </Blink>
              <Blink o={[1, 1, 0]}>
                <Image
                  style={{
                    width: "70px",
                    marginTop: "-260%",
                    transform: "rotate(0deg)",
                    marginLeft: "-10%",
                  }}
                  width={5}
                  height={5}
                  src={outlinestar}
                />
              </Blink>
              <Blink o={[1, 1, 0, 1]}>
                <Image
                  style={{
                    width: "70px",
                    marginTop: "90%",
                    transform: "rotate(-130deg)",
                    marginLeft: "-15%",
                  }}
                  width={5}
                  height={5}
                  src={blueline}
                />
              </Blink>
              <Blink o={[0, 0, 1]}>
                <Image
                  style={{
                    width: "70px",
                    marginTop: "0%",
                    marginLeft: "500%",
                  }}
                  width={5}
                  height={5}
                  src={lineart}
                />
              </Blink>
              <Blink o={[1, 1, 0]}>
                <Image
                  style={{
                    width: "70px",
                    marginTop: "100%",
                    transform: "rotate(0deg)",
                    marginLeft: "500%",
                  }}
                  width={5}
                  height={5}
                  src={outlinestar}
                />
              </Blink>
              <Blink o={[1, 1, 0, 1]}>
                <Image
                  style={{
                    width: "70px",
                    marginTop: "-280%",
                    transform: "rotate(15deg)",
                    marginLeft: "450%",
                  }}
                  width={5}
                  height={5}
                  src={blueline}
                />
              </Blink>
            </div>

            {/* profile image here */}
            <Image
              width={500}
              height={625}
              src={profilePic}
              alt={`${inducteeName}'s Profile Image"`}
            />
            {/* End profile image */}
          </div>
          <div className="profile-top-rightside">
            {" "}
            <h2 className="inductee-name">{inducteeName}</h2>
            <div className="bio-section">
              <p className="text-white">{bio}</p>
            </div>
          </div>
        </div>
      </>

      <>
        <div className="profile-top desktop-profile-top ">
          <div className="wrapper-top">
            <div className="profile-top-leftside">
              <SlideUpWhenVisible>
                <h1 className="inductee-name">{inducteeName}</h1>
              </SlideUpWhenVisible>
              <div className="bio-section">
                <SlideUpWhenVisible>
                  {" "}
                  <div class="wrap-before"></div>
                  <div class="wrap-after"></div>
                  {sentences.map((sentence, index) => (
                    <>
                      <p className="text-white">{sentence}</p>
                      <br />
                    </>
                  ))}
                  {/* <p className="text-white">
                    {bio}
                  
                  </p> */}
                </SlideUpWhenVisible>
              </div>
            </div>
            <div className="profile-top-rightside">
              {" "}
              <FadeInWhenVisible>
                <Blink o={[0, 0, 1]}>
                  <Image
                    style={{ width: "150px", marginTop: "-40%" }}
                    width={5}
                    height={5}
                    src={lineart}
                  />
                </Blink>
                <Blink o={[1, 1, 0]}>
                  <Image
                    style={{
                      width: "100px",
                      marginTop: "40%",
                      transform: "rotate(0deg)",
                      marginLeft: "470%",
                    }}
                    width={5}
                    height={5}
                    src={outlinestar}
                  />
                </Blink>
                {/* <Blink o={[1, 1, 0, 1]}>
                  <Image
                    style={{
                      width: "100px",
                      marginTop: "250%",
                      transform: "rotate(-130deg)",
                      marginLeft: "20%",
                    }}
                    width={5}
                    height={5}
                    src={blueline}
                  />
                </Blink> */}

                <ShakeWhenVisible>
                  <Image
                    width={600}
                    height={1440}
                    src={profilePic}
                    alt={`${inducteeName}'s Profile Image"`}
                  />
                </ShakeWhenVisible>

                <Blink o={[1, 0, 1]}>
                  <Image
                    style={{
                      width: "300px",
                      marginTop: "-40%",
                      transform: "rotate(30deg)",
                      marginLeft: "-20%",
                    }}
                    width={5}
                    height={5}
                    src={linear}
                  />
                </Blink>
                <Blink o={[1, 1, 1, 0, 1, 0]}>
                  <Image
                    style={{
                      width: "100px",
                      marginTop: "-460%",
                      transform: "rotate(0deg)",
                      marginLeft: "0%",
                    }}
                    width={5}
                    height={5}
                    src={star}
                  />
                </Blink>
                {/* <Blink o={[0, 1, 0, 1]}>
                  <Image
                    style={{
                      width: "100px",
                      marginTop: "-220%",
                      transform: "rotate(50deg)",
                      marginLeft: "370%",
                    }}
                    width={5}
                    height={5}
                    src={blueline}
                  />
                </Blink> */}

                <Blink o={[0, 0, 0, 1]}>
                  <Image
                    style={{
                      width: "100px",
                      marginTop: "-100%",
                      transform: "rotate(0deg)",
                      marginLeft: "455%",
                    }}
                    width={5}
                    height={5}
                    src={thunder}
                  />
                </Blink>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ProfileTop;
