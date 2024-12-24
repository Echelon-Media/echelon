import React, { useState } from "react";
import Image from "next/image";
import logo from "@/images/shine50/logo.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faXTwitter,
  faYoutube,
  faBars,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import FloatingUpDown from "./motions/FloatingUpDown";
import star from "@/images/shine50/star.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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
              How we did it?
            </Link>
          </li>
          {/* <li>
            <Link href={"#"}>Profile Videos</Link>
          </li> */}
        </ul>
        <div
          className="social-icons"
          style={{ display: "flex", marginLeft: "0%", marginBottom: "10%" }}
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
        </div>
        <button className="close-menu" onClick={closeMenu}>
          &#10005;
        </button>
      </div>
    </header>
  );
};

export default Header;
