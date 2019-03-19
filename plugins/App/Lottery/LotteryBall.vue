<template>
  <div class="th" v-if="number.length">
    <div v-for="(v,k) in arr" :key='k' class="td">
      <span>{{v*1}} </span>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
import { pcddColor } from './color'
export default {
  name: 'ball',
  props: ['number'],
  computed: {
    arr() {
      return (this.number || '').split('+')
    }
  },
  methods: {
    getBgColor(v) {
      return { backgroundColor: 'red' }
    }
  }
}
</script>
<style lang="scss" scoped>
.th {
  display: flex;
  .td {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      height: 26px;
      width: 26px;
      border-radius: 50%;
      font-size: 16px;
      text-align: center;
      background: url("./img/ball.png") no-repeat;
      // background-size: cover;
      background-size: 26px 26px;
      color: #666;
    }
  }
  .waiting {
    font-size: 24px;
    color: #e93248;
    text-align: center;
  }
}
</style>

