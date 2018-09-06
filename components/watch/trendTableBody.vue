<template>
  <div class='table-body'>
    <div class="left">
      <div v-for="(item,key) in bodyLeftData" :key="key" class="tr line">
        <div class="periods b" :style="{width:bodyOption.periods+'px'}">{{item.qishu}}</div>
        <div class="td b " v-for="(v,k) in bodyOption.field" :key="k">
          <span>{{item[v]}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <trendTableBodyGroup v-for="(v,k) in bodyOption.field" :key="k" class="group" :k="k" :head="bodyOption.head" :data='bodyRightData[k]' :viewOption="viewOption"></trendTableBodyGroup>
    </div>
  </div>
</template>
<script>
import trendTableBodyGroup from "./trendTableBodyGroup";
export default {
  name: "trendTableBody",
  components: { trendTableBodyGroup },
  props: ["bodyOption", "bodyLeftData", "bodyRightData", "viewOption"],

  mounted() {},
};
</script>
<style lang='scss' scoped>
.table-body {
  display: flex;
  .left {
    .td span {
      display: inline-block;
      height: 20px;
      width: 20px;
      border-radius: 20px;
      background: #f13030;
      font-weight: 700;
      line-height: 20px;
      text-align: center;
      color: #fff;
    }
  }
  .right {
    flex: 1;
    display: flex;
    .group {
      flex: 1;
    }
  }
}
</style>