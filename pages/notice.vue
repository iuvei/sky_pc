<template>
  <div class="trend">
    <trendNav @callback="navCallback" @afterClickNav="changeNav" class="nav"></trendNav>
    <all v-if="!gameId" @callback="navCallback" :jstag="gameJsTag" @gotoDetail="navCallback"></all>
    <record v-if="gameId" :game="game"></record>
  </div>
</template>
<script>
import trendNav from "~/components/watch/trendNav";
import all from "~/components/lottery/all";
import record from "~/components/lottery/record";
export default {
  name: "notice",
  components: { trendNav, all, record },
  data() {
    return {
      gameId: 0,
      gameJsTag: "",
      game: {}
    };
  },
  methods: {
    navCallback(item) {
      this.gameId = item.gameid || item.game_id;
      this.gameJsTag = item.js_tag;
      this.game = item;
    },
    changeNav(item) {
      this.gameJsTag = item;
    }
  },
  mounted() {},
  async asyncData({ store }) {
    await store.dispatch("game/getGameListAtin");
  }
};
</script>

<style lang="scss" scoped>
.trend {
  width: 1000px;
  min-height: 800px;
  margin: 0 auto 20px;
  .nav {
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss" >
@for $i from 1 through 6 {
  .num-#{$i} {
    width: 30px !important;
    height: 30px !important;
    background-size: 30px 30px !important;
  }
}
</style>


<style>
table.shuoming {
  width: 100%;
  border-collapse: collapse;
}
.color_hui {
  background: rgb(244, 244, 244);
}
table.shuoming td {
  border: 1px Solid #aaa;
  text-align: center;
  padding: 10px;
  color: #333;
  font-size: 12px;
}
</style>

