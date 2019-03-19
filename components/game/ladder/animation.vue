<template>
  <div class="ladder-animation">
    <div
      v-show="showPanel"
      class="count-down"
    >
      <!-- <second-time ref="countDown" :time="currentQishu.openLess" :callback="timer_callback" showNum></second-time> -->
      <p class="LD-gameMsg-next">{{periods ? periods + '期开始投注' : '盘面准备中'}}</p>

    </div>
    <canvas
      ref="canvas_ladder"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="{width:cssWidth+'px',height:cssHeight+'px'}"
    ></canvas>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import secondTime from "./secondTime.vue";
import ladder from "./animation.js";

const canvasWidth = 230;
const canvasHeight = 160;
export default {
  name: "ladder-animation",
  components: {
    // secondTime
  },
  props: ["ball"],
  data() {
    return {
      showPanel: true,
      canvasWidth,
      canvasHeight,
      ladder: null
    };
  },
  computed: {
    ...mapState("gameBet", ["periods", "openTime"]),
    currentQishu() {
      return this.openTime[0] || {};
    },
    kjBall() {
      let ball = (this.ball && this.ball.balls.split("+")) || [];
      ball = ball.map(el => el * 1);
      return ball;
    },
    cssWidth() {
      if (process.browser) {
        // console.error(window.devicePixelRatio);
        return this.canvasWidth / window.devicePixelRatio;
      }
    },
    cssHeight() {
      if (process.browser) {
        return this.canvasHeight / window.devicePixelRatio;
      }
    }
  },
  watch: {
    kjBall(kjBall) {
      if (kjBall.length === 3) {
        // 开奖
        this.showPanel = false;
        // this.$refs.countDown.run();
        this.ladder.drawBg(...kjBall);
        this.ladder.move();
      } else {
        this.showPanel = true;
        this.ladder.drawBg();
      }
    }
  },
  destroyed() {
  },
  mounted() {
    if (process.browser) {
      // pc不需要处理适配
      window.addEventListener("resize", this.resize);
      this.resize();
    }
  },
  methods: {
    finishedMove() {
      // console.error("over");
      window.setTimeout(() => {
        this.showPanel = true;
      }, 2000);
    },
    timer_callback() {
      // console.error("start");
      window.setTimeout(() => {
        this.showPanel = false;
      }, 200);
    },
    resize() {
      const clientWidth = document.body.clientWidth / 3.5;
      this.canvasWidth = clientWidth / 320 * canvasWidth;
      this.canvasHeight = clientWidth / 320 * canvasHeight;
      if (!this.ladder) this.ladder = new ladder(this.$refs.canvas_ladder);
      this.ladder.drawBg();
    }
  }
};
</script>
<style lang="scss" scoped>
.ladder-animation {
  background-image: url('~/assets/img/ladder-bg-0.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // padding: 17px 0;
  height: 300px;
  .count-down {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 100px;
    line-height: 22px;
    // background-image: url("~img/goucai/ladder-bg-1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    color: #fff;
    text-align: center;
    background-color: #3b3524;
  }
  .LD-gameMsg-next {
    font-size: 15px;
    color: #fff;
    line-height: 100px;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .LD-gameMsg-last {
    font-size: 14px;
    color: #ffc400;
    line-height: 23px;
  }
}
</style>
