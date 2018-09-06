<template>
  <div class='pcdd-bet'>
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
    <div class="fadeInRight" v-switchClass="{key:animateKey,class:'fadeInRight',duration:0.5}">
      <betArea class="bet-area" @selectedItem="selectedItem"></betArea>
    </div>
    <div class=" bet-tool ">
      <div class="info ">
        您选择了
        <span>{{selectedArr.length}}</span>
        注，共
        <span>{{total}}</span>
        元
      </div>
      <div class="number ">
        <!-- <AppInputNumber class="money " v-model="money "></AppInputNumber> -->
        <div class="unit ">
          <span :class="{active:unit==0} " @click="unit=0 ">元</span>
          <span :class="{active:unit==1} " @click="unit=1 ">角</span>
          <!-- <span :class="{active:unit==2} " @click="unit=2 ">分</span> -->
        </div>
      </div>
      <div class="multiple-group ">
        <div>倍数: </div>
        <AppNumberSide v-model="multiple "></AppNumberSide>
        <div class="odds ">
          <!-- <div v-show="stateOdds ">
            <span>赔率：</span>
            <span>{{stateOdds}}</span>
          </div> -->
        </div>
      </div>
      <div class="btn-group ">
        <Button type="error" @click="goAdd " class="add ">添加</Button>
        <Button type="info" @click="goSubmit " class="submit ">一键投注</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import getField from "./field.js";
import switchClass from "../utils/directiveClass.js";
import betArea from "./betArea";
export default {
  name: "pcddBet",
  props: ["playConfig", "animateKey"],
  directives: { switchClass },
  components: { betArea },
  data() {
    return {
      money: 0,
      unitArr: [1, 0.1],
      unit: 0,
      multiple: 1,
      selectedArr: [],
    };
  },
  computed: {
    ...mapState("userinfo", ["isLogin"]),
    ...mapState("gameBet", ["playObj", "betting"]),
    total() {
      let number = this.money * this.multiple;
      return number.float("multiply", this.unitArr[this.unit]);
    },
  },
  methods: {
    ...mapMutations("gameBet", ["setBetting", "changeField", "setShopCart"]),
    ...mapActions("gameBet", ["quickUserSubmitTouzhu"]),
    selectedItem(arr) {
      this.money = arr.reduce((sum, item) => {
        return item.money + sum;
      }, 0);
      // console.log(money);
      this.selectedArr = arr;
      // this.setBetting({ betNum: arr.length });
    },
    goAdd() {
      let betted = this.addLine();
      if (!betted) return;
      this.setShopCart(betted);
      this.$bus.$emit("resetBetArea");
      this.$Message.success("成功添加至购物车");
      // reset
      this.selectedArr = [];
      this.money = 0;
    },
    async goSubmit() {
      let betted = this.addLine(1);
      if (!betted) return;
      this.setShopCart();
      let [err, ret] = await this.quickUserSubmitTouzhu({
        request: betted,
        multiple: this.multiple,
      });
      if (ret) {
        this.selectedArr = [];
        this.money = 0;
        this.$bus.$emit("resetBetArea");
        this.$Message.success("投注成功，祝您好运！");
        await this.$store.dispatch("userinfo/flushPrice");
      }
    },
    addLine(type = 0) {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.selectedArr.length === 0) {
        this.$Message.warning("请选择号码球");
        return;
      }
      return this.selectedArr.map(item =>
        Object.assign(item, {
          multiple: this.multiple,
          money: type
            ? item.money.float("multiply", this.unitArr[this.unit])
            : item.money *
              this.multiple.float("multiply", this.unitArr[this.unit]),
        })
      );
    },
  },
  mounted() {
    this.$bus.$on("pcddReset", () => {
      this.selectedArr = [];
      this.money = 0;
    });
  },
  destroyed() {
    this.$bus.$off("pcddReset");
  },
};
</script>
<style lang='scss' scoped>
.pcdd-bet {
  // padding-top: 8px;
  padding: 10px 20px;
  background-color: #fff;
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
  .bet-area {
    margin-top: 37px;
    margin-bottom: 37px;
    // padding-right: 20px;
  }
  .bet-tool {
    height: 72px;
    display: flex;
    padding-top: 20px;
    padding-right: 20px;
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
      width: 110px;
      .money {
        width: 42px;
        height: 28px;
        margin-right: 6px;
        background-color: #ededed;
        border-radius: 10px;
      }
      .unit {
        height: 37px;
        // width: 110px;
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
.pcdd-bet {
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