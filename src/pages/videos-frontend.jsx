import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import echelon_logo from "../images/echelon_logo_round.png";
import VideoPageCarousel from "../components/inner-pages/VideoPageCarousel.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faInstagram, faTwitter, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Videos() {
    return (
        <>
            <Navbar />
            <div className="video-landing-page-page-wrapper">

                <div className="video-landing-page-upper-section">
                    <Image src={echelon_logo} width={100} className="vido-landing-page-brand-logo" />
                    <div className="video-landing-page-upper-section-right-side">
                        <div>
                            <div className="video-landing-page-upper-section-right-side-first-row">Insightful, informative, powerful stories about</div>
                            <div className="video-landing-page-upper-section-right-side-second-row">
                                <div className="video-landing-page-social-icons-wrpapper">
                                    <FontAwesomeIcon icon={faXTwitter} className="video-landing-page-social-icons" />
                                    <FontAwesomeIcon icon={faFacebookF} className="video-landing-page-social-icons" />
                                    <FontAwesomeIcon icon={faInstagram} className="video-landing-page-social-icons" />
                                    <FontAwesomeIcon icon={faLinkedinIn} className="video-landing-page-social-icons" />
                                    <FontAwesomeIcon icon={faYoutube} className="video-landing-page-social-icons" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="video-landing-page-bottom-section">
                    <div className="video-landing-page-section-container">
                        <hr className="video-landing-page-section-separator" />
                        <div className="video-landing-page-section-category-name">Editorial</div>
                        <VideoPageCarousel />

                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>

            <Footer />
        </>
    )
}
