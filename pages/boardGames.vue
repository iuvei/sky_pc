<template>
  <div class="boardGames">
    <qpTrend :type="2"></qpTrend>
    <qpRecommended></qpRecommended>
    <qpHotyouxi></qpHotyouxi>
  </div>
</template>
<script>
import qpTrend from "~/components/thegame/trendNa";
import qpRecommended from "~/components/thegame/recommended";
import qpHotyouxi from "~/components/thegame/hotyouxi";
import { log } from "util";
import { mapActions, mapState } from "vuex";

export default {
  name: "boardGames",

  components: {
    qpTrend,
    qpRecommended,
    qpHotyouxi
  },
  data () {
    return {};
  },
  beforeRouteLeave (to, from, next) {
    if (this.isLogin) {
      this.$Message.info("温馨提示:您已退出棋牌游戏!已自动刷新余额...");
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
    store.commit('thegame/setType', 2)
    await store.dispatch("thegame/GetIndexWebgame", { type: 2 });
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
.boardGames {
  width: 1000px;
  min-height: 800px;
  margin: 0 auto 20px;
}
</style>
