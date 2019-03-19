<template>
  <div class="th" v-if="number.length">
    <div v-for="(ball,num) in arr" :key='num' class="td">
      <span class="pk_card"><img :src="ball_icons[ball-1]" alt=""></span>
    </div>
  </div>
  <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
const ball_icons = Array(20).fill('').map((el,id) => require('../../../assets/img/xync_background/lucky_ball_'+(id+1+'').padStart(2,'0')+'.png'))
export default {
  name: "xypk",
  props: ["number"],
  data() {
    return {
      ball_icons
    }
  },
  computed: {
    arr() {
      if(Array.isArray(this.number)) return this.number
      return this.number.split("+");

    },
  },
  methods: {
    // 计算花色
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
    // 计算大小
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .td {
    display: flex;
    // padding: 0 2px;
  }
  img {
    width: 30px;
  }
  span {
    height: 24px;
    width: 24px;
    font-size: 16px;
    text-align: center;
    background-size: 22px 22px;
    // margin-right: 10px;
  }
}
</style>

