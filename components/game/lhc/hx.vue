<template>
  <div class="special" style="padding:20px 0">

    <div class="head" style="width:600px;border-bottom:1px solid #ffd5d5;">
      <div class="tr">
        <div>赔率</div>
        <div v-for="(item,index) in odds" :key="index" :class="{active:odd === item}">
          {{item}}
        </div>
      </div>
    </div>

    <div class="head col-2" style="margin-top:20px;">
      <div class="tr" v-for="k in 2" :key="k">
        <div>生肖</div>
        <div class="wave-ball hx">号码</div>
      </div>
    </div>

    <div class="body col-2">
      <div class="tr" v-for="(item,key) in dataSource[0].option" :key="key" @click="selectItem(item)">
        <div>
          <Checkbox v-model="item.selected" size="large"></Checkbox>
          {{item.label}}
        </div>
        <div class="wave-ball hx">
          <color-ball :num="num" v-for="(num,index) in item.numbers" :key="index"></color-ball>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorBall from "./ColorBall";
export default {
  name: "hx",
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    odd: {
      type: [Number, String],
      default() {
        return "";
      }
    },
    odds: {
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
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>

<style scoped>
.bet-main.lhc .special .head .wave-ball.hx,
.bet-main.lhc .special .body .wave-ball.hx {
  flex: none;
  width: 250px;
  justify-content: flex-start;
}
.bet-main.lhc .special .body .wave-ball.hx > span {
  margin-right: 10px;
}
.bet-main.lhc .special .head .wave-ball.hx {
  text-align: center;
  justify-content: center;
  color: #000;
}
</style>





