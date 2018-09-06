<template>
  <div class="ladder-animation">
    <div v-show="showPanel" class="count-down">
      <second-time ref="countDown" :time="countDown" :callback="timer_callback"></second-time>
      <p class="LD-gameMsg-next">20180711119期开始开奖</p>
      <p class="LD-gameMsg-last">20180711118期开奖结果为 [单]</p>

      <!-- <p class="LD-gameMsg-next">盘面准备中</p>
      <p class="LD-gameMsg-last">20180711119期开奖结果为 [双]</p> -->

    </div>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" :style="{width:cssWidth+'px',height:cssHeight+'px'}"></canvas>
  </div>
</template>
<script>
import secondTime from "./secondTime.vue";
import ladder from "./animation.js";

const canvasWidth = 230;
const canvasHeight = 160;
export default {
  name: "ladder-animation",
  components: { secondTime },
  data() {
    return {
      showPanel: true,
      countDown: 3,
      canvasWidth,
      canvasHeight,
      ladder: null
    };
  },
  computed: {
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
    showPanel(showPanel) {
      if (showPanel) {
        // this.$nextTick(() => {
        // clearInterval(this.$refs.countDown.timer);
        this.$refs.countDown.run();
        this.ladder.drawBg();
        // });
      } else {
        // 开奖
        const fourRoot = Math.random() > 0.5;
        const reverse = Math.random() > 0.5;
        this.ladder.drawBg(fourRoot, reverse);
        this.ladder.move(this.finishedMove);
      }
    }
  },
  activated() {},
  deactivated() {},
  mounted() {
    // pc不需要处理适配
    // window.addEventListener("resize", this.resize);
    this.resize();
  },
  methods: {
    finishedMove() {
      console.error("over");
      window.setTimeout(() => {
        this.showPanel = true;
      }, 2000);
    },
    timer_callback() {
      console.error("start");
      window.setTimeout(() => {
        this.showPanel = false;
      }, 200);
    },
    resize() {
      const clientWidth = 450;
      this.canvasWidth = clientWidth / 320 * canvasWidth;
      this.canvasHeight = clientWidth / 320 * canvasHeight;
      this.$nextTick(() => {
        if (!this.ladder) this.ladder = new ladder("canvas");
        this.ladder.drawBg();
        // window.setTimeout(() => this.ladder.move(), 1000);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ladder-animation {
  background-image: url("~/assets/img/ladder-bg-0.png");
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
    background-color: #3B3524;
  }
  .LD-gameMsg-next{
    font-size: 15px;
    color: #fff;
    line-height: 30px;
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
