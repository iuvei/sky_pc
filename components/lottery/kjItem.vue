<template>

  <div class="col-row lhc" v-if="isLhc">
    <div v-if="item && item.openless"></div>
    <div v-if="item && item.openless">{{qishu}}</div>
    <div class="showTimes red" v-if="item && item.openless">
      <span v-if="openless > 0" style="color:#000">距离开奖还剩：</span>
      <span v-if="openless > 0" style="color:red">{{timestampTotime(openless)}}秒</span>
      <a v-if="openless > 0" @click.stop.prevent="gotoBet" class="betting">投注</a>
      <span v-if="item.openless === 0">正在开奖...</span>
    </div>

    <div v-if="!item.openless" class="rq">{{item.opentime | date}}</div>
    <div v-if="!item.openless">{{qishu}}</div>
    <div v-if="!item.openless" class="pm">{{zm}}</div>
    <div v-if="!item.openless">{{tm}}</div>
    <div v-if="!item.openless">{{sx}}</div>
    <div v-if="!item.openless">{{tmds}}</div>
    <div v-if="!item.openless">{{bs}}</div>
    <div v-if="!item.openless">{{tmdx}}</div>
    <div v-if="!item.openless">{{wx}}</div>
    <div v-if="!item.openless">{{jy}}</div>
    <div v-if="!item.openless">{{yy}}</div>
    <div v-if="!item.openless">{{td}}</div>
    <div v-if="!item.openless">{{jx}}</div>
    <div v-if="!item.openless">{{hb}}</div>
    <div v-if="!item.openless">{{nn}}</div>
    <div v-if="!item.openless">{{zhds}}</div>
  </div>

  <div class="col-row" v-else>
    <div>{{qishu}}</div>
    <div class="showTimes red" v-if="item && item.openless">
      <span v-if="openless > 0" style="color:#000">距离开奖还剩：</span>
      <span v-if="openless > 0" style="color:red">{{timestampTotime(openless)}}秒</span>
      <a v-if="openless > 0" @click.stop.prevent="gotoBet" class="betting">投注</a>
      <span v-if="openless === 0">正在开奖...</span>
    </div>
    <div v-if="item && !item.openless" class="red null" :class="{long:long}">{{this.balls.join(" ")}}</div>
    <div v-if="game && game.js_tag==='k3' && !item.openless">{{hz()}}</div>
    <div v-if="game && game.js_tag==='k3' && !item.openless">{{xt()}}</div>

    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{sw()}}</div>
    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{gw()}}</div>
    <div v-if="game && game.js_tag==='ssc' && !item.openless">{{hs()}}</div>

    <div v-if="game && game.js_tag==='11x5' && !item.openless">{{dx()}}</div>
    <div v-if="game && game.js_tag==='11x5' && !item.openless">{{jo()}}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  BallToColorpcdd,
  BallToColor2,
  BallToColor,
  BallToWuXing,
  BallToHeiBai,
  BallToTianDi,
  BallToNanNv,
  BallToDanShuang,
  BallToYinYang,
  BallToQinShou,
  BallToJiXiong,
  BallsToDaXiao,
  ballToShengxiao
} from "./xglhc.2017";
export default {
  name: "kjItem",
  props: ["item", "game", "day", "kjList"],
  data() {
    return {
      openless: 0,
      beginUpdate: 0
    };
  },
  computed:{
    isLhc(){
      // 是否是六合彩
      return this.game && this.game.js_tag!=='lhc'
    }
  },
  filters: {
    date(opentime) {
      if (opentime) return dayjs(opentime * 1000).format("YYYY-MM-DD HH:mm");
      else return "";
    }
  },
  methods: {
    //和值
    hz() {
      return this.balls && this.balls.length
        ? this.balls.reduce((a, b) => a + b)
        : "";
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
      // if (this.game.status === 0) {
      //   this.$Message.warning("该彩种正在维护中");
      //   return;
      // }
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
      return ["11x5", "pcdd", "ssc", "pk10", "k3"].includes(this.game.js_tag);
    },
    zm() {
      if (this.balls.length > 5) {
        return [
          this.balls[0],
          this.balls[1],
          this.balls[2],
          this.balls[3],
          this.balls[4],
          this.balls[5]
        ].join(" ");
      }
      return "";
    },
    tm() {
      return this.balls[this.balls.length - 1];
    },
    sx() {
      return (this.tm && ballToShengxiao(this.tm)) || "";
    },
    tmds() {
      return (this.tm && (this.tm % 2 === 0 ? "双" : "单")) || "";
    },
    bs() {
      return (this.tm && BallToColor(this.tm) + "波") || "";
    },
    tmdx() {
      return (this.tm && ballToShengxiao(this.tm)) || "";
    },
    wx() {
      return (this.tm && BallToWuXing(this.tm)) || "";
    },
    jy() {
      return (this.tm && BallToQinShou(this.tm)) || "";
    },
    yy() {
      return (this.tm && BallToYinYang(this.tm)) || "";
    },
    td() {
      return (this.tm && BallToTianDi(this.tm)) || "";
    },
    jx() {
      return (this.tm && BallToJiXiong(this.tm)) || "";
    },
    hb() {
      return (this.tm && BallToHeiBai(this.tm)) || "";
    },
    nn() {
      return (this.tm && BallToNanNv(this.tm)) || "";
    },
    zhds() {
      return (
        (this.balls && this.balls.length && BallsToDaXiao(this.balls)) || ""
      );
    }
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
    width: 60px;
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
  &.lhc {
    .showTimes {
      flex: 6.5;
    }
    > div {
      flex: 1;
      // &:first-child {
      //   width: 150px;
      // }
      // &:nth-child(2) {
      //   width: 50px;
      // }
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
  width: 150px !important;
}
.pm {
  flex: none !important;
  width: 150px !important;
}
</style>

