<template>
  <div class="th" v-if="number.length">
    <div v-for="(v,k) in arr" :key='k' class="td">
      <span :style="getBgColor(v)"> {{v}}</span>
      <i v-if="k===2">=</i>
      <i v-else-if="k===3"></i>
      <i v-else>+</i>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
import { pcddColor } from './color'
export default {
    name: 'pcdd',
    props: ['number'],
    computed: {
        arr() {
            return this.number.split('+')
        }
    },
    methods: {
        getBgColor(v) {
            return { backgroundColor: pcddColor(v) }
        }
    }
}
</script>
<style lang="scss" scoped>
.th {
    display: flex;
    .td {
        display: flex;
        // padding: 0 2px;
    }
    .waiting {
        font-size: 24px;
        color: #e93248;
        text-align: center;
    }
    span {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        background-color: #e93248;
        color: #fff;
    }
    i {
        color: #5e5e5e;
        font-size: 16px;
        font-weight: bolder;
        padding: 0 4px;
        font-style: normal;
    }
}
</style>

