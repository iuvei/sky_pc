<template>
  <div class="special">
    <div class="title">
      <span>{{$store.state.gameBet.playObj.wanfa}}</span>
    </div>
    <div class="head">
      <div class="tr">
        <div>半波</div>
        <div>赔率</div>
        <div>金额</div>
        <div class="ball">号码</div>
      </div>
    </div>
    <div class="body">
      <div class="tr" :class="{active:item.money>0||((item.money+'').length)}" v-for="(item,key) in dataSource[0].option" :key="key" @click="setPrice(item)">
        <div>{{item.label}}</div>
        <div class="peilv">{{item.odds === false ? '' : item.odds}}</div>
        <div class="number-cell" :class="{'hidden':item.id===0}">
          <AppInputNumber class="number" v-model.number="item.money" :needNull='true' @input="setPrice(item)"></AppInputNumber>
        </div>
        <div class="balls">
          <span v-for="(ball, i) in item.numbers" :key="i" v-if="i>0" :style="{background:item.numbers[0]}">
            {{ball}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorBall from "./ColorBall";
export default {
  name: "OneCol",
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ColorBall
  },
  methods: {
    setPrice(item) {
      window._________timer = setTimeout(() => {
        window.clearTimeout(window._________timer);
        if (isNaN(item.money)) {
          item.seleced = false;
        }
        this.$emit("setPrice", item);
      }, 100);
    }
  }
};
</script>

<style>
</style>
