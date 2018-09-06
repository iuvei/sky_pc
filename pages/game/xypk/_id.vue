<template>
  <div class='xypk'>
    <gameHead :item='item'></gameHead>
    <pcddMain :item="item"></pcddMain>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import gameHead from "~/components/game/gameHead";
import pcddMain from "~/components/game/puke/main";
export default {
  name: "xypk",
  components: { gameHead, pcddMain },
  computed: {
    ...mapState("game", ["gameList"]),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"]),
    initItem() {
      let gameId = this.$route.params.id;
      return this.gameList.filter(item => item.game_id == gameId)[0] || {};
    }
  }
};
</script>
<style lang='scss' scoped>
.xypk {
  width: 1000px;
  margin: 20px auto 0;
}
</style>