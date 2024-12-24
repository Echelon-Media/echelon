import Image from "next/image";
import CategoryLink from "../CategoryLink";
import logo from "@/images/favicon.png";


const BrandVoiceTop1 = ({
  categoryId,
  title,
  date,
  image,
  strap,
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
        <div className="brandvoice-landscape-container">
          {/* <h3 className="branded-page-imagecap ">
            This is sample image caption of story page Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Et earum aperiam doloremque
          </h3> */}
          <Image
            className="landscape-img"
            src={image}
            width={2480}
            height={1395}
            alt={title}
          />
          <div className="brandvoice-title-container">
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
        </div>
      </div>
    </>
  );
};

export default BrandVoiceTop1;
