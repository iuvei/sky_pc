<template>
  <div class='lhc'>
    <gameHead :item='item'></gameHead>
    <lhcMain :item="item"></lhcMain>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import gameHead from "~/components/game/gameHead";
import lhcMain from "~/components/game/lhc/main";
export default {
  name: "lhc",
  components: { gameHead, lhcMain },
  computed: {
    ...mapState("game", ["gameList"]),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"]),
    initItem() {
      return (
        this.gameList.find(item => item.game_id == this.$route.params.id) || {}
      );
    }
  },
  destroyed() {
    this.$store.commit("gameBet/setCurPrice", 2);
  }
};
</script>
<style lang='scss' scoped>
.lhc {
  width: 1000px;
  margin: 20px auto 0;
}
</style>