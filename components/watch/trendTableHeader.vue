<template>
  <div class='table-head'>
    <div :style="{width:headerData.periods.width+'px'}" class="b">{{headerData.periods.label}}</div>
    <div :style="{width:headerData.numbers.width+'px'}" class="b line">{{headerData.numbers.label}}</div>
    <div v-for="(item,key) in headerData.data" :key="key" class="line">
      <div class="b">{{item.label}}</div>
      <div class="tr">
        <div class="td b" v-for="(v,k) in item.sub" :key="k">{{v}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "trendTableHead",
  props: ["headerData"],
};
</script>
<style lang='scss' scoped>
.table-head {
  display: flex;
  align-items: center;
  height: 60px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
  .line {
    flex-direction: column;
    > div {
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>