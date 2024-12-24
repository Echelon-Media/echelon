import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";

const PostShare = ({ slug, title, padding }) => {
  const [copySuccess, setCopySuccess] = useState("     ");
  const [show, setShow] = useState(false);
  const [copyClass, setCopyClass] = useState("not-refreshed");

  //console.log(`url of this page - ${url}`);
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Link Copied!");
      console.log("Link Copied....");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

 

  const url = `https://echelon.lk/${slug}`;
  return (
    <>
      <div className="inner-share" style={padding}>
        <ul className="share-links-list">
          <li className="share-links">
            <FacebookShareButton url={url}>
              <FacebookIcon size={30} round={true} bgStyle={{ fill: "#000" }} />
            </FacebookShareButton>
          </li>

          <li>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={30} round={true} bgStyle={{ fill: "#000" }} />
            </WhatsappShareButton>
          </li>
          <li>
            <TwitterShareButton url={url}>
              <XIcon size={30} round={true} bgStyle={{ fill: "#000" }} />
            </TwitterShareButton>
          </li>

          <li>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={30} round={true} bgStyle={{ fill: "#000" }} />
            </LinkedinShareButton>
          </li>
          <li className="copy-icon-li">
            <div className={`${copyClass} inner-story-copy-icon `}>
              <FontAwesomeIcon
                onClick={() => copyToClipBoard(url)}
                icon={faCopy}
                className={`copy-icon `}
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PostShare;
