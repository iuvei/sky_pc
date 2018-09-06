<template>
  <div class="index-slider">
    <Carousel v-model="value" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
      <CarouselItem v-for="(item, index) in data" :key="index">
        <div class="demo-carousel">
          <img :src="item.banner" alt="">
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
//首页轮播图
export default {
  name: "IndexSlider",
  data() {
    return {
      value: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: true,
        trigger: "click",
        arrow: "hover"
      }
    };
  },
  computed: {
    ...mapState({
      data: state => state.sysinfo.banners
    })
  }
};
</script>

<style>
.index-slider,
.ivu-carousel {
  overflow: hidden;
  position: relative;
  width: 510px;
  height: 228px;
  margin-bottom: 6px;
}
.demo-carousel {
  display: inline-block;
}
.ivu-carousel-item,
.demo-carousel,
.demo-carousel > img {
  width: 510px !important;
  height: 228px !important;
}
</style>
