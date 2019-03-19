<template>

  <div class="col-row lhc"
       v-if="isLhc && balls.length">
    <div v-if="item && item.openless"></div>
    <div v-if="item && item.openless">{{qishu}}</div>
    <div class="showTimes red"
         v-if="item && item.openless">
      <span v-if="openless > 0"
            style="color:#000">距离开奖还剩：</span>
      <span v-if="openless > 0"
            style="color:red">{{timestampTotime(openless)}}秒</span>
      <a v-if="openless > 0"
         @click.stop.prevent="gotoBet"
         class="betting">投注</a>
      <span v-if="item.openless === 0">正在开奖...</span>
    </div>

    <div v-if="!item.openless"
         class="rq">{{item.opentime | date}}</div>
    <div v-if="!item.openless"
         class="qs">{{qishu}}</div>
    <div v-if="!item.openless"
         class="pm">{{calc_lhc.zm(balls)}}</div>
    <div v-if="!item.openless"
         class="tm">{{calc_lhc.tm(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.sxFromBalls(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.tmds(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.bs(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.tmdx(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.wx(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.jy(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.yy(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.td(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.jx(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.hb(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.nn(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.bh(balls)}}</div>
    <div v-if="!item.openless">{{calc_lhc.zhds(balls)}}</div>
  </div>

  <div class="col-row"
       :class="{'qxc':isQxc,'xync':isNC,'tzyx':isTZ}"
       v-else>
    <div :class="{'qxc-qishu':isQxc}">{{qishu}}</div>
    <div class="showTimes red"
         v-if="item && item.openless">
      <span v-if="openless > 0"
            style="color:#000">距离开奖还剩：</span>
      <span v-if="openless > 0"
            style="color:red">{{timestampTotime(openless)}}</span>
      <a v-if="openless > 0"
         @click.stop.prevent="gotoBet"
         class="betting">投注</a>
      <span v-if="openless === 0">正在开奖...</span>
    </div>
    <!--号码球-->
    <div v-if="item && !item.openless && !['xypk','tzyx'].includes(game.js_tag)"
         class="red null"
         :class="{long:long,'qxc-nums':isQxc}">{{this.balls.join(" ")}}</div>

    <div v-if="game && game.js_tag==='k3' && !item.openless">{{hz()}}</div>
    <div v-if="game && game.js_tag==='k3' && !item.openless">{{xt()}}</div>

    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{sw()}}</div>
    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{gw()}}</div>
    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{hs()}}</div>

    <div v-if="game && game.js_tag==='11x5' && !item.openless">{{dx()}}</div>
    <div v-if="game && game.js_tag==='11x5' && !item.openless">{{jo()}}</div>

    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 0)}}</div>
    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 1)}}</div>
    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 2)}}</div>
    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 3)}}</div>
    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 4)}}</div>
    <div class="sm"
         v-if="game && game.js_tag==='pkniuniu' && !item.openless">{{calc_niu.niuniu(balls, 5)}}</div>

    <xypkitem v-if="game && game.js_tag==='xypk' && !item.openless && item.balls"
              :number="balls"></xypkitem>
    <div class=""
         v-if="game && game.js_tag==='xypk' && !item.openless">{{calc_xypk.state(balls)}}</div>

    <div class="sm"
         v-if="isQxc && !item.openless && item.balls">{{calc_qxc.state(balls[0])}}</div>
    <div class="sm"
         v-if="isQxc && !item.openless && item.balls">{{calc_qxc.state(balls[1])}}</div>
    <div class="sm"
         v-if="isQxc && !item.openless && item.balls">{{calc_qxc.state(balls[2])}}</div>
    <div class="sm"
         v-if="isQxc && !item.openless && item.balls">{{calc_qxc.state(balls[3])}}</div>
    <div v-if="game && game.js_tag==='qxc' && !item.openless && item.balls">{{`${calc_qxc.getSum(balls)} ${calc_qxc.state_big_small(balls)} ${calc_qxc.state_single_double(balls)}`}}</div>

    <div class="state"
         v-if="game && game.js_tag==='xync' && !item.openless && item.balls">{{`${calc_xync.all(balls)}`}}</div>

    <div class="state"
         v-if="game && game.js_tag==='tzyx' && !item.openless && item.balls">{{`${calc_ladder.all(balls)}`}}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import xypkitem from "../../plugins/App/Lottery/LotteryXypk";
import calcqxc from "./calc_qxc";
import calcxync from "./calc_xync";
import calcxypk from "./calc_xypk";
import calcladder from "./calc_ladder";
import calclhc from "./calc_lhc";
import calcpkniuniu from "./calc_pkniuniu";
import { mapState } from "vuex";
export default {
  name: "kjItem",
  props: ["item", "game", "day", "kjList"],
  components: {
    xypkitem
  },
  data() {
    return {
      openless: 0,
      beginUpdate: 0,
      calc_qxc: calcqxc,
      calc_xync: calcxync,
      calc_xypk: calcxypk,
      calc_ladder: calcladder,
      calc_lhc: calclhc,
      calc_niu: calcpkniuniu
    };
  },
  filters: {
    date(opentime) {
      if (opentime) return dayjs(opentime * 1000).format("YYYY-MM-DD HH:mm");
      else return "";
    }
  },
  methods: {
    //快三 和值 大小 单双
    hz() {
      let balls = this.balls;
      if (!balls || !balls.length) return "";
      let sum = balls.reduce((a, b) => a + b);
      return (
        sum +
        " " +
        (sum > 10 ? "大" : "小") +
        " " +
        (sum % 2 == 0 ? "双" : "单")
      );
    },
    //形态
    xt() {
      let balls = this.balls;
      if (!balls || !balls.length) return "";
      if (
        balls[0] != balls[1] &&
        this.balls[1] != balls[2] &&
        balls[0] != balls[2]
      ) {
        return "三不同号";
      } else if (balls[0] == balls[1] && balls[1] === balls[2]) {
        return "三同号";
      } else if (
        balls[0] === balls[1] ||
        balls[0] === balls[2] ||
        balls[1] === balls[2]
      ) {
        return "二同号";
      } else if (balls[0] + 1 == balls[1] && balls[1] + 1 === balls[2]) {
        return "三连号";
      }
      return "";
    },
    //十位
    sw() {
      if (this.balls && this.balls.length) {
        const num = this.balls[3];
        return `${num > 5 ? "大" : "小"}${this.ds(num)}`;
      }
      return "";
    },
    //个位
    gw() {
      if (this.balls && this.balls.length) {
        const num = this.balls[4];
        return `${num > 5 ? "大" : "小"}${this.ds(num)}`;
      }
      return "";
    },
    //后三
    hs() {
      if (this.balls && this.balls.length) {
        const n1 = this.balls[2],
          n2 = this.balls[3],
          n3 = this.balls[4];
        if (n1 === n2 && n1 === n3) {
          return "豹子";
        } else if (n1 === n2 || n2 === n3 || n1 === n3) {
          return "组三";
        } else if (n1 + 1 === n2 && n2 + 1 === n3) {
          return "顺子";
        } else if (n1 !== n2 && n1 !== n3 && n2 !== n3) {
          return "组六";
        } else return "";
      }
      return "";
    },
    //大小
    dx() {
      if (this.balls && this.balls.length) {
        let arr = [0, 0];
        this.balls.forEach(x => {
          if (x > 5) {
            arr[0]++;
          } else {
            arr[1]++;
          }
        });
        return `${arr[0]}:${arr[1]}`;
      }
      return "";
    },
    //奇偶
    jo(val) {
      if (this.balls && this.balls.length) {
        let arr = [0, 0];
        this.balls.forEach(x => {
          if (x % 2 === 0) {
            arr[1]++;
          } else {
            arr[0]++;
          }
        });
        return `${arr[0]}:${arr[1]}`;
      }
      return "";
    },
    //单双
    ds(val) {
      return val % 2 === 0 ? "双" : "单";
    },
    //六合彩特码
    lhc_tema() {
      return "";
    },
    countDown() {
      const _this = this;
      window.clearInterval(window.___timer);
      window.___timer = setInterval(() => {
        _this.openless = _this.openless - 1;
        if (_this.openless === 0) {
          window.clearInterval(window.___timer);
          _this.$bus.$emit("reload");
        }
      }, 1000);
    },
    handle(val) {
      if (this.item.openless && this.item.openless > 0) {
        this.openless = Number(this.item.openless + "");
        this.countDown();
      }
    },
    handleGame(val) {
      this.openless = 0;
    },
    gotoBet() {
      //判断彩种状态
      let game = this.$store.state.game.gameList.find(
        x => x.game_id === this.game.gameid
      );
      if (game && game.enable !== 1) {
        this.$Message.warning("该彩种正在维护中");
        return;
      }
      if (!this.$store.state.userinfo.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      this.$router.push(
        `/game/${this.game.js_tag}/${this.game.gameid || this.game.game_id}/`
      );
      window.clearInterval(window.___timer);
    },
    changeTab(val) {
      if (val > 0) {
        window.clearInterval(window.___timer);
      }
    },
    timestampTotime(time) {
      let t = {},
        str = "";
      t.s = time % 60;
      time = Math.floor(time / 60);
      t.m = time % 60;
      time = Math.floor(time / 60);
      t.h = time;
      const ment = function(a) {
        if (a <= 0) return "00";
        return a < 10 ? "0" + a : a;
      };
      str += t.h ? t.h : "00";
      str += `:${ment(t.m)}`;
      str += `:${ment(t.s)}`;
      return str;
    }
    //  // 牛牛算法
    // result(arr){
    //   // console.log(arr)
    //   let _arr = arr
    //   for(let i=0; i < _arr.length - 2; i++){
    //     for(let j=i+1; j < _arr.length - 1; j++){
    //       for(let k=j+1; k < _arr.length; k++){
    //         if((_arr[i]+_arr[j]+_arr[k])%10 == 0){
    //           _arr.splice(k,1)
    //           _arr.splice(j,1)
    //           _arr.splice(i,1)
    //           for (let n = 0; n < _arr.length; n++) {
    //             if((_arr[0]+_arr[1])%10 == 0) {
    //               // console.log('牛牛')
    //               return 10
    //             }else{
    //               // console.log('牛'+(_arr[0]+_arr[1])%10)
    //               return (_arr[0]+_arr[1])%10
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return 0
    // },
    // // 牛牛
    // niuniu(n){
    //   const data = this.balls
    //   if(data && data.length){
    //     let _data = data.slice(n, n + 5)
    //   return this.niu[this.result(_data)]
    //   }return ''
    // },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.item.openless && this.item.openless > 0 && this.openless === 0) {
        this.openless = Number(this.item.openless + "");
        this.countDown();
      }
    });
  },
  created() {
    if (process.browser) {
      window.clearInterval(window.___timer);
    }
  },
  beforeDestroy() {
    window.clearInterval(window.___timer);
  },
  computed: {
    ...mapState("game", ["gameList"]),
    isTZ() {
      // 是否是梯子游戏
      return this.game && this.game.js_tag === "tzyx";
    },
    isQxc() {
      // 是否是七星彩
      return this.game && this.game.js_tag === "qxc";
    },
    isLhc() {
      // 是否是六合彩
      return this.game && this.game.js_tag === "lhc";
    },
    isNC() {
      // 是否是幸运农场
      return this.game && this.game.js_tag === "xync";
    },
    qishu() {
      if (this.item && this.item.qishu) {
        let qishu = this.item.qishu.toString();
        return qishu.length > 8 ? qishu.substring(8) : qishu;
      }
      return "";
    },
    balls() {
      if (this.item && this.item.balls) {
        return this.item.balls.split("+").map(x => Number(x));
      } else {
        return [];
      }
    },
    long() {
      return ["11x5", "pcdd", "ssc", "pk10", "k3", "pkniuniu"].includes(
        this.game.js_tag
      );
    }
    // yearid() {
    //   let yearID = this.gameList.filter(i => i.js_tag === "lhc")[0].yearid;
    //   if (yearID == 0) {
    //     return this.qishu > 2019014 ? yearID : 11;
    //   } else {
    //     return this.qishu > 2019014 ? yearID : yearID - 1;
    //   }
    // }
  },
  watch: {
    game: "handleGame",
    "item.openless": "handle",
    "$store.state.game.curIndex": "changeTab"
  }
};
</script>

<style lang="scss" scoped>
.col-row {
  height: 36px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #d2d2d2;
  margin-bottom: -1px;
  margin-left: -1px;
  > div {
    width: 56px;
    // flex: 1;
    text-align: center;
  }
  > .red {
    color: red;
  }
  > .red > .betting {
    padding: 3px 5px;
    background-color: #f90;
    color: #fff;
    line-height: 14px;
    cursor: pointer;
    margin-left: 5px;
  }
  .showTimes {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .sm {
    width: 26px;
    flex: none;
  }
  .qxc-qishu {
    width: 50px;
  }
  .qxc-nums {
    width: 70px;
  }
  &.lhc {
    .showTimes {
      flex: 6.5;
    }
    > div {
      flex: 1;
    }
    .qs {
      width: 60px;
      flex: none;
    }
  }
  .th {
    align-items: center;
  }
  &.qxc {
    display: -webkit-box;
    -webkit-box-pack: start;
    .sm {
      width: 42px;
    }
  }
  &.xync {
    .null {
      flex: 1;
    }
    .state {
      width: 100px;
    }
  }
  &.tzyx {
    .state {
      flex: 1;
    }
  }
  &.lhc {
    .qs {
      width: 60px;
    }
    .pm{
      width: 120px !important;
    }
  }
}
</style>
<style>
.long {
  flex: 1.5 !important;
}
.rq {
  flex: none !important;
  width: 120px !important;
}
.pm {
  flex: none !important;
  width: 150px !important;
}
</style>

