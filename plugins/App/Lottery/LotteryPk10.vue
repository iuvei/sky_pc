<template>
  <div class="th" v-if="number.length">
    <div v-for="(v,k) in arr" :key='k' class="td">
      <span :style="getBgColor(v)"> {{showZero?v.padStart(2,"0"):v*1}}</span>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
import { pk10Color } from './color'
export default {
    name: 'pk10',
    props: ['number', 'showZero'],
    computed: {
        arr() {
            return this.number.split('+')
        }
    },
    methods: {
        getBgColor(v) {
            return { backgroundColor: pk10Color(v) }
        }
    }
}
</script>
<style lang="scss" scoped>
.th {
    display: flex;
    justify-content: center;
    align-items: center;
    .td {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .waiting {
        font-size: 24px;
        color: #e93248;
        text-align: center;
    }
    span {
        display: flex;
        height: 18px;
        width: 18px;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        background-color: #e93248;
        color: #fff;
    }
    &.big .td span {
        width: 28px;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
    }
}
</style>

