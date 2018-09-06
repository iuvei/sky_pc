// import Vue from "vue";
if (process.browser) {
  setTimeout(() => {
    var userinfo = window.$nuxt.$store.state.userinfo;
    if (userinfo && userinfo.isServerLogin) {
      window.$nuxt.$store.commit("userinfo/setUserInfo", userinfo.accountInfo);
    }
  }, 1000);
}
