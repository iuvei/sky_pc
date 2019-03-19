<template>
  <div class="history-wrap">
    <div class="history-title">
      <div>
        期数
      </div>
      <div>
        开奖结果
      </div>
    </div>
    <div class="history-content">
      <div v-for="item in kjData" :key="item.qishu" class="history-item">
        <div class="history-qishu">{{item.qishu}}</div>
        <div class="history-icon">
          <span v-if="item.balls.length === 3" :class="['ball', item.balls[2] ? 'background-red' : 'background-blue']">
            {{item.balls[2]?'双':'单'}}
            <span class="num background-black">{{item.balls[1]?4:3}}</span>
          </span>
          <span v-else>开奖中</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "history-content",
  props:['kjList'],
  data() {
    return {
    };
  },
  computed: {
    kjData(){
      let data = JSON.parse(JSON.stringify(this.kjList || []))
      data = data.map(el => {
        el.balls = el.balls.split('+').map(ball=>ball*1)
        return el
      })
      return data
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.history-wrap {
  background-image: url("~/assets/img/ladder-bg-1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  position: relative;
  padding: 7px 10px;
  height: 300px;
  .history-title {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b58e5e;
    border: 1px solid #b58e5e;
    color: #ffffff;
    > div {
      flex: 1;
      text-align: center;
      &:first-child {
        border-right: 1px solid #9d7f59;
      }
    }
  }
  .history-content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    .history-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      &:nth-child(n + 2) {
        border-top: 1px solid #ffffff;
      }
    }
    .history-qishu {
      flex: 1;
      color: #000000;
    }
    .history-icon {
      min-width: 80px;
    }
    .ball {
      position: relative;
      width: 30px;
      height: 30px;
      padding: 0;
      font-size: 14px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: rgb(255, 255, 255);
      border-radius: 1000px;
      .num {
        position: absolute;
        width: 12px;
        height: 12px;
        padding: 0;
        font-size: 10px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 1000px;
        left: -2px;
        top: -2px;
      }
    }
    .background-red {
      background-color: #e23a39;
    }
    .background-blue {
      background-color: #04a0ea;
    }
    .background-black {
      background-color: #000000;
    }
  }
}
</style>
