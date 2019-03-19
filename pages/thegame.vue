<template>
  <div class="trend">
    <trendNa :type="1"></trendNa>
    <recommended></recommended>
    <hotyouxi></hotyouxi>
  </div>
</template>
<script>
import trendNa from "~/components/thegame/trendNa";
import recommended from "~/components/thegame/recommended";
import hotyouxi from "~/components/thegame/hotyouxi";
import { log } from "util";
import { mapActions, mapState } from "vuex";

export default {
  name: "thegame",

  components: {
    trendNa,
    recommended,
    hotyouxi
  },
  data () {
    return {};
  },
  beforeRouteLeave (to, from, next) {
    if (this.isLogin) {
      this.$Message.info("温馨提示:您已退出电子游戏!已自动刷新余额...");
      this.flushPrice({ click: 1 });
    }
    next();
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin
    })
  },
  methods: {
    ...mapActions("userinfo", ["flushPrice"])
  },
  mounted () { },
  async asyncData ({ store }) {
    if (process.env.static) return;
    store.commit('thegame/setType', 1)
    await store.dispatch("thegame/GetIndexWebgame", { type: 1 });
    await store.dispatch("game/getGameListAtin");
  },
  async created () {
    if (!process.browser) return;
    if (process.env.static) {
      await this.$store.dispatch("game/getGameListAtin");
    }
  }
};
</script>

<style lang="scss" scoped>
.trend {
  width: 1000px;
  min-height: 800px;
  margin: 0 auto 20px;
}
</style>
