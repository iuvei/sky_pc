<template>
  <div class="container">
    <img class="logo"
         src="/imgs/maintenance.png">
    <div class="content">
         <!-- v-if="error && error.data"> -->
      <p class="center">预计升级维护时间为</p>
      <p class="center">{{error.data.btime}}至{{error.data.etime}}</p>
      <!-- <p class="center">{{10000}}至{{10000}}</p> -->
      <Button type="primary"
              size="large"
              class="kefu"
              :loading="loading"
              @click="kefu">
        <span>联系客服</span>
      </Button>
    </div>
  </div>
</template>

<script>
import mcache from "memory-cache";
export default {
  name: "maintenance",
  layout: "index",
  data() {
    return {
      error: {}
    };
  },
  mounted() {
    if (process.browser) {
      // console.log(this.$store.state.sysinfo.error);
      const system_error = sessionStorage.getItem("system_error");
      const storeError = this.$store.state.sysinfo.error;
      if (storeError && Object.keys(storeError).length) {
        this.error = storeError;
        sessionStorage.setItem(
          "system_error",
          JSON.stringify(this.$store.state.sysinfo.error)
        );
      } else if (system_error) {
        this.error = JSON.parse(system_error);
      }
    } else console.log(this.$store.state.sysinfo.error);
  },

  methods: {
    kefu() {
      window.open(this.error.data.service_pc_url, "_blank");
      // console.log(this.error.data.service_pc_url, this.error);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 700px;
  margin: 0 auto;
  .logo {
    height: auto;
    display: block;
    margin: 60px auto 0 auto;
  }
  .position {
    width: 166px;
    height: 218px;
  }
  .content {
    widows: 420px;
    margin: 30px auto;
  }
  .title {
    color: #d81616;
    margin: 40px auto;
    font-size: 32px;
  }
  p {
    color: #8a8a8a;
    font-size: 18px;
    margin: 20px auto;
    &:last-child() {
      margin-bottom: 40px;
    }
  }
  .center {
    text-align: center;
  }
  .service {
    color: #ff0000;
    width: 268px;
    height: 60px;
    background: #ffe8e6;
    border-radius: 4px;
    border: 1px solid #ff0000;
    display: block;
    font-size: 24px;
    margin: 30px auto;
    line-height: 60px;
    text-align: center;
  }
  .kefu {
    margin: 0 auto;
    display: block;
  }
}
</style>
