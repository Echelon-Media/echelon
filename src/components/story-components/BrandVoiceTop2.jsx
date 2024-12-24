import Image from "next/image";
import CategoryLink from "../CategoryLink";
import logo from "@/images/echelon.png";

const BrandVoiceTop2 = ({
  categoryId,
  title,
  date,
  image,
  strap,
  caption,
  companyName,
}) => {
  return (
    <>
      <div className="branded-top">
        <div className="top-box ">
          <div className="flex logo-echelon">
            <Image src={logo} width={10} height={10} />
            <span>{"Echelon Studio"}</span>
          </div>
          <div className="paid-content-text">
            <span>Branded Content</span>
          </div>
        </div>
        <div className="vertical-brandvoice-container">
          <div className="vertical-brandvoice-title-container">
            <div className="flex">
              <div style={{ width: "18%" }}>
                <CategoryLink color={"white"} categoryId={categoryId} />{" "}
              </div>

              <div className="company-name text-white mt-3">{companyName}</div>
            </div>

            <h1 className="story-headline titlefont ">{title}</h1>
            <h2
              className="story-strapline"
              dangerouslySetInnerHTML={{ __html: strap }}
            ></h2>
            <div className="date-byline ">
              <span className="story-date">{date}</span>
            </div>
          </div>

          <div className="vertical-image-container">
            <Image
              className="vertical-img"
              src={image}
              height={2240}
              width={2987}
              alt={title}
            />
            <h3 className="branded-page-imagecap vertical-image-cap ">
              {caption}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandVoiceTop2;
