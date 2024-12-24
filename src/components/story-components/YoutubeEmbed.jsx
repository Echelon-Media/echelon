import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const YouTubeEmbed = ({ videoId, title, resolution, thumbnail }) => {
  const youtubeVidId = videoId?.split("/")[3] || [];

  const width = resolution === "one_on_one" ? "540px" : "350px";

  const height = resolution === "one_on_one" ? "540px" : "500px";

  return (
    <>
      <ReactPlayer
        controls
        width={width}
        height={height}
        url={`/youtu.be/${youtubeVidId}`}
        light={thumbnail}
        playing={true}
      />
    </>
  );
};

export default YouTubeEmbed;
