<template>
  <div class="hishingGame">
    <byTrend :type="3"></byTrend>
    <byRecommended></byRecommended>
    <byHotyouxi></byHotyouxi>
  </div>
</template>
<script>
import byTrend from "~/components/thegame/trendNa";
import byRecommended from "~/components/thegame/recommended";
import byHotyouxi from "~/components/thegame/hotyouxi";
import { log } from "util";
import { mapActions, mapState } from "vuex";

export default {
  name: "hishingGame",

  components: {
    byTrend,
    byRecommended,
    byHotyouxi
  },
  data () {
    return {};
  },
  beforeRouteLeave (to, from, next) {
    if (this.isLogin) {
      this.$Message.info("温馨提示:您已退出捕鱼游戏!已自动刷新余额...");
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
    store.commit('thegame/setType', 3)
    await store.dispatch("thegame/GetIndexWebgame", { type: 3 });
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
.hishingGame {
  width: 1000px;
  min-height: 800px;
  margin: 0 auto 20px;
}
</style>
