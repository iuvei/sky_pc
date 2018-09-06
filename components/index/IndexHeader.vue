<template>
  <div>
    <nav>
      您好，欢迎来到{{(sysinfo && sysinfo.web_title) || ""}}！
      <div>
        <ul>
          <li>
            <a href="/">首页</a>
            <!-- <span>首页</span> -->
          </li>
          <li v-if="!isLogin">|</li>
          <li @click="regGuest" v-if="!isLogin">
            <a>免费试玩</a>
          </li>
          <li>|</li>
          <li>
            <a target="_blank" :href="serviceUrl">客服</a>
          </li>
          <li>|</li>
          <li>
            <a href="/news">资讯</a>
          </li>
          <li>|</li>
          <li>
            <a href="/help/helplist/registered">帮助</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="header">
      <img border="0" :src="sysinfo && sysinfo.pc_logo" alt="" class="logo" @click="$router.push('/')">
      <userLogin v-if="!$store.state.userinfo.isLogin"></userLogin>
      <userInfo v-if="$store.state.userinfo.isLogin"></userInfo>
    </div>

  </div>
</template>

<script>
import userInfo from "../auth/userInfo";
import userLogin from "../auth/userLogin";
import { mapState, mapActions } from "vuex";
export default {
  name: "IndexHeader",
  components: {
    userInfo,
    userLogin,
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo.sysinfo,
      isLogin: state => state.userinfo.isLogin
    }),
    serviceUrl() {
      return this.sysinfo && this.sysinfo.service_url
        ? this.sysinfo.service_url.replace(/&amp;/g, "&")
        : "/";
    },
  },
  methods: {
    ...mapActions("sysinfo", ["regGuestUser"]),
    async regGuest() {
      let result = await this.regGuestUser();
      if (this.$route.name !== "index") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  width: 1000px;
  min-width: 1000px;
  margin: 4px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    width: 240px;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  li {
    list-style: none;
  }
  a {
    color: #999;
  }
}
.header {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 240px;
  height: 88px;
  border: none;
  outline: none;
  cursor: pointer;
}

img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>


