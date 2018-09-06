<template>
  <div>
    <nuxt/>
  </div>
</template>
<script>
export default {
  created() {
    if (process.browser) {
      let web_title =
        this.$store.state.sysinfo.sysinfo.web_title ||
        window.localStorage.getItem("web_title") ||
        " ";
      web_title && window.localStorage.setItem("web_title", web_title);
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
