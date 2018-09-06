export default {
  beforeEnter(el, className) {
    className.add("collapse-transition");
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.style.height = "0";
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + "px";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
      setTimeout(() => {
        if (el.scrollHeight > (el.style.height + "").replace("px", "") * 1)
          el.style.height = el.scrollHeight + "px";
      }, 0);
    } else {
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
    el.style.overflow = "hidden";
  },

  // afterEnter(el, className) {
  //   // for safari: remove class then reset height is necessary
  //   // className.remove("collapse-transition");
  //   // el.style.height = "";
  //   // el.style.overflow = el.dataset.oldOverflow;
  //   console.log(el.style.height);
  //   console.log(el.scrollHeight);
  // },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.height = el.scrollHeight + "px";
    el.style.overflow = "hidden";
  },

  leave(el, className) {
    if (el.scrollHeight !== 0) {
      className.add("collapse-transition");
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }

  // afterLeave(el, className) {
  //   className.remove("collapse-transition");
  //   el.style.height = "";
  //   el.style.overflow = el.dataset.oldOverflow;
  //   el.style.paddingTop = el.dataset.oldPaddingTop;
  //   el.style.paddingBottom = el.dataset.oldPaddingBottom;s
  // },
};
