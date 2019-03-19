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
            <a v-if="item.label=='聊天室'" href="javascript:void(0)" target="_blank" @click="toChatroom" :class="[{active:item.to===active}, 'chat-room']">{{item.label}}</a>
            <a :href="item.to" :class="{active:item.to===active}" v-else-if="['体育','竞彩'].includes(item.label)">{{item.label}}</a>
            <nuxt-link href="" :to="item.to" :class="{active:item.to===active}" v-else>{{item.label}}</nuxt-link>
          </li>
          <li class="dh_more">
            <Dropdown placement="bottom-end">
              <a href="javascript:void(0)">
                更多
                <Icon size="26" type="md-arrow-dropdown" style="margin-left:-8px" />
              </a>
              <DropdownMenu slot="list" style="flex-direction: column;background-color: #e93248;">
                <DropdownItem v-for="(el, index) in datalist" :key="index" style="color: #fff; font-size: 18">
                  <div @click="clickList(el, index)">{{el.name}}</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import IndexSidebar from "./IndexSidebar";
import qs from "qs";
export default {
  name: "IndexNav",
  data() {
    return {
      showSidebar: false,
      active: "",
      showRoom: false,
      roomPassword: "",
      childWin: null,
      showLastRoom: false,
      lastRoomNumber: "",
      data: [
        { label: "首页", to: "/" },
        { label: "购彩大厅", to: "/game" },
        { label: "皇冠体育", to: "/sport" },
        { label: "竞彩", to: "/jingcai" },
        { label: "电子", to: "/thegame" },
        { label: "棋牌", to: "/boardGames" },
        { label: "捕鱼", to: "/hishingGame" }
        // { label: '手机购彩', to: '/mobile' },
        // { label: "优惠活动", to: "/activity" }
      ],
      datalist: [
        {
          name: "手机购彩",
          path: "/mobile"
        },
        {
          name: "开奖公告",
          path: "/notice"
        },
        {
          name: "优惠活动",
          path: "/activity"
        },
        {
          name: "走势图表",
          path: "/trend"
        },
        {
          name: "帮助中心",
          path: "/help/helplist/registered"
        }
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
    ...mapActions("userinfo", ["getChatState"]),
    clickList(n, i) {
      this.$router.push(n.path);
    },
    enter() {
      this.showSidebar = true;
    },
    leave() {
      this.showSidebar = false;
    }
  },
  mounted() {
    this.active = this.$route.path;
  },
  watch: {
    "$route.path"() {
      this.active = this.$route.path;
    }
  }
};
</script>
<style lang="scss">
.dh_more {
  .ivu-dropdown-item {
    font-size: 18px !important;
  }
  .ivu-dropdown-item:hover {
    background-color: #000;
  }
}
</style>
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
      .chat-room {
        background: url("../../assets/img/hot_new.gif") no-repeat top right;
        background-size: 20px 15px;
      }
    }
    a {
      color: #fff;
      display: block;
      width: 95px;
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


