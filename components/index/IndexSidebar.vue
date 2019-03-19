<template>
  <div class="index-sidebar" :class="{'not-index':notIndex || false}">
    <div @click="buy(game)" v-for="(game, index) in hotGames" :key="index" class="menuitem">
      <div>
        <img :src="game.icon" alt="" /> {{game.game_name}}
        <span class="tip">{{game.tip}}</span>
      </div>
    </div>
    <div v-if="!hotGames.length" v-for="(item,index) in 5" :key="index" class="menuitem">
      <div>
        <span class="img placeholder"></span>
        <span class="tip placeholder"> </span>
        <span class="tip placeholder"> </span>
      </div>
    </div>
    <div class="bottom allLottery">
      <ul>
        <li @mouseover="showHightDetail" @mouseleave="hideHightDetail">
          <div>
            <span class="high-tip">
              高频彩
            </span>
          </div>
          <ul class="more">
            <li v-for="(game, index) in highSpeedGames" :key="index">
              <span @click="buy(game)">{{game.game_name}}</span>
            </li>
          </ul>
          <div class="game_menu_list_2 cp_highcp" v-show="showHigh">
            <div class="content_title">
              <div class="title">高频彩</div>
            </div>
            <div class="content_list">
              <div class="game_item" v-for="(game, index) in gamelist.filter(x => x.speed === 1)" :key="index" :data-tag="game.js_tag" @click="buy(game)">{{game.game_name}}</div>
              <div style="clear:both;"></div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <span class="high-tip">低频彩</span>
          </div>
          <ul>
            <li v-for="(game, index) in lowSpeedGames" :key="index">
              <span @click="buy(game)">{{game.game_name}}</span>
            </li>
          </ul>
        </li>
        <li>
          <div>
            <span class="high-tip">体彩</span>
          </div>
          <ul>
            <li v-for="(game, index) in sportGames" :key="index">
              <span @click="goSport(game)">{{game.game_name}}</span>
            </li>
          </ul>
        </li>
        <li @mouseover="showAllDetail" @mouseleave="hideAllDetail">
          <div>
            <span class="high-tip">全部</span>
          </div>
          <ul class="more">
            <li v-for="(game, index) in allGames" :key="index">
              <span @click="buy(game)">{{game.game_name}}</span>
            </li>
          </ul>
          <div class="game_menu_list_2 cp_highcp cp_allcp" v-show="showAll">
            <div class="content_title">
              <div class="title">全部</div>
            </div>
            <div class="content_list">
              <div class="game_item" v-for="(game, index) in gamelist.filter(x => x.enable === 1)" :key="index" :data-tag="game.js_tag" @click="buy(game)">{{game.game_name}}</div>
              <div style="clear:both;"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'IndexSidebar',
  props:['notIndex'],
  data() {
    return {
      showHigh: false,
      showAll: false
    };
  },
  computed: {
    ...mapState({
      gamelist: state =>
        state.game.gameList
          ? state.game.gameList.filter(x => x.type != 4 && x.type != 3 && x.enable === 1)
          : []
    }),
    hotGames() {
      return this.gamelist.slice(0, 5);
    },
    lowSpeedGames() {
      return this.gamelist.filter(x => x.speed === 0 && x.type !== 2).slice(0, 5);
    },
    highSpeedGames() {
      return this.gamelist.filter(x => x.speed === 1).slice(0, 5);
    },
    sportGames() {
      return this.gamelist.filter(x => x.js_tag === 'sport_key');
    },
    allGames() {
      return this.gamelist.slice(0, 5);
    }
  },
  methods: {
    buy(game) {
      const js_tag = game.js_tag === '3d' ? 'f3d' : game.js_tag
      const path = `/game/${js_tag}${process.env.static?'?id=':'/'}${game.gameid || game.game_id}`
      this.$router.push(path);
    },
    goSport(game) {
      window.location.href = `/sport/today/${game.tip}/championships`;
    },
    showHightDetail() {
      this.showHigh = true;
    },
    hideHightDetail() {
      this.showHigh = false;
    },
    showAllDetail() {
      this.showAll = true;
    },
    hideAllDetail() {
      this.showAll = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.index-sidebar {
  width: 240px;
  height: auto;
  border: 1px solid #dbd4cc;
}
.index-sidebar .menuitem:after {
  content: '';
  display: block;
  width: 90%;
  border-bottom: 1px solid #eee;
  margin: 0 auto;
}
.index-sidebar .ivu-icon::before {
  display: none !important;
}

.index-sidebar img {
  width: 40px;
  height: 40px;
}
.index-sidebar .tip {
  width: 73px;
  max-width: 84px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #a1a1a1;
  padding: 0px 4px 0px 4px;
  &.placeholder {
    background: #ddd;
  }
}
.index-sidebar .img.placeholder {
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
}
.bottom {
  margin-top: 2px;
}
.bottom .high-tip {
  height: 97px;
  color: #f9d901;
}
.bottom > ul > li > div {
  width: 84px;
  padding: 10px;
  text-align: center;
}
.bottom > ul ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
}

.bottom > ul ul li {
  margin: 2px 10px 2px 0;
  line-height: 1.5;
}
.not-index .bottom > ul ul li {
  line-height: 1;
}
.bottom > ul ul li span {
  cursor: pointer;
  font-size: 12px;
  color: #fff;
}
.bottom > ul ul li span:hover,
.index-sidebar .allLottery .menuitem:hover > div {
  // color: rgb(253, 67, 30);
  color: #f9d901;
}
.bottom > ul > li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  height: 84px;
  &:hover {
    background: #585755;
  }
  &:nth-child(2),
  &:nth-child(3) {
    height: 60px;
  }
}

.bottom .cp_highcp {
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 2;
  width: 761px;
  height: 288px;
  // border: 1px solid #dbd4cc;
  background: #585755;
  box-shadow: 0 1px 1px #000;
  // .mark_line {
  //   width: 2px;
  //   background: #ffffff;
  //   height: 68px;
  //   float: left;
  //   margin-left: -2px;
  // }
  .content_title {
    height: 40px;
    text-align: left;
    // background: #ffffff;
    margin-top: 10px;
    .title {
      width: 100px;
      height: 24px;
      font-weight: bold;
      font-size: 22px;
      float: left;
      // margin-top: 26px;
      box-sizing: border-box;
      padding-left: 30px;
      color: #fff;
    }
  }
  .content_list {
    position: relative;
    z-index: 1000;
    // height: 130px;
    text-align: left;
    overflow-y: auto;
    box-sizing: border-box;
    padding-left: 30px;
    .game_item {
      float: left;
      width: 104px;
      height: 26px;
      line-height: 26px;
      // text-align: center;
      font-size: 0.8rem;
      color: #fff;
      cursor: pointer;
      &:hover {
        // background: #e93248;
        color: #f9d901;
        // border-radius: 3px;
        // box-shadow: #990000 0px 0px 6px inset;
      }
    }
  }
}

.bottom .cp_allcp {
  bottom: 0;
  top: auto;
}

.index-sidebar .ivu-menu-item {
  padding: 0;
}

.index-sidebar .menuitem > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px 7px 10px !important;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.index-sidebar .menuitem:hover {
  background: #efefef;
}

.allLottery {
  background: #fe4f75;
  background: -moz-linear-gradient(top, #fe4f75 0%, #fe4f75 0%, #cf1739 100%);
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, #fe4f75),
    color-stop(0%, #fe4f75),
    color-stop(100%, #cf1739)
  );
  background: -webkit-linear-gradient(
    top,
    #fe4f75 0%,
    #fe4f75 0%,
    #cf1739 100%
  );
  background: -o-linear-gradient(top, #fe4f75 0%, #fe4f75 0%, #cf1739 100%);
  background: -ms-linear-gradient(top, #fe4f75 0%, #fe4f75 0%, #cf1739 100%);
  background: linear-gradient(to bottom, #fe4f75 0%, #fe4f75 0%, #cf1739 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fe4f75', endColorstr='#cf1739', GradientType=0 );
}
</style>
