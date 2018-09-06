const Transition = {
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
    } else {
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = "hidden";
  },

  // afterEnter(el, className) {
  //   // for safari: remove class then reset height is necessary
  //   className.remove("collapse-transition");
  //   el.style.height = "";
  //   el.style.overflow = el.dataset.oldOverflow;
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
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      // addClass(el, "collapse-transition");
      className.add("collapse-transition");
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  // afterLeave(el, className) {
  //   className.remove("collapse-transition");
  //   el.style.height = "";
  //   el.style.overflow = el.dataset.oldOverflow;
  //   el.style.paddingTop = el.dataset.oldPaddingTop;
  //   el.style.paddingBottom = el.dataset.oldPaddingBottom;
  // },
};

export const toggle = {
  update(el, { value, oldValue }) {
    if (value === oldValue) return;
    let className = el.classList;
    let display;
    if (value) {
      Transition.beforeEnter(el, className);
      Transition.enter(el, className);
    } else {
      Transition.beforeLeave(el, className);
      Transition.leave(el, className);
    }
  },
};

// export default { toggle: toggle };
