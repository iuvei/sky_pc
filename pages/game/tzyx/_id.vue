<template>
  <div class='ladder'>
    <div class="one-part">
      <Row type="flex" align="bottom">
        <Col span="6">
        <img src="~/assets/img/three_ladder.png" alt="" style="vertical-align: bottom;">
        <Button type="error" size="small" style="margin: 12px;">投注入门</Button>
        </Col>
        <Col span="12" style="text-align: center;">
        <div class="ladder-title">梯子游戏</div>
        <div class="ladder-sub-title">请选择下方注项，每一期为1分钟开奖，一天共开奖为1440期。</div>
        </Col>
      </Row>
      <Row :gutter="10" style="margin-bottom:15px;">
        <Col span="18">
        <animation></animation>
        </Col>
        <Col span="6">
        <history></history>
        </Col>
      </Row>

      <betting></betting>

      <add></add>

    </div>
    <cart></cart>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import animation from "~/components/game/ladder/animation.vue";
import history from "~/components/game/ladder/history.vue";
import betting from "~/components/game/ladder/betting.vue";
import add from "~/components/game/ladder/add.vue";
import cart from "~/components/game/ladder/cart.vue";

export default {
  name: "ladder",
  components: { animation, history, betting, add, cart },
  computed: {
    ...mapState("game", ["gameList"])
  },
  mounted() {},
  methods: {
    ...mapActions("game", ["getCplogList", "getKjCpLog"])
  }
};
</script>
<style lang='scss' scoped>
.ladder {
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
}
</style>