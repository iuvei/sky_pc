<template>
  <div class="lottery-mobile" :style="{backgroundImage:`url(${img})`}">
    <div class="wapper">
      <div class="content">
        <div class="ios">
          <div class="title">
            IPhone 版
          </div>
          <img :src="sysinfo && sysinfo.ios_qrcode" alt="">
        </div>
        <div class="android">
          <div class="title">
            Android 版
          </div>
          <img :src="sysinfo && sysinfo.android_qrcode" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "lottery-mobile",
  serverCacheKey() {
    return Math.floor(Date.now() / 1000 * 60 * 60 * 24);
  },
  asyncData({ store }) {
    return store.dispatch("sysinfo/getMobileBackground");
  },
  computed: {
    ...mapState("sysinfo", ["sysinfo", "mobileBackground"]),
    img() {
      if (this.mobileBackground && Array.isArray(this.mobileBackground) 
      && this.mobileBackground.length) {
        return this.mobileBackground[0].banner;
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.lottery-mobile {
  background-size: 1920px auto;
  background-position: top center;
  background-repeat: no-repeat;
  // width: 1900px;
  min-width: 1200px;
  margin: 0 auto;
  min-height: 800px;
  height: auto;
  // background-attachment: fixed;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .wapper {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
  }
  .content {
    height: 320px;
    width: 600px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    > div {
      width: 280px;
      .title {
        width: 280px;
        height: 60px;
        border-radius: 10px;
        background-size: 36px;
        padding-left: 35px;
        box-sizing: border-box;
        line-height: 60px;
        color: #fff;
        font-size: 26px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        width: 200px;
        height: 200px;
        margin-top: 24px;
        display: inline-block;
      }
      &.ios {
        .title {
          background: rgb(248, 73, 80) url(~/assets/img/iPhone_wite.png)
            NO-REPEAT;
          background-position: 35px 10px;
        }
      }
      &.android {
        .title {
          background: rgb(184, 28, 250) url(~/assets/img/Andriod_wite.png)
            NO-REPEAT;
          background-position: 35px 14px;
        }
      }
    }
  }
}
</style>
