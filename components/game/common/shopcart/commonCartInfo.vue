<template>
  <div class='cart-row-info'>
    <div class="section info-header">
      <div class="td">
        <div class="label">注单号：</div>
        <div class="value">{{componentData.zhudan}}</div>
      </div>
      <div class="td">
        <div class="label">下注时间：</div>
        <div class="value">{{componentData.tz_time}}</div>
      </div>
    </div>
    <div class="section info-body">
      <div class="td" v-for="(val,key) in head" :key="key">
        <div class="label">{{val.title}}</div>
        <div class="value">{{data[val.key]}}</div>
      </div>
    </div>
    <div class="btn">
      <button class="ivu-btn ivu-btn-error cancel" v-show="componentData.status==0" @click="rollBack">{{backBtnTxt}}</button>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";

export default {
  name: 'cartRowInfo',
  props: ['componentData', 'beforeClose', 'visible'],
  data() {
    return {
      head: [
        // { title: "注单号：", key: "zhudan" },
        // { title: "下注时间：", key: "tz_time" },
        { title: '期号：', key: 'qishu' },
        { title: '赔率：', key: 'peilv' },
        { title: '彩种：', key: 'game_name' },
        { title: '投注注数：', key: 'zhushu' },
        { title: '注单金额：', key: 'per_price' },
        { title: '投注金额：', key: 'pay_money' },
        { title: '玩法：', key: 'wanfa' },
        { title: '中奖金额：', key: 'win' },
        { title: '状态：', key: 'statusTxt' },
        { title: '盈亏：', key: 'is_win' },
        { title: '下注号码：', key: 'xiangqing' },
        { title: '开奖号码：', key: 'kj_balls' },
      ],
      statusTxt: ['待开奖', '已中奖', '未中奖', '已撤单'],
      backBtnTxt: '撤销注单',
    };
  },
  computed: {
    // ...mapState("game", ["gameId"]),
    data() {
      let data = { ...this.componentData };
      data.statusTxt = this.statusTxt[this.componentData.status];
      data.pay_money = (this.componentData.zhushu * 1).float(
        'multiply',
        this.componentData.per_price * 1
      );
      if (!this.componentData.kj_balls && !this.componentData.status) {
        data.kj_balls = '正在开奖...';
        data.win = '敬请期待';
        data.is_win = '敬请期待';
      }
      else if(data.game_name === '经典梯子' && data.kj_balls){
        const kj_balls = data.kj_balls.split(' ')
        data.kj_balls = (kj_balls[0] == 0 ? '左' : '右') +' '+ (kj_balls[1] == 0 ? 3 : 4) +' '+ (kj_balls[2] == 0 ? '单' : '双')
      }
      return data;
    },
  },
  methods: {
    rollBack() {
      if (this.backBtnTxt === '正在撤单') return;
      this.backBtnTxt = '正在撤单';
      this.beforeClose(true);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.backBtnTxt = '撤销注单';
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.cart-row-info {
  width: 635px;
  padding: 0 0 10px !important;
  .section {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    color: #1d1c1c;
    .td {
      display: flex;
      align-items: center;
      min-height: 50px;
      border-bottom: 1px solid #eaeaea;
      .label {
        width: 80px;
      }
      .value {
        flex: 1;
      }
      &:nth-child(9),
      &:nth-child(10) {
        height: auto;
        .value {
          flex: 1;
        }
      }
    }
    .td:nth-child(2n) {
      width: 250px;
    }
    .td:nth-child(2n + 1) {
      width: 330px;
    }
  }
  .info-header {
    background-color: #eaeaea;
    padding: 0 20px;
    .td {
      // width: 50%;
      height: 40px;
      border-bottom: 0;
    }
  }
  .info-body {
    padding: 0 20px;
  }
  .btn {
    height: 50px;
    line-height: 50px;
    text-align: center;
    button {
      font-size: 16px;
    }
  }
}
</style>