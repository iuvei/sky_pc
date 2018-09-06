<template>
  <div class="table-wrap">
    <div class="table" v-if="headerData">
      <!-- 表格头 -->
      <trendTableHeader :headerData="headerData"></trendTableHeader>
      <!-- 表格走势 -->
      <trendTableBody :bodyOption="bodyOption" :viewOption="option" :bodyLeftData="bodyLeftData" :bodyRightData='bodyRightData'></trendTableBody>
      <trendTableView :viewData='viewData' :change="change"></trendTableView>
      <trendTableHeader :headerData="headerData"></trendTableHeader>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getTrendBallArr, getTrendHeads } from "./tableHeader";
import trendTableHeader from "./trendTableHeader";
import trendTableBody from "./trendTableBody";
import trendTableView from "./trendTableView";
export default {
  name: "trendTable",
  components: { trendTableHeader, trendTableBody, trendTableView },
  props: ["gameId", "gameJsTag", "option"],
  data() {
    return {
      periodsWidth: 160,
      cellWidth: 30,
      //开奖下标
      keys: [],
      change: 1,
      headerData: "",
      bodyLeftData: [],
      bodyRightData: [],
      bodyOption: {},
      viewData: {},
    };
  },
  methods: {
    ...mapActions("game", ["getTrenlistData"]),
    // 组装头部数据
    getHeaderData() {
      let head = getTrendHeads[this.gameJsTag];
      let ballArr = getTrendBallArr[this.gameJsTag];
      this.headerData = {
        periods: { label: "期号", width: this.periodsWidth },
        numbers: { label: "开奖号码", width: this.cellWidth * head.length },
        data: head.map(v => ({
          label: v,
          sub: ballArr,
        })),
      };
    },
    // 组装期号数据
    getBodyLeft(ret) {
      this.bodyOption = {
        periods: this.periodsWidth,
        numbers: this.cellWidth * this.keys.length,
        field: this.keys,
        head: getTrendBallArr[this.gameJsTag],
      };
      this.bodyLeftData = ret.list;
    },
    // 组装走势数据
    getBodyRight(ret) {
      this.bodyRightData = this.keys.map(v => {
        return ret.list.map(item => item[v] * 1);
      });
    },
    // 组装计算数据
    getViewData(ret) {
      this.viewData.width =
        this.periodsWidth + this.cellWidth * this.keys.length;
      this.viewData.totalrows = this.bodyLeftData.length;
      this.viewData.data = this.keys.map((num, idx) =>
        getTrendBallArr[this.gameJsTag].map(val => {
          return this.bodyRightData[idx]
            .map((v, k) => {
              if (v == val) {
                return { v, k };
              }
            })
            .filter(v => v);
        })
      );
      this.change++;
    },
    async togetTrenlistData(pcount = 20) {
      let head = getTrendHeads[this.gameJsTag];
      let keys = head.map((v, k) => `ba_${k}`);
      this.keys = keys;
      let ret = await this.getTrenlistData({ gameid: this.gameId, pcount });
      // console.log(ret);
      this.getBodyLeft(ret);
      this.getBodyRight(ret);
      this.getViewData();
      this.getHeaderData();
    },
  },
  mounted() {
    this.togetTrenlistData();
    this.$bus.$on("getTrenlistData", this.togetTrenlistData);
  },
  watch: {
    gameId() {
      this.togetTrenlistData();
    },
  },
};
</script>

<style lang="scss" >
.table-wrap {
  padding-left: 20px;
  overflow-x: auto;
  // width: 100vw;
}
.table {
  border: {
    width: 1px;
    style: solid;
    top-color: #ccc;
    left-color: #ccc;
    right-color: transparent;
    bottom-color: transparent;
  }
  .tr {
    display: flex;
    .td {
      width: 30px;
      height: 30px;
      cursor: pointer;
      user-select: none;
    }
  }
  .b {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table-body .right .group {
    &:nth-child(2n + 1) {
      .ball span {
        background-color: #11b35e;
        &:hover {
          background-color: #29bcf1;
          transform: scale(1.1);
        }
      }
    }
    &:nth-child(2n) {
      .ball span {
        background-color: #ea721a;
        &:hover {
          background-color: #f30;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>


