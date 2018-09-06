<template>
  <div>
    <!-- 公共头部 -->
    <IndexHeader></IndexHeader>
    <!-- 公共导航 -->
    <IndexNav></IndexNav>
    <nuxt/>
    <!-- 公共底部 -->
    <IndexFooter></IndexFooter>
    <IndexQRcode :position="positionLeft" :showType="[1,2]" client="android"></IndexQRcode>
    <IndexQRcode :position="positionRight" :showType="[3,4]" client="ios"></IndexQRcode>
    <div id="outdated"></div>
  </div>
</template>
<script>
import components from "~/components/index/";
export default {
  head:{
    script: [{ src: "./outdatedbrowser.js" }]
  },
  data() {
    return {
      positionLeft: "left",
      positionRight: "right"
    };
  },
  components: {
    ...components
  },
  created() {
    if (process.browser) {
      this.$Message.config({
        top: window.screen.availHeight / 3
      });
    }

    if (process.browser) {
      let web_title =
        this.$store.state.sysinfo.sysinfo.web_title ||
        window.localStorage.getItem("web_title") ||
        " ";
      web_title && window.localStorage.setItem("web_title", web_title);
      window.document.title = web_title;
    }

    //判断是否是低版本浏览器
    if (process.browser) {
      // alert(window.navigator.userAgent)
      console.log((window.navigator.userAgent))
      this.$nextTick(()=>{
        if(typeof outdatedBrowser ==='function'){
          outdatedBrowser()
        }
      })
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
