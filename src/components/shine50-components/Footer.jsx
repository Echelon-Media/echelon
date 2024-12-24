import Image from "next/image";
import logo from "@/images/shine50/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faFacebookF, faInstagram, faLinkedinIn, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import shine from "@/images/shine50/footer/shine.svg";
import fifty from "@/images/shine50/footer/50.svg";
import star from "@/images/shine50/footer/whitestar.svg";
import FloatingUpDown from "./motions/FloatingUpDown";
import lineart from "@/images/shine50/profile-elements/line-art.svg";
import Blink from "./motions/Blink";




const Footer = () => {
    let currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className="footer-logo-section">
          <div>
            <Image className="shine" src={shine} width={300} height={80} />
          </div>
          <Image src={logo} width={350} height={50} alt="Shine 50 logo " />
        </div>
        <FloatingUpDown y={[-55, -60]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "8%",
              transform: "rotate(260deg)",
            }}
          >
            <Image
              style={{}}
              width={50}
              height={50}
              src={star}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>

        <div className="footer-links-section">
          <ul>
            <li>
              <a href={"https://neonmedia.lk/"}>Neonmedia.lk</a>
            </li>
            <li>
              <Link href={"/"}>Echelon.lk</Link>
            </li>
            <li>
              {" "}
              <Link href={"/terms"}> Terms & Services</Link>
            </li>
            <li>
              <Link href={"/privacy"}> Privacy Policy</Link>
            </li>
            <li>
              <Link href={"/contact-us"}>Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-social-media-icons">
          <a
            href="https://facebook.com/echelonmag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="footer-social-media-icon"
            />
          </a>
          <a
            href="https://instagram.com/echelon_mag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="footer-social-media-icon"
            />
          </a>
          <a
            href="https://twitter.com/EchelonMag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="footer-social-media-icon"
            />
          </a>
          <a
            href="https://linkedin.com/company/echelon-sri-lanka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="footer-social-media-icon"
            />
          </a>
          <a
            href="https://www.youtube.com/@Echelonmag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="footer-social-media-icon"
            />
          </a>
        </div>
        <FloatingUpDown y={[-15, -0]}>
          <div
            className="icon-desktop"
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "68%",
              transform: "rotate(260deg)",
            }}
          >
            <Image
              style={{}}
              width={50}
              height={50}
              src={star}
              alt={`left side thunder character`}
            />
          </div>
        </FloatingUpDown>
        <div>
          <Image className="fifty" src={fifty} width={120} height={80} />
        </div>
        <div className="blinking-lines">
          <Blink o={[0, 0, 1]}>
            <Image
              className="icon-desktop"
              style={{
                width: "100px",
                marginTop: "-50px",
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
                width: "100px",
                marginTop: "-50px",
              }}
              width={5}
              height={5}
              src={lineart}
            />
          </Blink>
        </div>

        <div className="footer-allrightreserved-section">
          &copy; {currentYear} Echelon Media (Pvt)Ltd. All Rights Reserved.
        </div>
        <div className="footer-allrightreserved-section">
          Echelon Media, 15 Station Road, Colombo 00300, Sri Lanka{" "}
        </div>
      </footer>
    </>
  );
};

export default Footer;
