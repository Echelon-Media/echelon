if (!googletag) {
  const googletag = window.googletag;
}
if (googletag) {
  googletag.pubads().addEventListener("slotRenderEnded", function (event) {
    if (event.slot.getSlotElementId() == "div-gpt-15487568756655") {
      // if slot is filled
      if (event.isEmpty == true) {
        // true if ad slot is empty
      } else {
        // if ad slot present/delivered
      }
    }
  });
}
