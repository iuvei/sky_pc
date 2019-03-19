<template>
  <div class='xypk'>
    <gameHead
      :item='item'
      v-if="item"
    ></gameHead>
    <pkMain
      :item="item"
      v-if="item"
    ></pkMain>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import gameHead from "~/components/game/gameHead";
import pkMain from "~/components/game/puke/main";
export default {
  name: "xypk",
  components: { gameHead, pkMain },
  computed: {
    ...mapState("game", ["gameList"]),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"]),
    initItem() {
      let gameId = this.$route.params.id || this.$route.query.id;
      return this.gameList.find(item => item.game_id == gameId)
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