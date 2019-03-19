<template>
  <div class='trend-group'>
    <canvas v-trend-canvas="trendLine" class="canvas" :height="30*this.data.length" :width="30*this.head.length" :class="{hide:!viewOption.lineKey}"></canvas>
    <div v-for="(row,idx) in data1" :key="idx" class="line tr">
      <div class="td b" v-for="(v,k) in head" :key="k" :class="{ball:row==v}">
        <span v-if="viewOption.cellKey||(row==v)">{{computedCell(row, idx, v)}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import trendCanvas from './tablecanvas';
export default {
  name: 'trendGroup',
  props: ['head', 'data', 'k', 'viewOption'],
  computed: {
    trendLine() {
      return {
        data: this.data,
        size: this.head,
        start: this.head[0],
        cell: '30',
        color: this.k % 2 ? '#ea721a' : '#11b35e',
      };
    },
    data1() {
      return JSON.parse(JSON.stringify(this.data)).reverse();
    },
  },
  directives: { trendCanvas },
  methods: {
    // 计算灰值数据
    computedCell(row, idx, v) {
      if (row == v) return row;
      let start = this.data1.lastIndexOf(v, idx);
      if (start === -1) {
        return idx + 1;
      } else {
        return idx - start;
      }
    },
  },
  mounted() {
    // console.log(this.data);
    // this.prepareCanvas(this.data);
  },
};
</script>
<style lang='scss' scoped>
.trend-group {
  // display:
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  .canvas {
    position: absolute;
    left: 0;
    opacity: 1;
    transition: opacity 0.5s;
  }
  .hide {
    // display: none;
    opacity: 0;
    transition: opacity 0.5s;
    // transition: opacity 200;
  }
  .td {
    color: #ddd;
  }

  .ball {
    span {
      display: inline-block;
      height: 20px;
      width: 20px;
      border-radius: 20px;
      font-weight: 700;
      box-shadow: #666 1px 1px 1px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      z-index: 1;
    }
  }
}
</style>
