<template>
  <div class="trend">
    <trendNav @callback="navCallback" class="nav"></trendNav>
    <trendHot v-if="!gameId" @callback="navCallback" class="trend-hot"></trendHot>
    <div v-else class="trend-view">
      <trendTool :gameName="gameName" :option="option" @changeOption="changeOption"></trendTool>
      <trendTable :gameId='gameId' :gameJsTag="gameJsTag" :option="option" class="trend-table"></trendTable>
    </div>
  </div>
</template>
<script>
import trendNav from "~/components/watch/trendNav";
import trendTool from "~/components/watch/trendTool";
import trendTable from "~/components/watch/trendTable";
import trendHot from "~/components/watch/trendHot";
export default {
  name: "trend",
  components: { trendNav, trendTable, trendHot, trendTool },
  data() {
    return {
      gameId: "",
      gameJsTag: "",
      gameName: "",
      // 是否显示线 是否显示遗漏数字
      option: {
        lineKey: true,
        cellKey: true,
      },
    };
  },
  methods: {
    navCallback(item) {
      // console.log(item);
      this.gameId = item.game_id;
      this.gameJsTag = item.js_tag;
      this.gameName = item.game_name;
    },
    changeOption(key) {
      this.option[key] = !this.option[key];
    },
  },
  mounted() {
    let query = this.$route.params;
    if (sessionStorage.query) {
      query = JSON.parse(sessionStorage.query);
      sessionStorage.query = "";
    }
    this.gameId = query.game_id;
    this.gameJsTag = query.js_tag;
    this.gameName = query.game_name;
  },
  async asyncData({ store }) {
    await store.dispatch("game/getGameListAtin");
  },
  // async created() {
  //   await this.$store.dispatch("game/getGameListAtin");
  // }
};
</script>

<style lang="scss" scoped>
.trend {
  min-height: 800px;
  text-align: center;
  .nav {
    width: 1000px;
    margin: 0 auto 20px;
  }
  .trend-view {
    // width: 100vw;
    width: 100%;
    overflow-x: scroll;
  }
  .trend-table {
    display: inline-block;
    margin: 0 auto 20px;
  }
  .trend-hot {
    width: 1000px;
    margin: 0 auto 20px;
  }
}
</style>


