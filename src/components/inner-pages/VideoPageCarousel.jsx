import Link from "next/link";
import carousel_image_1 from "@/images/carousel-image-01.png";

import Image from "next/image";

export default function VideoPageCarousel({ title, image, slug }) {
  return (
    <>
      <Link href="/[slug]" as={`/${slug}`}>
        <div className="video-landing-page-carousel-component-wrapper">
          <div className="video-landing-page-carousel-thumbnail">
            <Image src={image || carousel_image_1} width={350} height={450} />
          </div>

          <div className="video-landing-page-carousel-title">
            {title ||
              "Sri Lanka debt restructuring possible paths - Lee Buchheit"}
          </div>
        </div>
      </Link>
    </>
  );
}
