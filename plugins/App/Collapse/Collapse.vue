<template>
  <ul v-collapse="open">
    <slot></slot>
  </ul>
</template>
<script>
import Transition from './utils';
export default {
  name: 'AppCollapse',
  props: {
    open: { default: true },
  },
  directives: {
    collapse: {
      bind(el, { value }) {
        if (!value) {
          el.style.height = 0;
          el.style.overflow = 'hidden';
        }
      },
      componentUpdated(el, { value, oldValue }) {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-transition {
  transition: 500 height ease-in-out, 500 padding-top ease-in-out,
    500 padding-bottom ease-in-out;
}
</style>


