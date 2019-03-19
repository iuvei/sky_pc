<template>
  <div>
    <nav class="nav">
      <trendN :data="tabData" @clickItem="clickItem" :active="menuActive"> </trendN>
    </nav>
  </div>
</template>

<script>
import trendN from "./trendN";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "trendNa",
  props: ["type"],
  components: { trendN },
  data() {
    return {};
  },
  computed: {
    ...mapState("thegame", ["thegameList", "menuTag"]),
    tabData() {
      if (this.type == 1) {
        return this.thegameList.filter(
          el => (el.class_type & (1 << (1 - 1))) > 0
        );
      }
      if (this.type == 2) {
        return this.thegameList.filter(
          el => (el.class_type & (1 << (2 - 1))) > 0
        );
      }
      if (this.type == 3) {
        return this.thegameList.filter(
          el => (el.class_type & 4) > 0 && el.type != 3
        );
      }
      // return this.thegameList.filter(el => el.type == this.type);
    },
    menuActive() {
      return this.menuTag;
    }
  },
  watch: {},
  methods: {
    ...mapMutations("thegame", ["setTag"]),
    ...mapActions("thegame", ["GetIndexWebgame"]),
    clickItem({ enable, tag }) {
      if (enable == 1) {
        this.$Message.warning("该平台游戏正在维护中···");
        return;
      }
      this.setTag(tag);
      this.$emit("afterClickNav", tag);
    }
  },
  mounted() {
    const tag = (this.tabData[0] && this.tabData[0].tag) || "";
    this.setTag(tag);
    this.subActive = this.$route.params.tag;
    // this.GetIndexWebgame();
  }
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

