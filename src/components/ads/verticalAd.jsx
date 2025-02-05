import Image from "next/image";
import Link from "next/link";
import ad2 from "@/images/new_issue.jpg";
import { GPTProvider, GPTSlot } from "goopubtag";

const VerticalAd = ({ adStyle, adClass, url, img, slot }) => {
  const image = img ? img : ad2;
  const link = url
    ? url
    : "https://www.youtube.com/playlist?list=PL85zhIvKzyYZYgTOw_bkkgrASeysu3oit";
  return (
    <>
      <div className={`${adClass}  mb-5 `} style={adStyle}>
        <div className="vertical-ads-background">
          <div className="ad-title">Advertisement</div>
          <div className="side-ad " id={"side-ad"}>
            {/* <Link href={link}>
              <Image src={image} width={300} height={500} alt="vertical-ad" />
            </Link> */}
            <GPTProvider networkId={103700377} lazyLoad debug={false} fallback="collapse">
              <GPTSlot
                slotId={slot || "home_top_right_vertically_long_300*500"}
                adUnit={slot || "home_top_right_vertically_long_300*500"}
                sizes={[300, 500]}
              />
            </GPTProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalAd; 
