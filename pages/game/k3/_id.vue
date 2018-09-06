<template>
  <div class='k3'>
    <gameHead :item='item'></gameHead>
    <k3Main :item="item"></k3Main>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import gameHead from "~/components/game/gameHead";
import k3Main from "~/components/game/k3/main";
export default {
  name: "k3",
  components: { gameHead, k3Main },
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
  },
  mounted() {},
  watch: {}
};
</script>
<style lang='scss' scoped>
.k3 {
  width: 1000px;
  margin: 20px auto 0;
  background-color: #ececec;
}
</style>