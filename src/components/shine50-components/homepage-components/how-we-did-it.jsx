import Link from "next/link";
import React from "react";
import FadeInWhenVisible from "../motions/FadeInWhenVisible";
import SlideUpWhenVisible from "../motions/SlidesUpWhenVisible";
import ShakeWhenVisible from "../motions/ShakeWhenVisible";
import Image from "next/image";
import wheel from "@/images/shine50/yellowwheel.svg";
import Rotate from "../motions/Rotate";
import shadow from "@/images/shine50/shadow.png";
import Blink from "../motions/Blink";
import lineart from "@/images/shine50/profile-elements/line-art.svg";
import FloatingUpDown from "../motions/FloatingUpDown";
import star from "@/images/shine50/star.svg";




const HowWedidit = () => {
  return (
    <>
      <div className="shine-content-how-did-it-wrapper">
        <div className="shine-content-how-did-it-main-wrapper">
          <FloatingUpDown y={[270, 290]}>
            <div
              className="icon-desktop"
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "90%",
                transform: "rotate(260deg)",
              }}
            >
              <Image
                className="icon-desktop"
                style={{}}
                width={150}
                height={120}
                src={star}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <Blink o={[0, 0, 1]}>
            <Image
              className="icon-desktop"
              style={{
                width: "170px",
                marginTop: "230%",
                filter: "brightness(0) invert(1)",
              }}
              width={5}
              height={5}
              src={lineart}
            />
          </Blink>
          <Blink o={[1, 0, 0]}>
            <Image
              className="icon-desktop"
              style={{
                width: "170px",
                marginTop: "230%",
              }}
              width={5}
              height={5}
              src={lineart}
            />
          </Blink>
          <FloatingUpDown y={[770, 790]}>
            <div
              className="icon-desktop"
              style={{
                display: "flex",
                position: "absolute",
                marginLeft: "0%",
                transform: "rotate(260deg)",
              }}
            >
              <Image
                className="icon-desktop"
                style={{}}
                width={150}
                height={120}
                src={star}
                alt={`left side thunder character`}
              />
            </div>
          </FloatingUpDown>
          <div className="shine-content-text-overlay">
            <div className="shine-content-how-did-left-text">
              <FadeInWhenVisible>
                <h1> Sri Lanka's game-changing young women:</h1>
              </FadeInWhenVisible>
            </div>
            {/* <Blink o={[.7,1,1,.7,1 ]}>
              <Image
              className="shaddow-image"
                style={{ width:"92%",marginTop: "69%", marginLeft:"-29%" }}
                width={600}
                height={500}
                src={shadow}
              />
            </Blink> */}
            {/* <Blink>
              <Image
                className="yellow-wheel"
                width={300}
                height={300}
              ></Image>
            </Blink> */}

            <div className="shine-content-how-did-right-text">
              <div className="shine-content-right-text-content">
                <SlideUpWhenVisible>
                  <p>
                    The Shine50 inductees are a standout bunch of young women
                    making a real difference! Celebrated for their leadership,
                    innovation, impact and commitment to sustainability, they
                    show what’s possible when you follow your passion.
                  </p>
                </SlideUpWhenVisible>

                <ShakeWhenVisible>
                  <div className="how-we-did-it-banner">
                    <h2>
                      <Link href={"./english/how-we-did-it"}>
                        HOW WE DID IT?{" "}
                      </Link>{" "}
                    </h2>
                  </div>
                </ShakeWhenVisible>
              </div>
            </div>
            <Rotate right={"-95%"} top={"45%"}>
              <Image
                src={wheel}
                className="yellow-wheel icon-desktop"
                width={300}
                height={300}
              ></Image>
            </Rotate>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWedidit;
