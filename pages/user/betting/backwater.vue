<template>
  <div class="backwater_main_body">
    <div class="title">
      <div class="left">
        <p>返水总额：
          <span>{{rebate.btime+' 至 '+rebate.etime}}</span>
        </p>
        <div class="info">
          <div class="money">
            <span>{{rebate.price}}</span>（元）</div>
          <div class="rebate" @click="togetRebatePrice">
            <i></i>领取</div>
        </div>
      </div>
      <div class="right">
        <div>
          <i></i>
          <span>计算方式：返率×投注额=返水额</span>
        </div>
      </div>
    </div>
    <div class="report">
      <div class="tit">
        <span>我的报表</span>
        <span @click="toDetails()">查看明细＞</span>
      </div>
      <div class="degree_title">
        <span>类型</span>
        <span>返率</span>
        <span>投注额（元）</span>
        <span>返水额</span>
      </div>
      <div class="degree_intro" v-for="(item,key) in rebate.rebate_table" :key="key">
        <span>{{item[0]}}</span>
        <span>{{item[1]+'%'}}</span>
        <span>{{item[2]}}</span>
        <span>{{item[3]}}</span>
      </div>
    </div>
    <div class="level">
      <div class="tit">
        <span>返水层级表</span>
      </div>
      <div class="degree_title">
        <span v-for="(item,key) in rebate.rebate_head" :key="key" :style="'width:'+(100/rebate.rebate_head.length)+'%'">{{item}}</span>
      </div>
      <div class="degree_intro" v-for="(item,key) in rebate.rebate_config" :key="key">
        <span v-for="(i,key) in item" :key="key" :style="'width:'+(100/item.length)+'%'">{{key==0?i*1>=100000000?parseInt(i*1/100000000)+'亿+':i*1>=10000?parseInt(i*1/10000)+'万+':i*1+'元+':i+'%'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      rebate: []
    };
  },
  mounted() {
    this.togetUserRebate();
  },
  methods: {
    ...mapActions('user', ['getUserRebate', 'getRebatePrice']),
    moment(t) {
      return dayjs(t * 1000).format('MM-DD HH:mm');
    },
    async togetUserRebate() {
      this.rebate = await this.getUserRebate();
      console.log(this.rebate);
    },
    async togetRebatePrice() {
      if (this.rebate.price > 0) {
        let res = await this.getRebatePrice();
        this.$Message.success('成功领取返水金额' + res + '元');
        this.rebate.price = 0;
        await this.$store.dispatch('userinfo/flushPrice');
      } else {
        this.$Message.warning('您暂时没有返水可领取,请稍后重试!');
        return;
      }
    },
    toDetails() {
      this.$router.push({
        name: 'user-property-dealrecord',
        params: { type: 10 }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.backwater_main_body {
  border: 1px solid #ccc;
  padding-bottom: 190px;
  .title {
    padding: 20px;
    font-size: 14px;
    border-bottom: 1px dashed #ccc;
    > div {
      display: inline-block;
    }
    .left {
      width: 40%;
      border-right: 1px dashed #ccc;
      p {
        span {
          font-size: 13px;
        }
      }
      .info {
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        margin-top: 10px;
        > div {
          display: inline-block;
        }
        .money {
          line-height: 50px;
          margin-left: 40px;
          span {
            color: #e3393b;
            font-size: 24px;
          }
        }
        .rebate {
          margin-left: 40px;
          background-color: #e33839;
          color: #fff;
          line-height: 30px;
          border-radius: 4px;
          padding: 0 10px 0 35px;
          position: relative;
          cursor: pointer;
          i {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            display: inline-block;
            width: 20px;
            height: 15px;
            background: url('../../../assets/img/receive.png') no-repeat;
            background-size: 100% 100%;
            margin-right: 5px;
          }
        }
      }
    }
    .right {
      padding-top: 10px;
      div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: url('../../../assets/img/count_icon.png') no-repeat;
          background-size: 100% 100%;
          margin-left: 50px;
        }
        span {
          margin-left: 30px;
        }
      }
    }
  }
  .report {
    padding: 0 20px;
    .tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      background-color: #fff;
      line-height: 50px;
      margin-top: 10px;
      span {
        color: #666;
        &:nth-child(2) {
          color: #00a1e9;
          cursor: pointer;
        }
      }
    }
    .degree_title {
      font-size: 14px;
      border: 1px solid #ccc;
      background-color: #f3f3f3;
      span {
        color: #525252;
        text-align: center;
        line-height: 35px;
        width: 25%;
        display: inline-block;
        border-right: 1px solid #ccc;
        &:nth-child(4) {
          border-right: none;
        }
      }
    }
    .degree_intro {
      font-size: 14px;
      color: #626367;
      background-color: #fff;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      span {
        text-align: center;
        line-height: 35px;
        color: #525252;
        display: inline-block;
        width: 25%;
        border-right: 1px solid #ccc;
        &:nth-child(1) {
          color: #000;
          background-color: #f3f3f3;
        }
        &:nth-child(4) {
          color: #e53a33;
          border-right: none;
        }
      }
    }
  }
  .level {
    padding: 0 20px;
    .tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      background-color: #fff;
      line-height: 50px;
      margin-top: 10px;
      span {
        color: #666;
        &:nth-child(2) {
          color: #00a1e9;
        }
      }
    }
    .degree_title {
      font-size: 14px;
      border: 1px solid #ccc;
      background-color: #f3f3f3;
      span {
        color: #525252;
        text-align: center;
        line-height: 35px;
        display: inline-block;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: none;
        }
      }
    }
    .degree_intro {
      font-size: 14px;
      color: #626367;
      background-color: #fff;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      span {
        text-align: center;
        line-height: 35px;
        color: #525252;
        display: inline-block;
        border-right: 1px solid #ccc;
        &:nth-child(1) {
          color: #000;
          background-color: #f3f3f3;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>


