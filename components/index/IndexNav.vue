<template>
  <nav @mouseleave="leave">
    <div class="container">
      <div class="game-menu" @mouseover="enter" :class="{'active':showSidebar}">
        <i></i>
        <span>选择彩种{{(gameList && gameList.length) && `(${gameList.length})种`}}</span>
      </div>
      <div class="navs" ref="nav">
        <ul>
          <li v-for="(item,idx) in data" :key="idx">
            <a v-if="item.label" :href="item.to" :class="{active:item.to===active}">{{item.label}}</a>
          </li>
        </ul>
      </div>
    </div>
    <IndexSidebar v-if="!isIndex" :notIndex="true" v-show="showSidebar"></IndexSidebar>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import IndexSidebar from "./IndexSidebar";
export default {
  name: "IndexNav",
  data() {
    return {
      showSidebar: false,
      active: "",
      data: [
        { label: "首页", to: "/" },
        { label: "购彩大厅", to: "/game" },
        { label: "体育投注", to: "/sport" },
        { label: "手机购彩", to: "/mobile" },
        { label: "优惠活动", to: "/activity" },
        { label: "开奖公告", to: "/notice" },
        // { label: "走势图表", to: "/trend" },
        { label: "帮助中心", to: "/help/helplist/registered" }
      ]
    };
  },
  components: {
    IndexSidebar
  },
  computed: {
    ...mapState({
      gameList: state => state.game.gameList.filter(x => x.enable === 1)
    }),
    isIndex() {
      return this.$route.name === "index";
    }
  },
  methods: {
    enter() {
      this.showSidebar = true;
    },
    leave() {
      this.showSidebar = false;
    }
  },
  mounted() {
    this.active = this.$route.path;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 40px;
  background-color: #e93248;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #fff;
  .game-menu {
    width: 240px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    height: 40px;
    > i {
      background: url(~/index_footer.png) no-repeat;
      width: 21px;
      height: 18px;
      background-position: -333px -59px;
      cursor: pointer;
      display: inline-block;
      margin: 0 20px;
    }
    > span {
      width: 200px;
      display: inline-block;
      height: 38px;
      line-height: 38px;
    }
    &.active {
      background-color: rgb(163, 16, 33);
    }
  }
  .navs {
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    li {
      list-style: none;
    }
    a {
      color: #fff;
      display: block;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 38px;
    }
    a:hover,
    .game-menu:hover,
    a.active {
      background-color: rgb(163, 16, 33);
    }
  }

  .index-sidebar {
    z-index: 1001;
    position: absolute;
    top: 40px;
    left: calc((100% - 1000px) / 2);
    background: #fff;
  }
}
</style>


