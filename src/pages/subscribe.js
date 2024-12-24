import Head from "next/head";

const Subscriptions = () => {
  return (
    <>
      <Head>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googletag = window.googletag || {cmd: []};
              googletag.cmd.push(function() {
                var adSlot = googletag.defineSlot('/103700377/HomePageMiddle', [970, 250], 'banner-ad');
                adSlot.addService(googletag.pubads());
                googletag.enableServices();

                // Display custom HTML5 ad
                googletag.display('banner-ad');

                // Refresh the ad if needed
                 googletag.pubads().refresh([adSlot]);
              });
            `,
          }}
        ></script>
      </Head>
      <div className="banner-ads-background">
        <div id="banner-ad" style={{ width: "970px", height: "250px" }}></div>
      </div>
     
    </>
  );
};

export default Subscriptions;
