<template>
  <div class='common-cart'>
    <!-- 单次投注 -->
    <div class="cart-total">
      <!-- <div class="left"> -->
      <div class="left">
        <div>
          总注数：
          <span>{{shopCartInfo.betNum}}</span>
          注
        </div>
        <div>
          总计：
          <span>{{shopCartInfo.money}}</span>
          元
        </div>
      </div>
      <div class="right">
        <button @click="()=>{this.submit()}">确认投注</button>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="cart-main">
      <!-- 购物车总览 -->
      <div class="cart-main-title">
        <div class="g-multiple">
          倍数
          <AppNumberSide v-model="multiple"></AppNumberSide>
        </div>
        <div class="g-select">
          <div v-for="(v,k) in multipleArr" :key='k' :class="{active:multiple===v}" @click="multiple=v">{{v}}倍</div>
        </div>
        <div class="g-times">追
          <AppNumberSide v-model="auto" max='20'></AppNumberSide>期
        </div>
        <div>
          <Checkbox v-model="stop" true-value='1' false-value="0">中奖停追</Checkbox>
        </div>
        <div class="senior-wrap">
          <Button type="text" class="senior" @click="seniorBet" v-show="gameItem.speed">智能追号</Button>
        </div>
      </div>
      <!-- 购物车详情 -->
      <div class="cart-main-tabs">
        <div class="tab-title">
          <div class="left">
            <div :class="{active:tabKey===0}" @click="switchTab(0)">当前投注</div>
            <div :class="{active:tabKey===1}" @click="switchTab(1)">历史投注</div>
          </div>
          <div class="right" v-show="tabKey===0">
            <div @click="toRandomBet(1)">
              <img src="~/assets/img/game/bet-cart-random.png" alt="">
              <span>随机一注</span>
            </div>
            <div @click="toRandomBet(5)">
              <img src="~/assets/img/game/bet-cart-random.png" alt="">
              <span> 随机五注</span>
            </div>
          </div>
        </div>
        <div class="tab-table">
          <Table stripe :columns="columns" :height='246' :data="tableList"></Table>
        </div>
        <div class="clear-cart" @click="delCartBet()">
          清空购物车
          <span></span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import CartShopRandom from "../utils/random.js";
import CartShopLogBtn from "./shopcart/commonCartBtn.js";
import CartInfo from "./shopcart/commonCartInfo";
import CartSenior from "./shopcart/commonCartSenior";

export default {
  name: "betCart",
  components: {
    CartShopLogBtn
  },
  data() {
    return {
      // modal10: true,
      multipleArr: [1, 5, 10, 20, 50, 100],
      multiple: 1,
      auto: 1,
      stop: "1",
      tabKey: 0,
      columns: [],
      dataList: [],
      seniorModal: {},
      // 期数变化
      periodsChange: false
    };
  },
  computed: {
    ...mapState("userinfo", ["isLogin"]),
    ...mapState("game", ["gameId", "gameItem"]),
    ...mapState("gameBet", [
      "playObj",
      "betting",
      "periods",
      "stateOdds",
      "shopCart",
      "shopCartInfo",
      "betSetSource",
      "isScrollBalls",
      "openTime"
    ]),
    tableList() {
      return this.tabKey ? this.dataList : this.shopCart;
    }
  },
  methods: {
    ...mapMutations("gameBet", [
      "delShopCart",
      "setShopCart",
      "setShopCartInfo"
    ]),
    ...mapMutations("modal", ["changeModal"]),
    ...mapActions("gameBet", [
      "userSubmitTouzhu",
      "useAutoTouzhu",
      "cancelTouzhu"
    ]),
    ...mapActions("mobile", ["getRecorddata"]),
    switchTab(n) {
      this.tabKey = n;
      n ? this.createLogData() : this.createCartData();
    },
    showRowInfo(row) {
      // this.changeModal({
      let rowModal = this.$AppModal({
        visible: true,
        title: "注单详情",
        showFoot: false,
        customClass: "row-info",
        component: CartInfo,
        componentData: JSON.parse(JSON.stringify(row)),
        beforeClose: b => {
          if (b) {
            this.rollback({ gameid: row.gameid, guid: row.guid }).then(res => {
              rowModal.visible = false;
            });
          } else {
            rowModal.visible = false;
          }
        }
      });
    },
    createCartData() {
      // let _this = this;
      // this.
      this.columns = [
        {
          title: "详情",
          key: "xiangqing",
          width: 300,
          className: "tip-cell",
          render: (h, { row }) => {
            return <span title={row.xiangqing}>{row.xiangqing}</span>;
          }
        },
        { title: "玩法", key: "wanfa" },
        { title: "倍数", key: "multiple" },
        { title: "注数", key: "betNum" },
        { title: "赔率", key: "odds" },
        { title: "总金额", key: "money" },
        {
          title: "操作",
          key: "oper",
          render: (h, { row }) => {
            return (
              <div class="table-oper-btn">
                <span
                  onClick={() => {
                    this.delCartBet(row);
                  }}
                />
              </div>
            );
          }
        }
      ];
    },

    async createLogData() {
      this.columns = [
        { title: "彩种", key: "game_name" },
        { title: "期数", key: "qishu" },
        { title: "时间", key: "tz_time", width: 80 },
        {
          title: "详情",
          key: "xiangqing",
          width: 200,
          className: "tip-cell",
          render: (h, { row }) => {
            return (
              <span
                title={row.xiangqing}
                onClick={() => {
                  this.showRowInfo(row);
                }}
              >
                {row.xiangqing}
              </span>
            );
          }
        },
        { title: "玩法", key: "wanfa" },
        { title: "注数", key: "zhushu", width: 60 },
        { title: "投注金额", key: "price", width: 80 },
        { title: "中奖金额", key: "win", width: 80 },
        {
          title: "状态",
          key: "status",
          width: 90,
          render: (h, { row }) => {
            return (
              <CartShopLogBtn
                status={row.status}
                id={row.guid}
                onRollback={async () => {
                  row.status = 4;
                  this.rollback({ gameid: row.gameid, guid: row.guid }).then(
                    ret => {
                      if (!ret) {
                        row.status = 5;
                      }
                    }
                  );
                }}
              />
            );
          }
        }
      ];
      let ret = await this.getRecorddata({
        gameid: 0,
        type: 0,
        pageid: 0,
        lasttime: 2
      });

      this.dataList = ret ? ret : [];
    },
    // 撤单
    async rollback(row) {
      let [err, ret] = await this.cancelTouzhu({
        idlist: row.guid,
        gameid: row.gameid
      });
      if (err) return;
      if (ret) {
        this.$Message.success("撤单成功");
        this.createLogData();
        return true;
      }
    },

    // 删除购物车数据
    delCartBet(row) {
      if (row) {
        this.delShopCart(row._index);
        this.$Message.success(`已将 ${row.xiangqing} 移除购物车`);
      } else {
        this.delShopCart();
        this.$bus.$emit("resetBetArea");
        this.$Message.success(`已成功清空购物车`);
      }
      this.setShopCart();
    },
    // 下注
    async submit(multiple) {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.shopCart.length === 0) {
        this.$Message.warning("您的购物车空空如也");
        return;
      }
      // 防抖功能
      await this.$Throttle.promise(0.5);
      let err, ret;
      if (multiple) {
        [err, ret] = await this.useAutoTouzhu(multiple);
      } else {
        [err, ret] = await this.userSubmitTouzhu();
      }
      if (err) return;
      if (ret) {
        this.multiple = 1;
        this.auto = 1;
        this.delShopCart();
        this.setShopCart();
        this.pcddReset();
        this.$bus.$emit("resetBetArea");
        this.$Message.success("投注成功，祝您好运！");
        await this.$store.dispatch("userinfo/flushPrice");
      }
    },
    // pcdd
    pcddReset() {
      if (this.gameItem.js_tag === "pcdd") {
        this.$bus.$emit("pcddReset");
      }
    },
    // 购物车详情数据拼接
    getOneInfo(randomData) {
      let str = "",
        data = randomData.oneBetDate;
      let a = data.name
        .map((name, key) => {
          if (!data.value[key]) {
            return "";
          }
          return `${name}(${data.label[key]})`;
        })
        .filter(v => v)
        .join(" ");
      return a;
    },
    // 购物车行数据
    addLine(randomData) {
      let isDanshi =
        this.playObj.playname.includes("单式") ||
        this.playObj.wanfa.includes("单式");
      let betted = [];
      if (this.stateOdds && !isDanshi) {
        betted = [
          {
            xiangqing: this.getOneInfo(randomData),
            playId: this.playObj.playid,
            wanfa: this.playObj.wanfa,
            multiple: 1,
            betNum: 1,
            money: 2,
            odds: this.stateOdds,
            value: randomData.oneBetDate.value.join("+")
          }
        ];
        // console.log(this.multiple * this.money * this.unitArr[this.unit]);
      } else {
        betted = randomData.selected.map((v, k) => ({
          xiangqing: `${v.name}(${v.label})`,
          playId: this.playObj.playid,
          wanfa: this.playObj.wanfa,
          multiple: 1,
          betNum: 1,
          money: 2,
          odds: isDanshi ? this.stateOdds : v.odds,
          value: v.value
        }));
      }
      this.setShopCart(betted);
    },

    randomBet() {
      let dataSource = JSON.parse(JSON.stringify(this.betSetSource));
      let select = CartShopRandom({
        dataSource,
        gameid: this.gameId * 1,
        playid: this.playObj.playid * 1
      });
      this.$bus.$emit("randomBet", select, this.addLine);
    },
    randomPcddBet() {
      let dataSource = JSON.parse(JSON.stringify(this.betSetSource));
      let source = [],
        random = Math.random(),
        weight = [0.07, 0.5, 0.75, 0.94, 1];

      weight.find((v, k) => {
        if (v > random) {
          return (source = dataSource[k]);
        }
      });

      let select = CartShopRandom({
        dataSource: [source],
        gameid: this.gameId * 1,
        playid: source.playId * 1
      });
      this.$bus.$emit("randomBet", select);
    },
    toRandomBet(n) {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.gameItem.js_tag === "pcdd") {
        for (let i = 0; i < n; i++) {
          this.randomPcddBet();
        }
      } else {
        for (let i = 0; i < n; i++) {
          this.randomBet();
        }
      }

      this.$bus.$emit("resetBetArea");
      this.$Message.success("成功添加至购物车");
    },
    isEmptyCart() {
      // this.changeModal({
      // 请注意! 当前进入${curQishuStr}期, 是否清空${msg}号码?,
      let clearCartModal = this.$AppModal({
        visible: true,
        delay: 5,
        customClass: "timeout-notice",
        content: `<div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning">
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <div>
            <p>请注意! 当前进入${this.periods}期,是否要清空已投注内容?</p>
            <p>点击'确定'清空已投注内容, </p>
            <p>点击'取消'自动保留至下一期 </p>
          </div>`,
        beforeClose: b => {
          if (b) {
            this.$bus.$emit("resetBetArea");
            this.multiple = 1;
            this.auto = 1;
            this.delShopCart();
            this.setShopCart();
            this.$Message.success("成功清空投注内容");
          } else {
            this.$Message.success("投注内容已保留");
          }
          // this.changeModal({ visible: false });
          clearCartModal.visible = false;
        }
      });
    },
    isEmptyArea() {
      // this.changeModal({
      let clearCartModal = this.$AppModal({
        visible: true,
        delay: 5,
        customClass: "timeout-notice",
        content: `<div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning">
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <div>
            <p>请注意! 当前进入${this.periods}期,是否清空号码?</p>
            <p>点击'确定'清空号码, </p>
            <p>点击'取消'自动号码至下一期 </p>
          </div>`,
        beforeClose: b => {
          if (b) {
            this.$bus.$emit("resetBetArea");
            this.multiple = 1;
            this.auto = 1;
            this.delShopCart();
            this.setShopCart();
            this.$Message.success("成功清空号码");
          } else {
            this.$Message.success("号码已保留");
          }
          // this.changeModal({ visible: false });
          clearCartModal.visible = false;
        }
      });
    },
    seniorBet() {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.shopCart.length === 0) {
        this.$Message.warning("您的购物车空空如也");
        return;
      }
      this.periodsChange = false;
      let openTime = JSON.parse(JSON.stringify(this.openTime));
      let length = openTime.length;
      for (let i = length; i < 20; i++) {
        openTime[i] = {
          qishu: openTime[0].qishu + i,
          opentime:
            openTime[1].opentime +
            (openTime[1].opentime - openTime[0].opentime) * i
        };
      }
      // 总价格 预计盈利
      let sum = 0,
        willWin = 0;
      this.shopCart.forEach(item => {
        sum += item.money;
        willWin = willWin.float("add", item.money.float("multiply", item.odds));
      });
      willWin = willWin.float("subtract", sum);
      this.seniorModal = this.$AppModal({
        visible: true,
        title: "追号选项",
        showFoot: false,
        customClass: "senior-modal",
        component: CartSenior,
        componentData: { openTime, sum, willWin },
        beforeClose: b => {
          if (this.periodsChange) {
            this.seniorModal.visible = false;
            this.periodsChange = false;
            this.$Message.success("期数已变化，注单已自动保留。");
            return;
          }
          if (b) {
            this.submit(b);
          }
          this.seniorModal.visible = false;
        }
      });
    }
  },
  watch: {
    multiple(val) {
      this.setShopCartInfo({ multiple: val });
    },
    auto(val) {
      this.setShopCartInfo({ auto: val });
    },
    stop(val) {
      this.setShopCartInfo({ stop: val * 1 });
    },
    isScrollBalls(val) {
      if (val && this.shopCart.length) {
        if (this.seniorModal.visible) {
          this.periodsChange = true;
          this.$Message.success("期数已变化，请重新选择");
        } else {
          this.isEmptyCart();
        }
      } else if (val && this.betting.betNum) {
        this.isEmptyArea();
      } else if (val) {
        this.$Message.info(`请注意！当前进入${this.periods}期`);
      }
    }
  },
  mounted() {
    this.createCartData();
  }
};
</script>
<style lang='scss' scoped>
@import "./shopcart/commonCart.scss";
</style>

<style lang="scss">
.common-cart {
  .g-multiple,
  .g-times {
    .n-input {
      background-color: #fff !important;
    }
  }
  .table-oper-btn {
    span {
      display: inline-block;
      height: 22px;
      width: 22px;
      cursor: pointer;
      background: url("~/assets/img/game/bet-cart-delete.png") no-repeat center;
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.08) rotate(180deg);
        // transform:
      }
    }
  }
  .ivu-table-wrapper {
    border-left: none;
    .ivu-table {
      &:after {
        width: 0;
      }
    }

    th,
    .ivu-table-cell {
      text-align: center;
    }
  }
  .table-status-btn {
    > div {
      width: 56px;
      height: 21px;
      line-height: 21px;
      // background: rgba(246, 42, 68, 1);
      border-radius: 3px;
      margin: 0 auto;
    }

    .gray {
      color: #525252;
      cursor: pointer;
      &:hover {
        background: rgba(246, 42, 68, 1);
        color: #ffffff;
      }
    }
    .active {
      background: rgba(246, 42, 68, 1);
      color: #ffffff;
    }
    .green {
      color: #04ad00;
    }
    .red {
      color: #d0132a;
    }

    .black {
      color: #000;
    }
  }
  .tip-cell {
    span {
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        color: #d0132a;
      }
    }
  }
}
.timeout-notice {
  top: 40% !important;
  .body {
    position: relative;
    font-size: 14px;
    padding: 8px 10px 8px 50px !important;
    margin: 0 8px;
  }
}
.row-info {
  width: 635px !important;
}
</style>
