<template>
  <div class='ladder-index'>
    <Modal
      v-model="isShowHowToPlay"
      footer-hide
      width="900"
      class="ladder-howtoplay"
    >
      <div style="text-align:center">
        <img
          src="~/assets/goucai/ladder-howtoplay.png"
          alt=""
          style="border-radius: 5px;"
        />
      </div>
    </Modal>
    <div class="one-part">
      <Row
        type="flex"
        align="bottom"
      >
        <Col span="6">
        <img
          src="~/assets/img/three_ladder.png"
          alt=""
          style="vertical-align: bottom;"
        >
        <Button
          @click="isShowHowToPlay=true"
          type="error"
          size="small"
          style="margin: 12px;"
        >投注入门</Button>
        </Col>
        <Col
          span="12"
          style="text-align: center;"
        >
        <div class="ladder-title">梯子游戏</div>
        <div class="ladder-sub-title">请选择下方注项，每一期为1分钟开奖，一天共开奖为1440期。</div>
        </Col>
        <Col
          span="6"
          style="padding-left:10px;"
        >
        <p>第 {{periods}} 期{{isBet?'截止时间':'已封盘'}}:
          <second-time
            v-model="openless_leftTime"
            :time="openTime.openless"
            :callback="timer_callback"
            doneText="00:00:00"
          ></second-time>
        </p>
        </Col>
      </Row>
      <Row
        :gutter="10"
        style="margin-bottom:15px;"
        v-if="kjList"
      >
        <Col span="18">
        <animation
          :ball="kjList[0]"
        ></animation>
        </Col>
        <Col span="6">
        <history :kjList="kjList"></history>
        </Col>
      </Row>

      <commonBet
        :playObj="playObj"
        :animateKey='animateKey'
        class="ladder-bet"
      >
        <betArea
          slot='area'
          :gameItem="item"
          v-if="item"
        ></betArea>
      </commonBet>

    </div>
    <cart></cart>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters} from "vuex";
import secondTime from "~/components/game/ladder/secondTime.vue";
import animation from "~/components/game/ladder/animation.vue";
import history from "~/components/game/ladder/history.vue";
import betArea from "~/components/game/ladder/betting.vue";
import commonBet from "~/components/game/common/commonBet";
import cart from "~/components/game/common/commonCart";

export default {
  name: "ladder-index",
  components: { secondTime, animation, history, betArea, commonBet, cart },
  data() {
    return {
      isBet: false, // 是否能下注
      isShowHowToPlay: false,
      kjList: [],
      openTime: {}, // 最新开奖信息
      openless_leftTime: 0 // 倒计时剩余时间
    };
  },
  computed: {
    // ...mapState("game", ["gameList",'gameItem']),
    ...mapState("game", ['gameItem']),
    ...mapGetters('game', ['gameList']),
    // ...mapState("game", ["gameList"]),
    ...mapState("gameBet", ["periods", 'playObj']),
    
    animateKey() {
      return (this.$route.params.id || this.$route.query.id) + (this.playObj && this.playObj.playid || 1)
    },

    item() {
      const gameId = this.$route.params.id || this.$route.query.id;
      return this.gameList.find(item => item.game_id == gameId);
    }
  },
  watch:{
    openless_leftTime(openless_leftTime) {
      const isBet = openless_leftTime - (this.openTime.openless - this.openTime.stopless) > 0
      if(!isBet){
        this.nextOpen();
      }
      this.changeField({ isScrollBalls: !isBet })
      this.isBet = isBet
    }
  },
  async mounted() {
    await this.getInitData();
  },
  destroyed(){
    clearTimeout(window.__nextTimer);
  },
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"]),
    ...mapMutations("gameBet", ["changeField"]),
    timer_callback(){
      this.nextOpen();
    },
    async getInitData() {
      [this.kjList, this.openTime] = await Promise.all([
        this.togetKjCpLog(),
        this.togetCplogList()
      ]);
      this.$nextTick(() => {
        if (!this.kjList[0].balls || !this.openTime.openless) {
          this.nextOpen();
        }
      });
    },
    // 开奖定时回调 main
    async nextOpen(long = 5) {
      clearTimeout(window.__nextTimer);
      window.__nextTimer = setTimeout(async () => {
        this.getInitData()
      }, long * 1000);
    },
    // 开奖历史
    async togetKjCpLog() {
      return await this.getKjCpLog({
        tag: (this.gameItem || this.item).tag,
        date: 0,
        pcount: 10
      });
    },
    // 开奖时间 getCplogList
    async togetCplogList() {
      let ret = await this.getCplogList({ tag: (this.gameItem || this.item).tag }) || [];
      const openTime = ret[0] && ret[0].next || []
      const currentQishu = openTime[0] && openTime[0] || {}
      // console.error('梯子期数', currentQishu)
      this.changeField({
        periods: currentQishu.qishu || '',
        openTime
      });
      return currentQishu;
    }
  }
};
</script>

<style lang="scss">
.ladder-howtoplay {
  .ivu-modal-content {
    background-color: transparent;
  }
  .ivu-modal-close {
    width: 34px;
    height: 34px;
    background-color: rgba(87, 87, 87, 0.52);
    text-align: center;
    border-radius: 50%;
  }
  .ivu-modal-body {
    padding: 0;
  }
}
</style>

<style lang='scss' scoped>
.ladder-index {
  width: 1000px;
  margin: 20px auto 0;
  .one-part {
    padding: 17px;
    background-color: #feffff;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .ladder-title {
    color: #40332a;
    font-size: 34px;
  }
  .ladder-sub-title {
    width: 80%;
    line-height: 33px;
    background: rgba(128, 96, 71, 1);
    border-radius: 17px;
    color: #ffffff;
    font-size: 12px;
    margin: 10px auto 30px auto;
  }
  .ladder-bet {
    border: none;
  }
}
</style>