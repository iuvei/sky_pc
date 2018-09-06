<template>
  <div class="lottery-tab-container">
    <div class="cur-day">{{curDay}} 开奖号码</div>
    <div class="ivu-tabs-nav-scroll">
      <div class="nav-text ivu-tabs-nav">
        <!-- <div class="ivu-tabs-ink-bar ivu-tabs-ink-bar-animated" style="display: none; width: 62px; transform: translate3d(0px, 0px, 0px);"></div> -->
        <div class="ivu-tabs-tab" :class="{'ivu-tabs-tab-active': curIndex===0}" @click="tabClick(0)">
          今日
        </div>
        <div class="ivu-tabs-tab" :class="{'ivu-tabs-tab-active': curIndex===1}" @click="tabClick(1)">
          昨日
        </div>
        <div class="ivu-tabs-tab" :class="{'ivu-tabs-tab-active': curIndex===2}" @click="tabClick(2)">
          前日
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "lottery-tab",
  props: ["game"],
  data() {
    return {
      curDay: dayjs(new Date().getTime()).format("YYYY-MM-DD"),
      curIndex: 0
    };
  },
  created() {
    this.$bus.$on("reload", () => {
      this.tabClick(this.curIndex);
    });
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog", "setCurIndex"]),
    async tabClick(tabIndex) {
      this.curIndex = tabIndex;
      this.setCurIndex(tabIndex);
      this.curDay = this.getCurDay(tabIndex);
      this.$emit("setDay", this.curDay.replace(/-/g, ""));
      await this.togetKjCpLogOne(this.game.tag, -tabIndex);
    },
    async togetKjCpLogOne(tag, date, pcount = 0) {
      let ret = await this.getKjCpLog({ tag, date, pcount});
      this.$emit("getDetail", ret);
    },
    getCurDay(index) {
      return dayjs(new Date().getTime() - 86400 * 1000 * index).format(
        "YYYY-MM-DD"
      );
    }
  }
};
</script>

<style>
.lottery-tab-container {
  margin-top: 10px;
  position: relative;
}
.cur-day {
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  display: inline-block;
  line-height: 28px;
  text-align: center;
  color: #f60;
  font-weight: 100;
  font-size: 14px;
  border: 0;
  text-align: center;
  width: 200px;
}
.lottery-tab-container
  .lottery-tab
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.lottery-tab-container
  .lottery-tab
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.lottery-tab-container .ivu-tabs-nav .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
  height: 32px;
  padding-bottom: 5px;
  background: #fff;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  border-color: #dddee1;
  color: rgb(73, 80, 96);
  border: 1px solid #dddee1;
  margin-right: 4px;
  transition: all 0.5s ease;
  z-index: 1000;
}
.lottery-tab-container .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #f60 !important;
}
.lottery-tab-container .ivu-tabs-tab-active {
  border-top: 1px solid #f60 !important;
  color: #f60 !important;
  border-bottom: 1px solid #fff !important;
}
.lottery-tab-container .ivu-tabs-tab {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.lottery-tab-container .ivu-tabs-tab-active:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #f60;
  position: absolute;
  top: 0;
  left: 0;
}
.lottery-tab-container .ivu-tabs-tab-active:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 1px;
  background: #fff;
  bottom: 0;
  left: 0;
}
.lottery-tab-container .ivu-tabs-nav-scroll {
  padding-left: 209px;
  margin-bottom: -1px;
}
</style>

