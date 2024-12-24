import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import logo from "../images/echelon-logo.png";
import Image from "next/image";

export default function Footer() {
  let currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <div className="footer-news-letter-social-media-icons">
          <a href="https://www.facebook.com/echelonmag/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="footer-social-media-icons"
            />
          </a>
          <a href="https://www.instagram.com/echelon_mag" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              className="footer-social-media-icons"
            />
          </a>
          <a href="https://x.com/EchelonMag" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faXTwitter}
              className="footer-social-media-icons"
            />
          </a>
          <a href="https://lk.linkedin.com/company/echelon-sri-lanka" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="footer-social-media-icons"
            />
          </a>
          <a href="https://www.youtube.com/@Echelonmag" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faYoutube}
              className="footer-social-media-icons"
            />
          </a>
        </div>
        <div className="footer-allright-reserved-section">
          &copy; {currentYear} Echelon Media (Pvt)Ltd. All Rights Reserved.
        </div>
        <div className="footer-row">
          {/* <div className="footer-brand-name">
            <Link className="menu-nav-item hover:text-white" href={"#"}>
              <div className="mt-9">
                <Image src={logo} width={200} alt="Echelon logo" priority />
              </div>
            </Link>
          </div> */}
          {/* <div className="footer-news-letter-social-media-icons">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="footer-social-media-icons"
                />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="footer-social-media-icons"
                />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="footer-social-media-icons"
                />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="footer-social-media-icons"
                />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="footer-social-media-icons"
                />
              </a>
            </div> */}

          <div className="footer-bottom-section">
            <div className="fotter-column-first ">
              <ul>
                <li>
                  <Link href="/category/features">Features</Link>
                </li>
                <li>
                  <Link href="/category/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/category/brand-voice">Brand Voice</Link>
                </li>
                <li>
                  <Link href="/category/innovation">Innovation</Link>
                </li>
                <li>
                  <Link href="/category/leadership">Leadership</Link>
                </li>
                <li>
                  <Link href="/category/public-policy">Public Policy</Link>
                </li>
                <li className="mobile-footer-links">
                  <Link href="/category/collection">collection</Link>
                </li>
                {/* <li className="mobile-footer-links">
                  <Link href="/category/video">Video</Link>
                </li> */}
                <li className="mobile-footer-links">
                  <Link href="/about-us">About Us</Link>
                </li>
                <li className="mobile-footer-links">
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                <li className="mobile-footer-links">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
