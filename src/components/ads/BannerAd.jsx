import Image from "next/image";
import ad from "@/images/banner.webp";
import Link from "next/link";
import { GPTProvider, GPTSlot } from "goopubtag";

const BannerAd = ({slot}) => {
  return (
    <>
      <div className="banner-ads-background">
        <div className="ad-title">Advertisement</div>

        {/* <Ad
          adUnit="/103700377/home_top_banner_wide"
          name="home_top_banner_wide"
          size={[970, 250]}
        /> */}
        <div
          id="banner-ad"
          className="main-ad"
          style={{ width: "970px", height: "250px" }}
        >
         
          <GPTProvider networkId={103700377} lazyLoad debug={false} fallback="collapse">
            <GPTSlot
              slotId={slot || "home_middle_wide"}
              adUnit={slot || "home_middle_wide"}
              sizes={[970, 250]}
              
            />
          </GPTProvider>
        </div>
      </div>
    </>
  );
};

export default BannerAd;
