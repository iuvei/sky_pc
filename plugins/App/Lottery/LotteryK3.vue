<template>
  <div class="th" v-if="number.length">
    <div v-for="(v,k) in arr" :key='k' class="td">
      <span :class="`num-${v}`"> </span>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
import { pcddColor } from './color'
export default {
    name: 'k3',
    props: ['number'],
    computed: {
        arr() {
            return this.number.split('+')
        }
    },
    methods: {
        getBgColor(v) {
            // console.log(v, require(`./img/2.png`))
            return { backgroundImage: { url: require(`./img/2.png`) } }
        }
    }
}
</script>
<style lang="scss" scoped>
@for $i from 1 through 6 {
    .num-#{$i} {
        background: url('./img/'+$i+'.png') no-repeat;
    }
}
.th {
    display: flex;
    .td {
        display: flex;
        // padding: 0 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        height: 24px;
        width: 24px;
        font-size: 16px;
        text-align: center;
        background-size: 22px 22px;
        margin: 0 5px;
    }
    .waiting {
        font-size: 24px;
        color: #e93248;
        text-align: center;
    }
}
</style>

