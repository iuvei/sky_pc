<template>
  <div>
    <nav class="nav">
      <trendNavMenu :data="menu" @clickItem="clickItem" :active="menuActive"> </trendNavMenu>
    </nav>
    <div class="sub-menu">
      <div v-for="(v,k) in subData" :key="k" :class="{active:subActive==v.tag}" @click="subMenu(v,k)">{{v.game_name}}</div>
    </div>
  </div>
</template>

<script>
import trendNavMenu from "./trendNavMenu";
import { mapState, mapActions } from "vuex";
export default {
  name: "trendNav",
  components: { trendNavMenu },
  props: ["gameJsTag"],
  data() {
    return {
      menuActive: "total",
      subActive: "",
      menu: {
        total: "全部",
        ssc: "时时彩",
        pk10: "PK拾",
        k3: "快三",
        "11x5": "11选5",
        lows: "低频彩",
        pcdd: "PC蛋蛋",
      },
    };
  },
  computed: {
    ...mapState({
      game2txt: state => state.game.game2txt,
      gameList: state =>
        state.game.gameList
          ? state.game.gameList.filter(x => x.js_tag != "sport_key")
          : [],
    }),
    subData() {
      // return
      switch (this.menuActive) {
        case "total":
          return this.gameList;
          break;
        case "lows":
          return this.gameList.filter(v => v.speed == 0);
          break;
        default:
          return this.gameList.filter(v => v.js_tag == this.menuActive);
          break;
      }
    },
  },
  methods: {
    clickItem(key) {
      this.menuActive = key;
      this.$emit("afterClickNav", key);
    },
    subMenu(item, k) {
      this.subActive = item.tag;
      this.$emit("callback", item);
    },
  },
  mounted() {
    // console.log(this.gameJsTag, this.$route.params);
    this.subActive = this.$route.params.tag;
  },
};
</script>

<style lang="scss" scoped>
.nav {
}
.sub-menu {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #fecc9e;
  border-top: none;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 40px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    &:hover {
      color: red;
      text-decoration: underline;
    }
  }
  .active {
    color: #e93248;
  }
}
</style>

