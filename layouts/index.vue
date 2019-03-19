<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  computed:{
    sysinfo(){
      return this.$store.getters['sysinfo/sysInfo']
    }
  },
  created() {
    if (process.browser) {
      let web_title =
        this.sysinfo.web_title ||
        window.localStorage.getItem('web_title') ||
        ' ';
      web_title && window.localStorage.setItem('web_title', web_title);
      window.document.title = web_title;
    }
  }
};
</script>
<style>
@import url(~/assets/common.scss);
.menu {
  height: 37px;
}
</style>
