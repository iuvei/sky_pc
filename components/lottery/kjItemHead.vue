<template>
  <div class="col"
       v-if="game.js_tag==='k3'">
    <div class="k3-issue">期号</div>
    <div class="k3-nums short">开奖号码</div>
    <div class="k3-hezhi">和值</div>
    <div>形态</div>
  </div>
  <div class="col"
       v-else-if="['pk10','pcdd'].includes(game.js_tag)">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
  </div>
  <div class="col"
       v-else-if="['ssc'].includes(game.js_tag)">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
    <div class="k3-hezhi">十位</div>
    <div class="k3-hezhi">个位</div>
    <div class="k3-hezhi">后三</div>
  </div>
  <div class="col"
       v-else-if="game.js_tag==='11x5'">
    <div class="k3-issue">期号</div>
    <div class="k3-nums">开奖号码</div>
    <div class="k3-hezhi">大小</div>
    <div>奇偶</div>
  </div>

  <div class="col lhc"
       v-else-if="game.js_tag==='lhc'">
    <div class="rq">日期</div>
    <div class="nums">期号</div>
    <div class="pm">平码(6个正码)</div>
    <div>特码</div>
    <div>生肖</div>
    <div>单双</div>
    <div>波色</div>
    <div>特码大小</div>
    <div>五行</div>
    <div>家野</div>
    <div>阴阳</div>
    <div>天地</div>
    <div>吉凶</div>
    <div>黑白</div>
    <div>男女</div>
    <div>笔画</div>
    <div>总和单双</div>
  </div>

  <div class="col pkniuniu"
       v-else-if="game.js_tag==='pkniuniu'">
    <div class="nums">期号</div>
    <div class="pm">开奖号码</div>
    <div>庄</div>
    <div>闲一</div>
    <div>闲二</div>
    <div>闲三</div>
    <div>闲四</div>
    <div>闲五</div>
  </div>

  <div class="col xypk"
       v-else-if="game.js_tag==='xypk'">
    <div class="nums">期号</div>
    <div class="pm">开奖号码</div>
    <div class="nums">形态</div>
  </div>

  <div class="col qxc"
       v-else-if="game.js_tag==='qxc'">
    <div class="">期号</div>
    <div class="pm">开奖号码</div>
    <div class="sm">千位</div>
    <div class="sm">百位</div>
    <div class="sm">十位</div>
    <div class="sm">个位</div>
    <div>总和</div>
  </div>

  <div class="col xync"
       v-else-if="game.js_tag==='xync'">
    <div class="">期号</div>
    <div class="pm">开奖号码</div>
    <div class="state">总和</div>
  </div>

  <div class="col tzyx"
       v-else-if="game.js_tag==='tzyx'">
    <div class="">期号</div>
    <div class="pm">开奖号码</div>
  </div>

</template>

<script>
export default {
  name: "col-head",
  props: ["game"]
};
</script>

<style lang="scss">
.detail-header > .col > div {
  /* flex: 1; */
  width: 60px;
  text-align: center;
}
.detail-header {
  .lhc {
    .nums {
      width: 60px;
    }
    .pm {
      width: 120px !important;
    }
  }
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

.tzyx {
  .pm {
    flex: 1 !important;
  }
}

.pkniuniu {
  > div {
    width: 26px !important;
  }
  .nums {
    width: 60px !important;
    flex: none !important;
  }
  .pm {
    width: 116px !important;
  }
}

.lhc {
  width: 100%;
  .nums {
    width: 60px;
    flex: none !important;
  }
}

.xypk {
  .nums {
    width: 60px;
    flex: none !important;
  }
  .pm {
    flex: 1 !important;
  }
}

.xync {
  .pm {
    flex: 1 !important;
  }
  .state {
    width: 100px !important;
  }
}

.qxc {
  // width: 33.3%;
  > div:nth-child(1) {
    flex: none;
    width: 50px;
  }
  > div:nth-child(2) {
    flex: none;
    width: 53px !important;
  }
  .sm {
    width: 42px !important;
    flex: none !important;
  }
}
</style>
