<template>
  <div class="col" v-if="game.js_tag==='k3'">
    <div class="k3-issue">期号</div>
    <div class="k3-nums short">开奖号码</div>
    <div class="k3-hezhi">和值</div>
    <div>形态</div>
  </div>
  <div class="col" v-else-if="['pk10','pcdd'].includes(game.js_tag)">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
  </div>
  <div class="col" v-else-if="['ssc'].includes(game.js_tag)">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
    <div class="k3-hezhi">十位</div>
    <div class="k3-hezhi">个位</div>
    <div class="k3-hezhi">后三</div>
  </div>
  <div class="col" v-else-if="game.js_tag==='11x5'">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
    <div class="k3-hezhi">大小</div>
    <div>奇偶</div>
  </div>

  <div class="col" v-else-if="game.js_tag==='lhc'">
    <div class="rq">日期</div>
    <div class="k3-nums">期号</div>
    <div class="pm">平码(6个正码)</div>
    <div>特码</div>
    <div>生肖</div>
    <div>单双</div>
    <div>波色</div>
    <div>大小</div>
    <div>五行</div>
    <div>家野</div>
    <div>阴阳</div>
    <div>天地</div>
    <div>吉凶</div>
    <div>黑白</div>
    <div>男女</div>
    <div>总和单双</div>
  </div>

  <div class="col" v-else-if="game.js_tag==='pkniuniu'">
    <div class="k3-nums">期号</div>
    <div class="pm">开奖号码</div>
    <div>庄</div>
    <div>闲一</div>
    <div>闲二</div>
    <div>闲三</div>
  </div>
</template>

<script>
export default {
  name: "col-head",
  props: ["game"]
};
</script>

<style>
.detail-header > .col > div {
  flex: 1;
  text-align: center;
}
.detail-header > .col > div:nth-child(2) {
  flex: 1.5;
}
.detail-header > .col > .pks-nums {
  flex: 2;
  text-align: left;
  padding-left: 12px;
}
.detail-header > .col > .pks-issue {
  text-align: left;
  padding-left: 12px;
}
.col .short {
  flex: 1;
}
.rq {
  flex: none !important;
  width: 150px !important;
}
.pm {
  width: 150px !important;
  flex: none !important;
}
</style>
