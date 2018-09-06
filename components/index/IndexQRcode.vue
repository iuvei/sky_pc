<template>
  <div class="KF" :class="{left:position==='left',right:position==='right',hide:this.hide===true}">
    <div class="btn_close" @click="close">
      <div class="index_sprite icon_btn"></div>
    </div>
    <div class="btn_bottom">
      <div class="btn-func" v-if="showType.includes(1) && !isTestUser" @click="regGuestUser">
        <div class="index_sprite btn_tryplay_icon"></div>
        免费试玩
      </div>
      <div class="btn-func" v-if="showType.includes(2)" @click="help">
        <div class="index_sprite btn_help_icon"></div>
        帮助中心
      </div>
      <div class="btn-func" data-link="" v-if="showType.includes(3)" @click="openService">
        <div class="index_sprite btn_service_icon"></div>
        在线客服</div>
      <div class="spline1"></div>
      <div class="btn-func" v-if="showType.includes(4)" @click="openQQ">
        <div class="index_sprite btn_qq_icon"></div>
        联系QQ</div>
      <div class="spline1"></div>
      <div class="qrcode"><img :src="img" border="0" alt=""></div>
      <div class="tip">扫一扫</div>
      <div class="tip">{{clientStr}} App 下载</div>
      <div class="spline3"></div>
    </div>
    <div class="bx_top index_to_top" @click="toTop">
      <a href="javascript:void(0)">返回顶部</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "index-couplet",
  props: {
    showType: {
      default: [],
    },
    client: {
      default: "",
    },
    position: {
      default: "",
    },
  },
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    // ...mapState("sysinfo", ["sysinfo"]),
    ...mapState({
      accountInfo: state => state.userinfo.accountInfo,
      sysinfo: state => state.sysinfo.sysinfo
    }),
    clientStr() {
      return this.client.toLowerCase().includes("ios") ? "苹果" : "安卓";
    },
    img() {
      if (this.sysinfo) {
        if (this.client.toLowerCase().includes("ios"))
          return this.sysinfo.ios_qrcode;
        else return this.sysinfo.android_qrcode;
      }
      return "";
    },
    serviceUrl() {
      return this.sysinfo
        ? this.sysinfo.service_url.replace(/&amp;/g, "&")
        : "/";
    },
    isTestUser(){
      return this.accountInfo.test === 2
    }
  },
  methods: {
    ...mapActions("sysinfo", ["regGuestUser"]),
    help() {
      window && window.open(`/help/helplist/registered`);
    },
    openQQ() {
      window &&
        window.open(
          `http://wpa.qq.com/msgrd?v=3&uin=${
            this.sysinfo.service_qq
          }&site=qq&menu=yes`
        );
    },
    openService() {
      window && window.open(this.serviceUrl);
    },
    close() {
      this.hide = true;
    },
    toTop() {
      var timer = requestAnimationFrame(function fn() {
        var s = document.documentElement.scrollTop;
        if (s > 0) {
          s -= 100;
          document.documentElement.scrollTop = s;
          timer = requestAnimationFrame(fn);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.index_sprite {
  background: url(~/assets/img/index_sprite.png);
}
.KF {
  position: fixed;
  z-index: 1000;
  width: 126px;
  box-sizing: border-box;
  top: 180px;
  font-size: 14px;
}
.KF.left {
  left: 0;
}
.KF.right {
  right: 0;
}
.KF .btn_close {
  display: block;
  text-align: center;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
}
.KF .btn_close .icon_btn {
  width: 110px;
  height: 18px;
  background-position: -456px -1px;
  position: absolute;
  top: 2px;
  left: 8px;
}
.KF .btn_tryplay_icon {
  width: 20px;
  height: 16px;
  background-position: -545px -41px;
  position: absolute;
  left: 10px;
  top: 6px;
}

.btn_service_icon {
  width: 20px;
  height: 20px;
  background-position: -503px -43px;
  position: absolute;
  left: 10px;
  top: 4px;
}
.btn-func {
  color: #333;
  background-color: #ffffff;
  text-indent: 1em;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  margin: 0 0 5px 0;
  .btn_help_icon {
    width: 20px;
    height: 20px;
    background-position: -485px -21px;
    position: absolute;
    left: 10px;
    top: 4px;
  }
}
.KF .btn_bottom {
  padding: 5px;
  background: #e93248;
}
.qrcode img {
  width: 116px;
  height: 116px;
  background: #f3f3f3;
  border-radius: 4px;
  border: none;
}
.KF .tip {
  font-size: 12px;
  color: #ffffff;
  text-align: center;
}
.KF .bx_top {
  margin-top: 10px;
  background-color: #e93248;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
}
.KF .bx_top a {
  list-style-type: none;
  color: #fff;
  text-decoration: none;
}
</style>
