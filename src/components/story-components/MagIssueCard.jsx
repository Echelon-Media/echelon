import Image from "next/image";
import Link from "next/link";

const MagIssueCard = ({ imageUrl, title, slug, pdf, name }) => {
  return (
    <>
      <div className="magazine-card">
        <Image
          className={`archive-magazine-image`}
          src={imageUrl}
          alt={`Magazine issue ${title}`}
          width={489}
          height={633}
          loading="lazy"
        />
        <div className="issue-content">
          {/* <Link href={"issues/[slug]"} as={`issues/${slug}`}>
            <h2 className="issuetitle titlefont">
              {title ? <>{title}</> : <>Echelon Magazine</>}
            </h2>
          </Link> */}

          <div class="flex items-center justify-center space-x-2">
            <Link href={"issues/[slug]"} as={`issues/${slug}`}>
              <h3 class="text-gray-700 font-bold">{name}</h3>
            </Link>
            {pdf ? (
              <span class="flex items-center px-2 border-l border-gray-300">
                {" "}
                <ul class="list-none pl-0 m-0">
                  <li class="inline">
                    <a
                      class="text-blue-500 hover:text-blue-700"
                      href={pdf}
                      title={title}
                    >
                      PDF
                    </a>
                  </li>
                </ul>
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MagIssueCard;
