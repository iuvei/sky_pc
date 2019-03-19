<template>
  <div
    class="ladder-betting"
    @input="priceChange"
  >

    <div class="betting-start">
      <div class="play-title">起点</div>
      <div class="betting-row">
        <span class="ball background-start">左
          <span class="num background-black">
            <i class="arrow-down-a"></i>
          </span>
        </span>
        <span class="ball background-start">右
          <span
            class="num background-black"
            style="left: 65%;"
          >
            <i class="arrow-down-a"></i>
          </span>
        </span>
      </div>
      <div class="betting-row">
        <span class="color-red">{{bets[0].odds}}</span>
        <span class="color-red">{{bets[1].odds}}</span>
      </div>
      <div class="betting-row">
        <AppInputNumber
          class="betting-input number"
          v-model="bets[0].money"
          :needNull='true'
          @click.native="setDefaultPrice(0)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[1].money"
          :needNull='true'
          @click.native="setDefaultPrice(1)"
        ></AppInputNumber>
        <!-- <Input v-model="input1" @keyup.native="updateMoney($event, 'input1')" size="small" clearable :number="true" class="betting-input"></Input> -->
        <!-- <Input v-model="input2" @keyup.native="updateMoney($event, 'input2')" size="small" clearable :number="true" class="betting-input"></Input> -->
      </div>
    </div>

    <div class="betting-ladder">
      <div class="play-title">梯子</div>
      <div class="betting-row">
        <span class="ball background-black">3</span>
        <span class="ball background-black">4</span>
      </div>
      <div class="betting-row">
        <span class="color-red">{{bets[2].odds}}</span>
        <span class="color-red">{{bets[3].odds}}</span>
      </div>
      <div class="betting-row">
        <AppInputNumber
          class="betting-input number"
          v-model="bets[2].money"
          :needNull='true'
          @click.native="setDefaultPrice(2)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[3].money"
          :needNull='true'
          @click.native="setDefaultPrice(3)"
        ></AppInputNumber>
      </div>
    </div>

    <div class="betting-end">
      <div class="play-title">终点</div>
      <div class="betting-row">
        <span class="ball background-blue">单</span>
        <span class="ball background-red">双</span>
      </div>
      <div class="betting-row">
        <span class="color-red">{{bets[4].odds}}</span>
        <span class="color-red">{{bets[5].odds}}</span>
      </div>
      <div class="betting-row">
        <AppInputNumber
          class="betting-input number"
          v-model="bets[4].money"
          :needNull='true'
          @click.native="setDefaultPrice(4)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[5].money"
          :needNull='true'
          @click.native="setDefaultPrice(5)"
        ></AppInputNumber>
      </div>
    </div>

    <div class="betting-x">
      <div class="play-title">终点X梯子</div>
      <div class="betting-row">
        <span class="ball background-blue">单
          <span
            class="num background-black"
            style="left: 65%;"
          >3</span>
        </span>
        <span class="ball background-red">双
          <span class="num background-black">3</span>
        </span>
        <span class="ball background-blue">单
          <span class="num background-black">4</span>
        </span>
        <span class="ball background-red">双
          <span
            class="num background-black"
            style="left: 65%;"
          >4</span>
        </span>
      </div>
      <div class="betting-row">
        <span class="color-red">{{bets[6].odds}}</span>
        <span class="color-red">{{bets[7].odds}}</span>
        <span class="color-red">{{bets[8].odds}}</span>
        <span class="color-red">{{bets[9].odds}}</span>
      </div>
      <div class="betting-row">
        <AppInputNumber
          class="betting-input number"
          v-model="bets[6].money"
          :needNull='true'
          @click.native="setDefaultPrice(6)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[7].money"
          :needNull='true'
          @click.native="setDefaultPrice(7)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[8].money"
          :needNull='true'
          @click.native="setDefaultPrice(8)"
        ></AppInputNumber>
        <AppInputNumber
          class="betting-input number"
          v-model="bets[9].money"
          :needNull='true'
          @click.native="setDefaultPrice(9)"
        ></AppInputNumber>
      </div>
    </div>
    <div class="close-layer"></div>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
const bets = [
  {
    name: "起点",
    label: "左",
    value: "0",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "起点",
    label: "右",
    value: "1",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "梯子",
    label: "3",
    value: "2",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "梯子",
    label: "4",
    value: "3",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点",
    label: "单",
    value: "4",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点",
    label: "双",
    value: "5",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点X梯子",
    label: "单3",
    value: "6",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点X梯子",
    label: "双3",
    value: "7",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点X梯子",
    label: "单4",
    value: "8",
    odds: "",
    selected: false,
    money: ""
  },
  {
    name: "终点X梯子",
    label: "双4",
    value: "9",
    odds: "",
    selected: false,
    money: ""
  }
];

export default {
  name: "ladder-betting",
  data() {
    return {
      bets: JSON.parse(JSON.stringify(bets))
    };
  },
  props:["gameItem"],
  computed: {
    ...mapState('userinfo', ['isLogin']),
    // ...mapState("game", ["gameList", "gameItem"]),
     ...mapState("game", ["gameList"]),
    ...mapState("gameBet", ["playObj"]),
    // item() {
    //   let gameId = this.$route.params.id || this.$route.query.id;
    //   debugger
    //   return this.gameList.filter(item => item.game_id == gameId)[0] || {};
    // }
  },
  watch: {
    isLogin(){
      this.handleOdds();
    }
  },
  async mounted() {
    // 初始化下注信息
    this.$bus.$on("resetBetArea", this.clearSelect);
    this.$bus.$on("randomBet", this.addData);
    this.setBetting();
    this.changeField({ stateOdds: false });
    this.$store.commit('gameBet/setCurPrice', 2)
    this.delShopCart();
    this.setShopCart();

    // 当前游戏
    this.$store.commit("game/setGameId", this.$route.params.id || this.$route.query.id);
    this.$store.commit("game/setGameItem", this.gameItem);
    // 当前玩法
    let arr = await this.getGamePlayConfig((this.gameItem).js_tag) || {};
    arr = arr.list || [];
    arr = (arr[0] && arr[0].submenu) || [];
    arr = (arr[0] && arr[0].playlist) || [];

    this.$store.commit(
      "gameBet/setBetPlay",
      arr.filter(item => item.playid == 1)[0]
    );

    // 赔率
    this.handleOdds();
  },
  destroyed() {
    this.$bus.$off("resetBetArea");
    this.$bus.$off("randomBet");
  },
  methods: {
    ...mapActions("game", ["getPeilv", "getGamePlayConfig"]),
    ...mapMutations("gameBet", ["setBetting", "changeField", 'delShopCart', 'setShopCart']),
    setDefaultPrice(idx){
      let price = this.$store.state.gameBet.lhc.curPrice;
      this.bets[idx].money = this.bets[idx].money || price
      this.priceChange()
    },
    priceChange() {
      let filterData = this.bets.filter(el => el.money > 0);
      filterData = JSON.parse(JSON.stringify(filterData))
      // console.error(filterData);
      this.setBetting({
        selected: filterData,
        // oneBetDate: obj,
        betNum: filterData.length
      });
    },
    // 随机加入购物车
    addData(filterData, callback){
      filterData = JSON.parse(JSON.stringify([this.bets[Math.floor(Math.random()*this.bets.length)]]))
      callback({
          selected: filterData
          // oneBetDate: obj
        });
    },
    async handleOdds() {
      let odds = (await this.getPeilv()) || [];
      odds = odds.filter(el => el.playid == this.playObj.playid)[0] || {};
      odds = odds.peilv || "";
      if (odds.includes("|")) {
        odds = odds.split("|");
      } else {
        odds = new Array(10).fill(odds);
      }
      this.bets.map((el, idx) => (el.odds = odds[idx] || "-"));

      // 保存 betSetSource 
      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.bets))
      });
    },
    clearSelect(){
      this.bets.map(el => el.money='')
    }
  }
};
</script>
<style lang="scss" scoped>
.ladder-betting {
  display: flex;
  align-items: center;
  // justify-content: center;
  position: relative;
  // padding: 7px 10px;
  height: 150px;
  border: 1px solid #dadada;
  > div {
    height: 100%;
    flex: 1;
    text-align: center;
    &:nth-child(n + 2) {
      border-left: 1px solid #dadada;
    }
  }
  .arrow-down-a {
    width: 10px;
    height: 10px;
    background-image: url(~/assets/img/arrow-down-a.png);
    background-size: 100%;
  }
  .betting-x {
    flex: 2;
  }
  .play-title {
    line-height: 34px;
    background-color: #52595e;
    color: #ffffff;
    font-size: 16px;
  }
  .close-layer {
    font-size: 16px;
    color: #fff;
    line-height: 25px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
    text-align: center;
    width: 100%;
  }
  .betting-input {
    padding: 0 10px;
  }
  .betting-input.number {
    border: 1px solid #dddee1;
    border-radius: 3px;
    line-height: 25px;
    background-color: #f1ffff;
  }
  .betting-row {
    width: 80%;
    padding-top: 7px;
    display: inline-flex;
    justify-content: space-around;
    .ball {
      position: relative;
      width: 40px;
      height: 40px;
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
    .background-start {
      border: 1px solid #999999;
      color: #272727;
      .ivu-icon {
        color: #ffffff;
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
