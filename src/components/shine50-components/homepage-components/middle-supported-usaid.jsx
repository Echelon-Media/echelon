import React from "react";
import Image from "next/image";
import usaidlogo from "@/images/shine50/usaid-logo-color.png";
import thundercartoonright from "@/images/shine50/Thunder_Cat-02.svg";
import thundercartoonleft from "@/images/shine50/Star_Character1.png";
import FadeInWhenVisible from "../motions/FadeInWhenVisible";

const SupportedSection = () => {
  return (
    <div className="shine-content-middle-supported-wrapper">
      <div className="shine-content-middle-supported-left">
        <Image
          src={thundercartoonleft}
          width={100}
          height={200}
          alt="Thunder Left"
        />
      </div>
      <div className="shine-content-middle-supported-center">
        <span className="shine-content-middle-supported-text">
          Supported by
        </span>
        <FadeInWhenVisible>
          <div className="shine-content-middle-supported-logo">
            <Image src={usaidlogo} alt="USAID Logo" width={100} height={200} />
          </div>
        </FadeInWhenVisible>
      </div>
      <div className="shine-content-middle-supported-right">
        <Image src={thundercartoonright} alt="Thunder Right" />
      </div>
    </div>
  );
};

export default SupportedSection;
