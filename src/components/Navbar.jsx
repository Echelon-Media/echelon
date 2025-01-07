import {
  faBars,
  faClose,
  faL,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/echelon-logo.png";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [hovering, setHovering] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const [noticeClass, setNoticeClass] = useState("notice");
  const [topValue, setTopValue] = useState("3%");
  const [currentIndex, setCurrentIndex] = useState(0);

  let lastScrollY = 0;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolling(currentScrollY > 10 );

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollDirection === "down" && !hovering) {
      setNavVisible(false);
    } else if (scrollDirection === "up") {
      setNavVisible(true);
    }
  }, [scrollDirection, hovering]);

  const closeNotice = () => {
    setIsNoticeVisible(false);
  };

  useEffect(() => {
    if (isNoticeVisible == false) {
      setTopValue(0);
      setNoticeClass("notice-hide");
    }
  }, [isNoticeVisible]);

  // console.log("crtle class - ", topValue);

  const lines = [
    "Echelon's Shine 50: recognising young game-changing women",
    "Apply or nominate someone by clicking here!",

    // Add more lines as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [lines.length]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* <div
        className={`${noticeClass} text-center flex
       bg-black mb-0`}
      >
        <a
          href="https://neonmedia.lk/shine-50-nomination/english"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className=" notice-text ">{lines[currentIndex]} </p>
        </a>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" notice-close-burtton mt-1 text-right  text-white"
          x="0px"
          y="0px"
          width="15"
          height="15"
          viewBox="0 0 50 50"
          onClick={closeNotice}
        >
          {" "}
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>{" "}
        </svg>
      </div> */}
      
      <div
        className="navbar-upper-bottom-main-wrapper">
        {/* style={{ top: topValue }}> */}

        <div
          className="flex justify-between items-center navbar-upper-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="burger-menu">
            {/* <FontAwesomeIcon
              icon={faBars}
              color="#ffff"
              size="xl"
              onClick={toggleSidebar}
            /> */}

            <svg
              style={{ fill: "white" }}
              onClick={toggleSidebar}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="30"
              viewBox="0 0 50 50"
            >
              <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>{" "}
            </svg>
          </div>

          <div className="logo">
            <Link className="hover:text-white" href="/">
              <Image src={logo} alt="Echelon logo" priority />
            </Link>
          </div>

          <div className="md:flex items-center space-x-4">
            <div className="search-subscribe">
              <Link href="/search">
                <button
                  aria-label="search-button"
                  style={{ color: "white", cursor: "pointer" }}
                  className="search-button"
                >
                  {/* <FontAwesomeIcon icon={faSearch} size="lg" /> */}
                  <svg
                    className="search-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0,0,256,256"
                  >
                    <g>
                      <g transform="scale(5.12,5.12)">
                        <path d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z"></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>


        <nav
          style={{
            width: "100%",
            height: navVisible || hovering ? "17px" : "0px",
            overflow: "hidden",
            transition: "height 0.5s ease",
          }}
          className={`navbar-bottom-wrapper ${scrolling ? "mobile-scroll-nav" : ""
            }`}
        >
          <ul
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
              margin: "0",
              listStyle: "none",
            }}
          >
            {[
              "features",
              "portfolio",
              "brand-voice",
              "innovation",
              "leadership",
              "public-policy",
              "collection",
            ].map((item, index) => (
              <li
                key={index}
                className="navbar-menu-list"
                style={{
                  whiteSpace: "nowrap",
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "1.4px",
                  lineHeight: "4px",
                  textTransform: "uppercase",
                  margin: "0 12px",
                  paddingTop: "0.5%",
                  display: "block",
                  color: "#ffffff",
                }}
              >
                <Link
                  className="menu-nav-item"
                  href={`/category/${item.replace(" ", "-")}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
            <li
              className="navbar-menu-list"
              style={{
                whiteSpace: "nowrap",
                fontFamily: '"Outfit", sans-serif',
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "1.4px",
                lineHeight: "4px",
                textTransform: "uppercase",
                margin: "0 12px",
                paddingTop: "0.5%",
                display: "block",
                color: "#ffffff",
              }}
            >
              <Link className="menu-nav-item" href={`/videos`}>
                Videos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
