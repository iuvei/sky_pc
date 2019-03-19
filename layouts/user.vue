<template >
  <div>
    <IndexHeader></IndexHeader>
    <IndexNav></IndexNav>
    <nuxt class="layout" />
    <IndexFooter class="footer">foot</IndexFooter>
  </div>

</template>
<script>
import components from '~/components/index/';
import mixin from './setTitle.mixin';
export default {
  name: 'user',
  components: { ...components },
  created() {
    if (process.browser) {
      this.$Message.config({
        top: window.screen.availHeight / 3
      });
    }
  },
  mixins:[mixin]
};
</script>


<style lang="scss">
.layout {
  width: 1000px;
  margin: 5px auto;
}
</style>
