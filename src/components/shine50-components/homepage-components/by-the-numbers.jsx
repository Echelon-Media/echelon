// import React from 'react';
// import Image from 'next/image';
// import thundercartoon from "../../../../public/images/Thunder_Cat-02.svg";

// const BytheNumber = () => {
//     return (
//         <>
//             <div className='shine-home-by-numbers-main-wrapper'>
//                 <div className='shine-home-by-numbers-upper-row'>
//                     <div className='shine-home-by-numbers-header'>
//                         By the numbers
//                     </div>
//                     <div className='shine-home-by-numbers-cartoon'>
//                         <Image src={thundercartoon} />
//                     </div>
//                 </div>
//                 <div className='shine-home-by-numbers-bottom-row'>
//                     <div className='shine-home-by-numbers-bottom-left'>
//                         <div className='shine-home-by-numbers-avg-age'>
//                             Average Age
//                         </div>
//                         <div className='shine-home-by-numbers-age'>
//                             22
//                         </div>
//                     </div>
//                     <div className='shine-home-by-numbers-center'>
//                         <div className='shine-home-by-numbers-center-upper'>
//                             number of founders and co-founders
//                         </div>
//                         <div className='shine-home-by-numbers-center-bottom'>
//                             15
//                         </div>
//                     </div>
//                     <div className='shine-home-by-numbers-center-right'>
//                         <div className='shine-home-by-numbers-right-upper'>
//                             total year of experience
//                         </div>
//                         <div className='shine-home-by-numbers-right-bottom'>
//                             200
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default BytheNumber;

import React from "react";
import Image from "next/image";
import thundercartoon from "@/images/shine50/Thunder_Cat-02.svg";
import FloatingUpDown from "../motions/FloatingUpDown";
import FadeInWhenVisible from "../motions/FadeInWhenVisible";
import SlideUpWhenVisible from "../motions/SlidesUpWhenVisible";
import Thunder from "@/images/shine50/thunder.png";
import pattern from "@/images/shine50/profile-elements/dottedshape.svg";


const BytheNumber = () => {
  return (
    <div className="shine-home-by-numbers-main-wrapper">
      {/* <FloatingUpDown>
        <Image src={Thunder} width={150} style={{ marginLeft: "-100px", marginTop:"150%" }} />
      </FloatingUpDown> */}
      <Image
        style={{
          position: "absolute",
          marginTop: "-20%",
          marginLeft: "75%",
          transform: "rotate(180deg)",
        }}
        width={150}
        height={500}
        src={pattern}
        alt={`right side pattern`}
      />
      <div className="shine-home-by-numbers-upper-row">
        <div className="shine-home-by-numbers-header">By the numbers</div>

        <div className="shine-home-by-numbers-cartoon">
          <FadeInWhenVisible>
            <FloatingUpDown y={[-220, -180]}>
              {" "}
              <Image src={thundercartoon} alt="Thunder Cartoon" />
            </FloatingUpDown>
          </FadeInWhenVisible>
        </div>
      </div>
      <div className="shine-home-by-numbers-bottom-row">
        <div className="shine-home-by-numbers-bottom-left">
          <div className="shine-home-by-numbers-avg-age">Average Age</div>
          <SlideUpWhenVisible>
            <div className="shine-home-by-numbers-age">29 Years</div>
          </SlideUpWhenVisible>
        </div>
        <div className="shine-home-by-numbers-center">
          <div className="shine-home-by-numbers-center-upper">
            Number of founders and co-founders
          </div>
          <SlideUpWhenVisible>
            <div className="shine-home-by-numbers-center-bottom">31</div>
          </SlideUpWhenVisible>
        </div>
        <div className="shine-home-by-numbers-right">
          <div className="shine-home-by-numbers-right-upper">
            Total years of experience
          </div>
          <SlideUpWhenVisible>
            <div className="shine-home-by-numbers-right-bottom">589 Years</div>
          </SlideUpWhenVisible>
        </div>
      </div>
    </div>
  );
};

export default BytheNumber;
