import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/images/shine50/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const ShineContentBanner = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
    <header className="shine-content-top-banner">
      <nav className="shine-content-nav">
        <Link href={"/shine-50/english"} className="desktop-logo">
          <div className="top-star"></div>{" "}
          <div className="logo">
            <Image src={logo} alt="Shine50 Logo" className="shinelogo" />
          </div>
        </Link>
        <Link href={"/shine-50/english"} className="mobile-logo">
          <div className="logo">
            <Image src={logo} alt="Shine50 Logo" className="shinelogo" />
          </div>
        </Link>

        <div className="toggle-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="languages">
          <a href="https://echelon.lk/shine-50/english">
            <span>English</span>
          </a>
          |{" "}
          <a href="https://neonmedia.lk/shine-50/sinhala">
            {" "}
            <span>Sinhala</span>
          </a>
          |{" "}
          <a href="https://neonmedia.lk/shine-50/tamil">
            {" "}
            <span>Tamil</span>
          </a>
        </div>
      </nav>
      <div className={`popup-menu ${menuOpen ? "active" : ""}`}>
        <ul className="nav-items">
          <li>
            <Link href={"/shine-50/english"}> Home</Link>
          </li>
          <li>
            <Link href={"/shine-50/english/how-we-did-it"}>
              {" "}
              How We Did It?
            </Link>
          </li>
          {/* <li>
            <Link href={"#"}>Profile Videos</Link>
          </li> */}
        </ul>
        <div
          className="social-icons"
          style={{ display: "flex", marginLeft: "16%", marginBottom: "10%" }}
        >
          <a
            href="http://instagram.com/echelon_mag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="sm"
              style={{ width: "25px" }}
            />
          </a>

          <a
            href="http://facebook.com/echelonmag"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FontAwesomeIcon
              icon={faFacebook}
              size="sm"
              style={{ width: "25px" }}
            />
          </a>

          <a
            href="http://lk.linkedin.com/company/echelon-sri-lanka"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FontAwesomeIcon
              icon={faLinkedinIn}
              size="sm"
              style={{ width: "25px" }}
            />
          </a>
          <a
            href="http://www.youtube.com/@Echelonmag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="sm"
              style={{ width: "25px", marginTop: "15%" }}
            />
          </a>

          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>
        <button className="close-menu" onClick={closeMenu}>
          &#10005;
        </button>
      </div>
      <div className="mobile-video">
        <video autoPlay loop muted playsInline width={"100%"}>
          <source src="/videos/shine-banner-mobile.mp4" />
        </video>
      </div>
      <video className="banner-video-desktop" autoPlay loop muted playsInline>
        <source src="/videos/shine-banner.mp4" type="video/mp4" />
      </video>{" "}
      {/* <video className="banner-video-mobile" autoPlay loop muted playsInline>
          <source src="/videos/shine-banner-mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
    </header>
  );
};

export default ShineContentBanner;
