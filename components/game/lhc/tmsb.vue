<template>
  <div class="special tmsb">
    <div class="title">
      <span>{{dataSource[0].name}}</span>
    </div>
    <div class="head">
      <div class="tr">
        <div>特码色波</div>
      </div>
    </div>
    <div class="body" style="column-count:unset">
      <div v-for="(item,idx) in dataSource[0].option" :key="idx" class="wave">
        <div>
          <div class="box" @click="selectItem(item,idx)" :class="{active:item.selected}">
            <h2 :style="{color:item.label.includes('红波')?'red':(item.label.includes('蓝波')?'blue':'green')}">{{item.label}}</h2>
            <div class="box-numbers">
              <span v-for="(wave, index) in item.numbers" :key="index">{{wave}}</span>
            </div>
          </div>
          <p>{{item.odds === false ? '' : item.odds}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tmsb',
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item);
    }
  }
};
</script>

<style>
</style>
