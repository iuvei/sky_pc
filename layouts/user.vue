<template >
  <div>
    <IndexHeader></IndexHeader>
    <IndexNav></IndexNav>
    <nuxt class="layout" />
    <IndexFooter class="footer">foot</IndexFooter>
  </div>

</template>
<script>
import components from "~/components/index/";
export default {
  name: "user",
  components: { ...components },
  created() {
    if (process.browser) {
      this.$Message.config({
        top: window.screen.availHeight / 3
      });
    }
    
  },
  beforeMount() {
    if (process.browser) {
      let web_title =
        this.$store.state.sysinfo.sysinfo.web_title ||
        window.localStorage.getItem("web_title") ||
        " ";
      web_title && window.localStorage.setItem("web_title", web_title);
      window.document.title = web_title;
    }
  },
};
</script>


<style lang="scss">
.layout {
  width: 1000px;
  margin: 5px auto;
}
</style>
