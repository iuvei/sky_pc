<template>
  <div>
    <!-- 公共头部 -->
    <IndexHeader></IndexHeader>
    <!-- 公共导航 -->
    <IndexNav></IndexNav>
    <nuxt />
    <!-- 公共底部 -->
    <IndexFooter></IndexFooter>
    <IndexQRcode :position="positionLeft"
                 :showType="[1,2]"
                 client="android"></IndexQRcode>
    <IndexQRcode :position="positionRight"
                 :showType="[3,4]"
                 client="ios"></IndexQRcode>
    <!-- 抢红包 -->
    <GrabBag :position="positionGrabBagRight"
             :showType="[]"></GrabBag>
    <div id="outdated"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import components from "~/components/index/";
import mixin from "./setTitle.mixin";
export default {
  data() {
    return {
      positionLeft: "left",
      positionRight: "right",
      positionGrabBagRight: "rightss"
    };
  },
  head() {
    let isFestiival = this.sysinfo.holiday_skin * 1,
    obj = {
      script: [{ src: "./outdatedbrowser.js" }],
      title: this.getDocTitle(),
      // 在这里加新年样式
      bodyAttrs:{
        class:'newyear'
      }
    };
    if (isFestiival) {
      return obj
    } else {
      return Object.assign(obj, {bodyAttrs: ''})
    }
  },
  methods: {},
  computed: {
    sysinfo(){
      return this.$store.getters['sysinfo/sysInfo']
    }
  },
  mixins: [mixin],
  components: {
    ...components
  },
  created() {
    if (process.browser) {
      this.$Message.config({
        top: window.screen.availHeight / 3
      });
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
