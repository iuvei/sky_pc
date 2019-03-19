<template>
  <menu class='nav-menu'>
    <div v-for="(v,k) in data" :key="k" :class="[{active:v.tag===active}]" @click="$emit('clickItem',v)">
      <!-- <div :class="`_${k}`"></div> -->
      <!-- 平台图标 -->
      <!-- <div>{{v.icon}}</div> -->
      <span>{{v.sub_name+tagName}}</span>
    </div>
  </menu>
</template>
<script>
import { mapState } from "vuex";
const nameMap = {
  1: "电子",
  2: "棋牌",
  3: "捕鱼"
};
export default {
  name: "trendN",
  props: ["data", "active", "type"],
  data() {
    return {};
  },
  computed: {
    ...mapState("thegame", ["menuType"]),
    tagName() {
      return nameMap[~~this.menuType];
    }
  }
};
</script>
<style lang='scss' scoped>
.nav-menu {
  display: flex;
  margin-top: 20px;
  background-color: #fff7f0;
  border: 1px solid #fecc9e;
  width: 1000px;
  > div {
    height: 40px;
    // flex: 1;
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    div:nth-child(1) {
      height: 27px;
      width: 27px;
      border-radius: 50%;
      margin-right: 5px;
    }
    span:hover {
      // text-decoration: underline;
    }
  }
  .active {
    background-color: #fecc9e;
  }
}
</style>
