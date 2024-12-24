const { useState, useEffect } = require("react");

const BannerAd = () => {
  const [isDesktop, setisDesktop] = useState(false);

  useEffect(() => {
    let screenWidth = window.innerWidth;

    if (screenWidth > 760) {
      setisDesktop(true);
    }
  }, []);
  return (
    <>
      {isDesktop ? (
        <div className="banner-ads-background">
          <div
            id="banner-ad"
            className="main-ad"
            style={{ width: "970px", height: "250px" }}
          ></div>
        </div>
      ) : (
        <div className="squre-ads-background">
          <div
            id="-ad"
            className="main-ad"
            style={{ width: "300px", height: "250px" }}
          ></div>
        </div>
      )}
    </>
  );
};
