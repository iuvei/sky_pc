<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col col1">
          <IndexSidebar :notIndex="false"></IndexSidebar>
        </div>
        <div class="row col">
          <div class="col col2">
            <IndexSlider></IndexSlider>
            <IndexMarquee></IndexMarquee>
            <fastBet></fastBet>
          </div>
          <div class="col col3">
            <index-notice></index-notice>
            <win-list></win-list>
          </div>
        </div>
      </div>
    </div>
    <SysMessage></SysMessage>
  </div>
</template>
<script>
import components from "~/components/index/";
import IndexSlider from "~/components/index/IndexSlider";
import IndexSidebar from "~/components/index/IndexSidebar";
import WinList from "~/components/index/WinList";
import IndexMarquee from "~/components/index/IndexMarquee";
import IndexNotice from "~/components/index/IndexNotice";
import fastBet from "~/components/index/fastBet";
// import SysMessage from "./sysnotice";
import SysMessage from "~/components/index/sysnotice";
export default {
  name: "index",
  components: {
    IndexSlider,
    SysMessage,
    IndexSidebar,
    WinList,
    IndexMarquee,
    IndexNotice,
    fastBet,
    ...components
  },
  data() {
    return {};
  },
  methods: {},
  async asyncData({ store, route, redirect, req }) {
    if (route.query && route.query.vip && route.query.vip.length) {
      req.session.inviteCode = route.query.vip;
      redirect("/register");
    }
    // console.log('asyncData_req.headers.host',req.headers.host)
    // console.log("____req",req)
    let result = await Promise.all([
      store.dispatch("sysinfo/getSysinfo", req ? req.headers.host : window.location.host),
      store.dispatch("game/getGameListAtin"),
      store.dispatch("sysinfo/banner")
    ]);
  }
};
</script>

<style lang="scss" scoped>
.ivu-row {
  width: 100%;
}
.container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
}

.row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  // align-items: center;
}
.col {
  float: left;
  flex: 1;
}
*::-ms-backdrop,
.col {
  flex: none;
} /* IE11 */
.col1 {
  width: 250px;
  margin-right: 10px;
}

.col2 {
  width: 510px;
  margin-right: 10px;
}
.col3 {
  width: 230px;
}

.index-slider {
  margin-bottom: 6px;
}
.marquee {
  margin-bottom: 11px;
}
</style>
<style>
.fast-bet {
  width: 510px;
}
.fast-bet .ivu-card {
  height: 289px;
}
</style>
<style lang="scss">
.container {
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
}
.container {
  .ivu-modal {
    width: 520px;
    top: 300px !important;
  }
}
</style>


