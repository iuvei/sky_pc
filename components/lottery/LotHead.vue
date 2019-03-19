<template>
  <div>
    <div class="only_header">
      <div class="top">
        <span class="_title">{{game.game_name}}开奖公告</span>
        <span class="_title_time">[每
          <strong>{{info && info.pinlv}}</strong>钟开奖]</span>
        <span class="_title_icon_red"
              data-link="17"
              data-name="北京28"
              @click="goTrend">
          <i class="icon_zoushi_red"></i> 号码走势</span>
        <span class="_title_icon_greed"
              data-tag="bj28"
              @click="toRule(game)">
          <i class="icon_zoushi_greed"></i> 玩法规则</span>
      </div>
      <div class="container">
        <div style="width:425px;float:left">第
          <select class="select-qishu"
                  v-model="curQishu"
                  @change="afterSelectQishu">
            <option class="previeqishu"
                    v-for="(item, index) in list"
                    :key="index">{{item && item.qishu}}</option>
          </select>
          期
          <span style="margin-left: 20px;">开奖日期 :
            <strong class="this_kj">{{(lastInfo && lastInfo.opentime) | formatTime}}</strong>
          </span>
        </div>
        <div class="_title_balls ball_container"
             :class="{'qxc-head':isQxc,'pk10-head':isPk10 || isNiu,'elex5-head':is11x5,'ssc-head':isSSC,'xync-head':isNC}">
          <AppLotteryNum v-if="game && lastInfo && lastInfo.balls"
                         :class="{'big':isPk10 || isNiu}"
                         :number="lastInfo && lastInfo.balls"
                         :type="game.js_tag"
                         :qishu="lastInfo.qishu" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "lottery-game-head",
  props: ["game", "data"],
  data() {
    return {
      lastInfo: {},
      curQishu: "",
      list: []
    };
  },
  filters: {
    formatTime(openTime) {
      if (openTime) {
        return dayjs(openTime * 1000).format("YYYY-MM-DD HH:mm:00");
      } else {
        return dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:00");
      }
    }
  },
  computed: {
    ...mapState("game", ["qishus"]),
    info() {
      if (this.qishus && this.qishus.length) {
        return this.qishus.find(
          x => x.gameid === (this.game.game_id || this.game.gameid)
        );
      }
      return {};
    },
    isPk10() {
      return this.game && this.game.js_tag === "pk10";
    },
    isQxc() {
      return this.game && this.game.js_tag === "qxc";
    },
    is11x5() {
      return this.game && this.game.js_tag === "11x5";
    },
    isSSC() {
      return this.game && this.game.js_tag === "ssc";
    },
    isNiu() {
      return this.game && this.game.js_tag === "pkniuniu";
    },
    isNC() {
      return this.game && this.game.js_tag === "xync";
    }
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"]),
    afterSelectQishu(event) {
      if (this.list && this.list.length) {
        this.lastInfo = this.list.find(x => x.qishu == this.curQishu);
      }
    },
    // 获取单个开奖时间
    async togetKjCpLogOne(tag, date, pcount = 0) {
      let ret = await this.getKjCpLog({ tag, date, pcount });
      this.$emit("getDetail", ret);
      if (ret.length) {
        let c = Object.assign([], ret);
        this.list = c.reverse();
        this.lastInfo = this.list[0];
        this.curQishu = this.lastInfo.qishu;
        return true;
      }
      return false;
    },
    async getData() {
      await this.togetKjCpLogOne(this.game.tag, 0);
    },
    goTrend() {
      this.$router.push({ name: "trend", params: this.game });
    },
    toRule(game) {
      this.$router.push(`/gamehelp/tag/ssc?game_name=${game.game_name}`);
    }
  },
  watch: {
    async game(val) {
      await this.getData();
    },
    data(val) {
      if (val && Array.isArray(val) && val.length) {
        const c = Object.assign([], val);
        this.list = c.reverse();
        this.lastInfo = this.list[0];
        this.curQishu = this.lastInfo.qishu;
      } else {
        this.list = [];
        this.lastInfo = null;
        this.curQishu = "";
      }
    }
  },
  async created() {
    if (!process.browser) return;
    await this.getData();
  }
};
</script>
<style lang="scss" scoped>
.ball_container {
  max-width: 800px;
}
.qxc-head /deep/ .th,
.ssc-head /deep/ .th,
.elex5-head /deep/ .th,
.xync-head /deep/ .th {
  width: 200px;
  display: flex;
  justify-content: space-around;
  .td {
    width: 40px;
    > span {
      width: 40px;
      height: 40px;
      background-size: 40px 40px;
      font-size: 20px;
      line-height: 38px;
    }
  }
}

.xync-head /deep/ .th {
  width: auto;
}
.pk10-head {
  width: 400px;
}
.container {
  display: flex;
  align-items: center;
}
.this_kj {
  color: #f84d4d;
  font-weight: 300;
  font-size: 14px;
}
</style>

<style lang="scss">
.select-qishu {
  border: 1px solid #e93248;
  border-radius: 4px;
  padding: 0 3px;
  height: 26px;
  line-height: 26px;
  outline: none !important;
}
.only_header {
  background: rgb(255, 247, 240);
  border: 1px solid #ffe3c7;
  // height: 100px;
  color: #333;
  padding: 5px 14px;
}

.only_header .top {
  margin: 10px 0px 10px 0px;
  color: #333;
}

.only_header .top ._title_icon_red {
  background: url(~/assets/img/index_zoushi_red.png) no-repeat;
  color: #f84d4d;
  font-size: 12px;
  margin-left: 44px;
  text-indent: 2em;
  background-size: 25px;
  width: 120px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  cursor: pointer;
}

.only_header .top ._title_icon_greed {
  color: #60c78c;
  background: url(~/assets/img/index_zoushi_greed.png) no-repeat;
  font-size: 12px;
  margin-left: 44px;
  text-indent: 2em;
  background-size: 25px;
  width: 120px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  cursor: pointer;
}

.only_header .top ._title {
  font-size: 20px;
  font-weight: 100;
}
.only_header .top ._title_time {
  color: #666;
  font-size: 14px;
  line-height: 26px;
  margin-left: 40px;
}
</style>
