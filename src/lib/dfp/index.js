import { dfpConst, adDevice } from "./const";

export const removeSlot = function () {
  const { googletag } = window;
  googletag.cmd.push(function () {
    googletag.destroySlots();
  });
};

export const defineSlot = function (name, id, sizes = [], params = {}) {
  if (window) {
    const { googletag, lotaudsList, screen } = window;
    const { dfpTargetingParams } = params;
    if (screen.width < 768 && adDevice[id] === "d") {
      return;
    }
    if (screen.width >= 768 && adDevice[id] === "m") {
      return;
    }
    const render = () => {
      googletag
        .defineSlot(
          `/${dfpConst.slot_id}/${dfpConst.prefix}_${name}`,
          sizes,
          id
        )
        .addService(googletag.pubads());
      googletag
        .pubads()
        .setTargeting("lotauds", lotaudsList)
        .setTargeting("section", dfpTargetingParams.section)
        .setTargeting("pos", dfpTargetingParams.pos);
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      googletag.display(id);
    };

    googletag.cmd.push(function () {
      try {
        render();
      } catch (e) {
        removeSlot();
        render();
      }
    });
  }
};

export const defineOutOfPageSlot = function (name, id, params = {}) {
  if (window) {
    const { googletag, lotaudsList, screen } = window;
    const { dfpTargetingParams } = params;
    if (screen.width < 768 && adDevice[id] === "d") {
      return;
    }
    if (screen.width >= 768 && adDevice[id] === "m") {
      return;
    }
    const render = () => {
      googletag
        .defineOutOfPageSlot(
          `/${dfpConst.slot_id}/${dfpConst.prefix}_${name}`,
          id
        )
        .addService(googletag.pubads());
      googletag
        .pubads()
        .setTargeting("lotauds", lotaudsList)
        .setTargeting("section", dfpTargetingParams.section)
        .setTargeting("pos", dfpTargetingParams.pos);
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      googletag.display(id);
    };
    googletag.cmd.push(function () {
      try {
        render();
      } catch (e) {
        removeSlot();
        render();
      }
    });
  }
};
