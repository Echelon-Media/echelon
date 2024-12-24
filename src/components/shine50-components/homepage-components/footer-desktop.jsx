import Image from "next/image";
import logo from "@/images/shine50/logo.png";
import usaidlogo from "@/images/shine50/usaid-logo-color.png";
import seylanlogo from "@/images/shine50/Seylan_Bank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FolderCopy } from "@mui/icons-material";
import Footer from "../Footer";
import SlideUpWhenVisible from "../motions/SlidesUpWhenVisible";

const FooterSection = () => {
  let currentYear = new Date().getFullYear();

  return (
    <>
      <div className="shine-content-desktop-footer">
        <SlideUpWhenVisible>
          <div className="shine-content-desktop-upper-row">
            <div className="usid-logo">
              <span className="footer-upper-text">Supported By</span>
              <Image src={usaidlogo} width={200} height={200} />
            </div>
            <div className="seylan-logo">
              <span className="footer-upper-text">Platinum Partner</span>
              <Image src={seylanlogo} width={200} height={200} />
            </div>
          </div>
        </SlideUpWhenVisible>
      </div>
      <Footer />
    </>
  );
};

export default FooterSection;
