<template>
  <div class="special column-2">
    <div class="title">
      <span>{{dataSource[0].name}}</span>
    </div>
    <div class="head col-2">
      <div class="tr" v-for='key in 2' :key='key'>
        <div>色波</div>
        <div>赔率</div>
        <div>金额</div>
        <div style="width:200px; flex:none;">号码</div>
      </div>
    </div>
    <div class="body col-2">
      <div class="tr" :class="{active:item.money>0||((item.money+'').length)}" v-for="(item,key) in dataSource[0].option" :key="key" @click="setPrice(item)">
        <div>{{item.label}}</div>
        <div class="peilv">{{item.odds === false ? '' : item.odds}}</div>
        <div class="number-cell" :class="{'hidden':item.id===0}">
          <AppInputNumber class="number" v-model.number="item.money" :needNull='true' @input="setPrice"></AppInputNumber>
        </div>
        <div class="balls short">
          <color-ball :num="num" v-for="(num, index) in item.numbers" :key="index"></color-ball>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorBall from './ColorBall';
export default {
  name: 'TwoCol',
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
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
    setPrice(item) {
      window._________timer = setTimeout(() => {
        window.clearTimeout(window._________timer);
        this.$emit('setPrice', item);
      }, 100);
    }
  }
};
</script>

<style>
</style>
