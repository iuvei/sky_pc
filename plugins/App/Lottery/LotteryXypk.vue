<template>
  <div class="th" v-if="number.length">
    <div v-for="(ball,num) in arr" :key='num' class="td">
      <span class="pk_card"><img :src="require('../../../assets/img/puke/card/'+ cardColor(ball) +'_'+ cardNum(ball) +'.png')" alt=""></span>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
import { pcddColor } from "./color";
export default {
  name: "xypk",
  props: ["number"],
  computed: {
    arr() {
      return this.number.split("+");
    },
  },
  mounted () {
    console.error(this.number)
  },
  methods: {
    cardColor(ball){
      let balls = parseInt(ball, 10);
      let color = (ball%4);
      let hs = '';
      if(color == 0){
        hs = 'spade'
      }
      else if(color == 1){
        hs = 'heart'
      }
      else if(color == 2){
        hs = 'plum'
      }
      else if(color == 3){
        hs = 'block'
      }
      else{
        hs = '-'
      }
      return hs;
    },
    cardNum(ball){
      let balls = parseInt(ball, 10);
      let dx = parseInt((balls/4) + 1);
      if(dx == 11) return 'J'
      if(dx == 12) return 'Q'
      if(dx == 13) return 'K'
      if(dx == 1) return 'A';
      return dx;
    }
  },
};
</script>
<style lang="scss" scoped>
.th {
  display: flex;
  .td {
    display: flex;
    // padding: 0 2px;
  }
img{
    width: 18px;
}
  span {
    height: 24px;
    width: 24px;
    font-size: 16px;
    text-align: center;
    background-size: 22px 22px;
    margin-right: 10px;
  }
}
</style>

