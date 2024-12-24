import Image from "next/image";

const VideoItem = ({ pic, title }) => {
  return (
    <>
      <div className="story-bottom-list-card" style={{ marginLeft: "0%" }}>
        <div className="image">
          <Image src={pic} width={250} height={150} alt={title}></Image>
        </div>
      </div>
    </>
  );
};

export default VideoItem;
