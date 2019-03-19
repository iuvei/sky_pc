<template>
  <div class="th"
       v-if="number.length">
    <div v-for="(v,k) in arr"
         :key='k'
         class="td"
         :class="{'td5':k===5}">
      <span :style="getBgColor(v)"> {{v}}</span>
      <i v-if="k===5">+</i>
      <div class="shengxiao">{{shengxiao(v)}}</div>
    </div>
  </div>
  <div class="waiting"
       v-else>正在开奖...</div>
</template>
<script>
import { lhcColor } from "./color";
import { mapState } from "vuex";
import calclhc from "../../../components/lottery/calc_lhc.js";
export default {
  name: "lhc",
  props: ["number", "qishu"],
  computed: {
    ...mapState("game", ["gameList"]),
    arr() {
      return this.number.split("+");
    }
  },
  methods: {
    shengxiao(val) {
      let yearid = this.gameList.filter(i => i.js_tag === 'lhc')[0].yearid
      let argYear
      if (yearid == 0) {
        argYear = this.qishu > 2019014 ? yearid : 11
      } else {
        argYear = this.qishu > 2019014 ? yearid : yearid - 1
      }
      // console.log(this.qishu, this.number)
      // debugger
      return calclhc.sx(val, argYear)
      // return calclhc.sx(val);
    },
    getBgColor(v) {
      return { backgroundColor: lhcColor(v) };
    }
  }
};
</script>
<style lang="scss" scoped>
.th {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .shengxiao {
    height: 26px;
    width: 26px;
    border-radius: 50%;
    font-size: 16px;
    text-align: center;
  }
  .td {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .td5 {
    margin-right: 4px;
  }
  .waiting {
    font-size: 24px;
    color: #e93248;
    text-align: center;
  }
  span {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
    background-color: #e93248;
    color: #fff;
  }
  i {
    color: #5e5e5e;
    top: 0;
    right: -7px;
    font-size: 14px;
    font-weight: bolder;
    position: absolute;
    font-style: normal;
  }
}
</style>

