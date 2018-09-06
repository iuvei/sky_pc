<template>
  <div class="index-notice">
    <Card>
      <p slot="title" class="title">
        <i></i>手机APP下载</p>
      <div class="app_download">
        <div class="img">
          <img v-if="val===0" id="app_vcode1" :src="sysinfo && sysinfo.ios_qrcode" border="0" alt="">
          <img v-if="val===1" id="app_vcode2" :src="sysinfo && sysinfo.android_qrcode" border="0" alt="">
          <ul>
            <li class="app_l ios_icon" @click="val=0" :class="{curr:val===0}">
              <span class="sprite-index_footer index_footer-ios"></span>iOS下载</li>
            <li class="app_l Android_icon" @click="val=1" :class="{curr:val===1}">
              <span class="sprite-index_footer index_footer-android"></span>Android下载</li>
          </ul>
        </div>
      </div>

      <Tabs value="name1" size="small">
        <TabPane label="网站公告" name="name1">
          <a href="#">温馨提示：如您需要快捷方便的充值</a>
        </TabPane>
        <TabPane label="新手指导" name="name2">
          <a target="_blank" href="help/helplist/registered">如何注册账号?</a><br>
          <a target="_blank" href="help/helplist/forprepaidphone">如何进行充值?</a><br>
          <a target="_blank" href="help/helplist/todraw">如何进行提款?</a>
        </TabPane>

      </Tabs>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "index-notice",
  data() {
    return {
      val: 0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 1000 * 60 * 60 * 24);
  },
  computed: {
    ...mapState("sysinfo", ["sysinfo"])
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.index-notice {
  margin-bottom: 10px;
}
.index-notice,
.ivu-card {
  width: 230px;
  height: 262px;
}

.app_download .img {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.app_download img,
.app_download ul {
  float: left;
  flex: 1;
}
.app_download ul {
  margin: 0 6px;
}
.app_download img {
  width: 84px;
  height: 84px;
  outline: none;
  flex: none;
}
.app_download li {
  margin-bottom: 4px;
  cursor: pointer;
}
.app_download li.curr {
  color: red;
}
.title i {
  display: inline-block;
  width: 11px;
  height: 20px;
  background-position: -356px -59px;
  background-repeat: no-repeat;
  background-image: url(~/index_footer.png);
  margin-right: 4px;
}

.ivu-tabs-tabpane {
  font-size: 12px;
}

.ivu-tabs-tabpane a {
  color: #626262;
  line-height: 2;
}
/* .ivu-card .ivu-card-body {
  padding: 10px;
} */
</style>
<style>
.index-notice .ivu-card-body {
  padding: 10px 16px;
}
.index-notice .nav-text {
  width: 100%;
}
.index-notice .ivu-tabs-tab {
  text-align: center;
  width: 50%;
  margin-right: 1px;
}
.index-notice .ivu-tabs-bar {
  margin-bottom: 8px;
}
</style>

