export default {
  bind(el, { value }, vnode) {
    // console.log(el, value);
  },
  componentUpdated(el, { value, oldValue }, vnode) {
    let classList = el.classList;
    if (value.key == oldValue.key) return;
    classList.remove(value.class);
    if (classList.contains(value.class)) return;
    classList.add(value.class);
    let duration = value.duration || 1;
    setTimeout(() => {
      classList.remove(value.class);
    }, 1000 * duration);
  },
};
