<template>
  <div class="index-header">
    <nav>
      您好，欢迎来到{{(sysinfo && sysinfo.web_title) || ""}}！
      <div class="top-nav"
           :class="{logined:isLogin}">
        <ul>
          <li>
            <nuxt-link to="/">首页</nuxt-link>
          </li>
          <li v-if="!isLogin">|</li>
          <li @click="regGuest"
              v-if="!isLogin">
            <a>免费试玩</a>
          </li>
          <li>|</li>
          <li>
            <a target="_blank"
               :href="void(0)"
               @click="toService">客服</a>
          </li>
          <li>|</li>
          <li>
            <nuxt-link to="/news">资讯</nuxt-link>
          </li>
          <li>|</li>
          <li>
            <nuxt-link to="/help/helplist/registered">帮助中心</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="header">
      <img border="0"
           :src="sysinfo && sysinfo.pc_logo"
           alt=""
           class="logo"
           @click="$router.push('/')">
      <component :is="currentView"></component>
    </div>

  </div>
</template>

<script>
import userInfo from "../auth/userInfo";
import userLogin from "../auth/userLogin";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "IndexHeader",
  components: {
    userInfo,
    userLogin
  },
  computed: {
    ...mapState({
      // sysinfo: state => state.sysinfo.sysinfo,
      isLogin: state => state.userinfo.isLogin
    }),
    sysinfo() {
      return this.$store.getters["sysinfo/sysInfo"];
    },
    serviceUrl() {
      return this.sysinfo && this.sysinfo.service_host_url
        ? this.sysinfo.service_host_url.replace(/&amp;/g, "&")
        : "/";
    },
    currentView() {
      return this.isLogin ? "userInfo" : "userLogin";
    }
  },
  methods: {
    ...mapActions("sysinfo", ["regGuestUser", "getServiceUrl"]),
    async regGuest() {
      let result = await this.regGuestUser();
      if (this.$route.name !== "index") {
        this.$router.push("/");
      }
    },
    async toService() {
      let serviceUrl = await this.getServiceUrl();
      window && window.open(serviceUrl);
    }
  },
  watch: {
    isLogin(newVal, oldVal) {
      // console.log(this.$route)
      if (!oldVal && newVal && this.$route.name === "index") {
      }
    }
  }
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

  .top-nav {
    width: 240px;
    &.logined {
      width: 160px;
    }
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


