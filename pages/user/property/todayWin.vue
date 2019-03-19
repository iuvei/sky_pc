<template>
  <!-- 今日盈亏页面 -->
  <div class="today_win_loss">
    <div class="top_content">
      <div class="title">
        <div class="left">
          <span class="jryk_top">今日盈亏:
          </span>
          <div class="info">
            <div class="money">
              <span>{{(baseData.profit * 1 || 0.00).toFixed(2)}}</span>元
            </div>
          </div>
        </div>
        <div class="center">
          <div class="right_div">
            <i class="right_div_left"></i>
            <span>
              <p>今日充值</p>
              <p>{{(baseData.pay * 1 || 0.00).toFixed(2)}}</p>
            </span>
          </div>
        </div>
        <div class="right">
          <div class="right_div">
            <i class="right_div_right"></i>
            <span>
              <p>今日提现</p>
              <p>{{(baseData.tkprice * 1 || 0.00).toFixed(2)}}</p>
            </span>
          </div>
        </div>
      </div>
      <div class="top_top">
        时间:
        <Col span="12" class="xzrq">
        <DatePicker @on-change="handleChange" :clearable="false" :options="options3" v-model="lasttime" format="yyyy-MM-dd" type="date" style="width: 200px"></DatePicker>
        </Col>
      </div>
      <nuxt />
      <!-- 表格部分 -->
      <div class="grids_box">
        <div class="grids_pieces">
          <p>{{(bData.touzhu * 1 || 0.00).toFixed(2)}}</p>
          <p>投注金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.paicai * 1 || 0.00).toFixed(2)}}</p>
          <p>中奖金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.caijin * 1 || 0.00).toFixed(2)}}</p>
          <p>赠送礼金</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.fanshui * 1 || 0.00).toFixed(2)}}</p>
          <p>反点金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.pay * 1 || 0.00).toFixed(2)}}</p>
          <p>充值金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.tkprice * 1 || 0.00).toFixed(2)}}</p>
          <p>提现金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{(bData.profit * 1 || 0.00).toFixed(2)}}</p>
          <p>盈亏汇总</p>
        </div>
      </div>
      <div class="warm_prompt">
        <p>温馨提示:</p>
        <p>*-投注金额: 在当天开奖的投注订单金额</p>
        <p>*-中奖金额: 在当天派发的金额</p>
        <p>*-盈利汇总: 中奖金额 + 赠送彩金 + 返水金额 - 投注金额</p>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
export default {
  name: 'today_win_loss',
  components: {},
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      lasttime: new Date(),
      baseData: {},
      bData: {}
    }
  },
  watch: {
    lasttime: 'initData'
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions('user', ['GetProfitAndLoss']),
    async initData() {
      let params = {
        loading: true,
        lasttime: dayjs(this.lasttime).format('YYMMDD') || ''
      }
      let data = (await this.GetProfitAndLoss(params)) || {}
      if (
        this.lasttime === '' ||
        dayjs().format('YYMMDD') === dayjs(this.lasttime).format('YYMMDD')
      ) {
        this.baseData = data
      }
      this.bData = data || {}
    },
    handleChange(date) {
      this.lasttime = date
    }
  }
}
</script>
<style lang="scss" scoped>
.today_win_loss {
  .top_content {
    margin-top: 12px;
    width: 100%;
    min-height: 42rem;
    font-size: 14px;
    border: solid 1px #dbdbdb;
    .title {
      font-size: 16px;
      width: 100%;
      height: 8rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;
      .left {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .jryk_top {
          margin-right: 10rem;
          margin-top: 1rem;
        }
        .info {
          display: flex;
          justify-content: center;
          align-items: center;
          .money {
            font-size: 20px;
            span {
              color: #e3393b;
              font-size: 24px;
            }
          }
        }
      }
      .center,
      .right {
        width: 100%;
        height: 60%;
        border-left: 1px dashed #ccc;
        .right_div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .right_div_left {
            display: inline-block;
            width: 62px;
            height: 62px;
            background: url(../../../assets/img/personage.png) no-repeat;
            background-position: -77px 0px;
            margin-right: 2rem;
          }
          span {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
        }
      }
      .right {
        .right_div {
          .right_div_right {
            display: inline-block;
            width: 62px;
            height: 62px;
            background: url(../../../assets/img/personage.png) no-repeat;
            background-position: -62px -80px;
            margin-right: 2rem;
          }
          span {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
        }
      }
    }
    .top_top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 1.625rem;
      margin-top: 16px;
      .xzrq {
        padding-left: 0.625rem;
      }
    }
    .grids_box {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      .grids_pieces {
        width: 165px;
        margin-top: 30px;
        margin-bottom: 30px;
        p {
          font-size: 15px;
          text-align: center;
          &:first-child {
            color: #ff7c34;
            line-height: 40px;
          }
        }
        &:nth-child(1n),
        &:nth-child(2) {
          color: #666;
          border-right: 1px dashed #d3d3d3;
        }
        &:nth-child(5n) {
          border-right: 0 dashed #d3d3d3;
        }
      }
    }
    .warm_prompt {
      width: 100%;
      margin-top: 2rem;
      p {
        margin-left: 1.5625rem;
        margin-bottom: 1rem;
        &:nth-child(1) {
          color: rgb(90, 170, 233);
        }
      }
    }
  }
}
</style>
