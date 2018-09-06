<template>
  <div class='common-bet'>
    <!-- 下注提示 -->
    <div class="bet-top">
      <div class="title">{{playObj.play_title}}</div>
      <Poptip trigger="hover">
        <div slot="content">
          <div class="wrap-pop" v-html="playObj.play_fanli"></div>
        </div>
        <div class="case">范例</div>
      </Poptip>
      <Poptip trigger="hover">
        <div slot="content">
          <div class="wrap-pop" v-html="playObj.play_shuoming"></div>
        </div>
        <div class="describe">玩法说明</div>
      </Poptip>
    </div>
    <!-- 下注选择区域 -->
    <!-- <transition :duration="{ enter: 500, leave: 800 }"> -->
    <div class="bet-area" v-switchClass="{key:animateKey,class:'fadeInRight',duration:0.5}">
      <slot name='area'></slot>
    </div>
    <!-- </transition> -->

    <!-- 下注详情&下注 -->
    <div class="bet-tool">
      <div class="info">
        您选择了
        <span>{{betting.betNum}}</span>
        注，共
        <span>{{total}}</span>
        元，单注
      </div>
      <div class="number">

        <AppInputNumber class="money" v-model="money"></AppInputNumber>
        <div class="unit">
          <span :class="{active:unit==0}" @click="unit = 0">元</span>
          <span :class="{active:unit==1}" @click="unit = 1">角</span>
          <!-- <span :class="{active:unit==2}" @click="unit = 2">分</span> -->
        </div>
      </div>
      <div class="multiple-group">
        <div>倍数: </div>
        <AppNumberSide v-model="multiple"></AppNumberSide>
        <div class="odds">
          <div v-show="stateOdds">
            <span>赔率：</span>
            <span>{{stateOdds}}</span>
          </div>

        </div>
      </div>
      <div class="btn-group">
        <Button type="error" @click="goAdd" class="add">添加</Button>
        <Button type="info" @click="goSubmit" class="submit">一键投注</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import switchClass from "../utils/directiveClass.js";
export default {
  name: "commonBetArea",
  props: ["playObj", "animateKey"],
  directives: { switchClass },
  computed: {
    ...mapState("userinfo", ["isLogin"]),
    ...mapState("gameBet", ["betting", "stateOdds", "lhc"]),
    isLhc() {
      return this.$store.state.game.gameItem.js_tag === "lhc";
    },
    total() {
      if (this.isLhc && this.betting.selected.length) {
        if (this.lhc.isBall) {
          // 如果是选球
          let number = this.money * this.betting.betNum * this.multiple;
          return number.float("multiply", this.unitArr[this.unit]);
        } else {
          // 如果是填数字
          let moneys = this.betting.selected.map(x => x.money);
          let total = 0;
          total = moneys.map(x => x * this.multiple).reduce((a, b) => a + b);
          return total.float("multiply", this.unitArr[this.unit]);
        }
      } else {
        let number = this.money * this.betting.betNum * this.multiple;
        return number.float("multiply", this.unitArr[this.unit]);
      }
    }
  },
  data() {
    return {
      money: 2,
      unitArr: [1, 0.1],
      unit: 0,
      multiple: 1,
      ccc: "wrap-pop"
    };
  },
  methods: {
    ...mapActions("gameBet", [
      "submitBet",
      "userSubmitTouzhu",
      "quickUserSubmitTouzhu"
    ]),
    ...mapMutations("gameBet", ["changeField", "setShopCart"]),
    // 一键投注
    async goSubmit() {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning("请选择号码球");
        return;
      }
      let betted = null;
      if (this.isLhc) {
        betted = this.addLhc(1);
      } else {
        betted = this.add(1);
      }

      this.setShopCart();
      let [err, ret] = await this.quickUserSubmitTouzhu({
        request: betted,
        multiple: this.multiple
      });
      if (ret) {
        this.$bus.$emit("resetBetArea");
        this.$Message.success("投注成功，祝您好运！");
        await this.$store.dispatch("userinfo/flushPrice");
      }
    },
    // 添加购物车
    goAdd() {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning("请选择号码球");
        return;
      }
      let betted = this.addLhc();
      if (Array.isArray(betted) && betted.length) {
        this.setShopCart(betted);
        this.$bus.$emit("resetBetArea");
        this.$Message.success("成功添加至购物车");
      }
    },
    // 购物车详情数据拼接
    getOneInfo() {
      let str = "",
        data = this.betting.oneBetDate;
      return data.name
        .map((name, key) => `${name}(${data.label[key]})`.replace(/\s/g, ""))
        .join(" ");
    },

    addLhc(type = 0) {
      let betted = [];
      // 单赔率
      if (this.stateOdds) {
        if ((this.playObj.playid >= 30) & (this.playObj.playid <= 35)) {
          betted = this.betting.oneBetDate.label.map((v, k) => ({
            xiangqing: `${this.betting.oneBetDate.name[0]}(${
              this.betting.oneBetDate.label[k]
            })`,
            playId: this.playObj.playid,
            wanfa: this.playObj.wanfa,
            multiple: this.multiple,
            betNum: 1,
            odds: this.stateOdds,
            // 一键投注 区分
            money: type
              ? (this.money * 1).float("multiply", this.unitArr[this.unit])
              : (this.multiple * this.money).float(
                  "multiply",
                  this.unitArr[this.unit]
                ),
            value: this.betting.oneBetDate.value[k]
          }));
        } else {
          betted = [
            {
              xiangqing: this.getOneInfo(),
              playId: this.playObj.playid,
              wanfa: this.playObj.wanfa,
              multiple: this.multiple,
              betNum: this.betting.betNum,
              odds: this.stateOdds,
              // 一键投注 区分
              money: type
                ? this.total.float("divide", this.multiple)
                : this.total,

              value: this.betting.oneBetDate.value.join("+")
            }
          ];
        }
      } else { // 多赔率
        // 连选必中
        if ((this.playObj.playid >= 22) & (this.playObj.playid <= 29)) {
          // 如果是连选必中，则取所有数里面的最小的赔率
          const minPeilv = Math.min(...this.betting.selected.map(x=>x.odds))
          betted = this.betting.oneBetDate.label.map((v, k) => ({
            xiangqing: `${this.betting.oneBetDate.name[0]}(${
              this.betting.oneBetDate.label[k]
            })`,
            playId: this.playObj.playid,
            wanfa: this.playObj.wanfa,
            multiple: this.multiple,
            betNum: 1,
            odds: minPeilv,//this.stateOdds,
            // 一键投注 区分
            money: type
              ? (this.money * 1).float("multiply", this.unitArr[this.unit])
              : (this.multiple * this.money).float(
                  "multiply",
                  this.unitArr[this.unit]
                ),
            value: this.betting.oneBetDate.value[k]
          }));
        }else{
         
        betted = this.betting.selected.map((v, k) => ({
          xiangqing: `${v.name}(${v.label})`,
          playId: this.playObj.playid,
          wanfa: this.playObj.wanfa,
          multiple: this.multiple,
          betNum: 1,
          odds: v.odds,
          // 一键投注 区分
          money: this.processMoney(type, v),
          value: v.value
        }));
        }
        
      }
      return betted;
    },
    processMoney(type, v) {
      if ([3].includes(this.playObj.playid)) {
        return type
          ? (this.money * 1).float("multiply", this.unitArr[this.unit])
          : (this.multiple * this.money).float(
              "multiply",
              this.unitArr[this.unit]
            );
      } else {
        // type 0 为正常添加，1为将一键投注
        return type
          ? (v.money * 1).float("multiply", this.unitArr[this.unit])
          : (this.multiple * v.money).float(
              "multiply",
              this.unitArr[this.unit]
            );
      }
    }
  },
  watch: {
    "playObj.playid"(val) {
      // this.money = 2;
      this.money = this.$store.state.gameBet.lhc.curPrice;
      this.unit = 0;
      this.multiple = 1;
    },

    money(val) {
      if (val) {
        this.$store.commit("gameBet/setCurPrice", val);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.common-bet {
  padding-top: 8px;
  padding: 10px 20px;
  background-color: #feffff;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  .bet-top {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 14px;
    .title {
      padding: 0 20px;
      background: url("~assets/img/game/bet-note-title.png") no-repeat left
        center;
    }
    .case {
      padding: 0 20px;
      background: url("~assets/img/game/bet-note-case.png") no-repeat left
        center;
      cursor: pointer;
    }
    .describe {
      padding: 0 20px;
      background: url("~assets/img/game/bet-note-describe.png") no-repeat left
        center;
      cursor: pointer;
    }
  }
  .bet-tool {
    height: 72px;
    display: flex;
    padding-top: 20px;
    border-top: 1px solid #ededed;
    > div {
      height: 40px;
      display: flex;
      padding-right: 10px;
      align-items: center;
      color: #4f4f4f;
    }
    .info {
      span {
        width: 40px;
        text-align: center;
        color: #e93248;
      }
    }
    .number {
      width: 170px;
      .money {
        width: 42px;
        height: 28px;
        margin-right: 6px;
        background-color: #ededed;
        border-radius: 10px;
      }
      .unit {
        height: 37px;
        // width: 100px;
        line-height: 25px;
        display: flex;
        flex: 1;
        padding: 6px 11px;
        border-radius: 18px;
        background-color: #ededed;
        span {
          flex: 1;
          text-align: center;
          margin-right: 4px;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            color: #ff586d;
          }
        }
        .active {
          background: linear-gradient(to bottom, #ff586d, #e93248);
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .multiple-group {
      .odds {
        width: 100px;
      }
    }
    .btn-group {
      button {
        margin-left: 10px;
      }
      .add {
        width: 66px;
        height: 40px;
        background: #e93248;
        border-radius: 4px;
      }
      .submit {
        width: 110px;
        height: 40px;
        background: rgba(63, 172, 222, 1);
        border-radius: 7px 7px 7px 7px;
      }
    }
  }
}
</style>
<style lang='scss'>
.common-bet {
  .wrap-pop {
    width: 200px;
    white-space: pre-line;
  }
  .btn-group {
    span {
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>