import { GPTProvider, GPTSlot } from "goopubtag";
import Image from "next/image";

const MobileAd = ({slot}) => {
  return (
    <>
      <div className="mobile-ad-background">
        <div className="ad-title">Advertisement</div>
        <div className="mobile-ad">
          <GPTProvider networkId={103700377} lazyLoad debug={false} fallback="collapse">
            <GPTSlot
              slotId={slot}
              adUnit={slot}
              sizes={[300, 250]}
              
             
            />
          </GPTProvider>
        </div>
      </div>
    </>
  );
};

export default MobileAd;
