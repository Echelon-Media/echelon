import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScroll ? (
        <div className="scroll-to-top" onClick={scrollUp}>
          <FontAwesomeIcon icon={faCaretUp} color="white" size="xl" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ScrollToTop;
