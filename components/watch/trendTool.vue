<template>
  <div class='trend-tool'>
    <div class="tool-title">{{gameName}}开奖号码</div>
    <div class="tool-menu">
      <div :class="option.lineKey?'bg':''" @click="changeOption('lineKey')">显示折线</div>
      <div :class="option.cellKey?'bg':''" @click="changeOption('cellKey')">显示遗漏</div>
      <div v-for="(item,key) in data" :key="key" @click="clickItem(item,key)" :class="{acitve:key===dataActive}">{{item.label}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'trendTool',
  props: ['gameName', 'option'],
  data() {
    return {
      lineKey: true,
      cellKey: true,
      data: [
        { label: '最近20期', value: 20 },
        { label: '最近30期', value: 30 },
        { label: '最近50期', value: 50 },
        { label: '最近100期', value: 100 },
        { label: '前天', value: -2 },
        { label: '昨天', value: -1 },
        { label: '今天', value: 0 },
      ],
      dataActive: 0,
      test: '',
    };
  },
  methods: {
    async clickItem(item, key) {
      await this.$Throttle.promise(0.5, 'change');
      this.dataActive = key;
      this.$bus.$emit('getTrenlistData', item.value);
    },
    changeOption(key) {
      this.$emit('changeOption', key);
    },
    line() {
      this.lineKey = !this.lineKey;
      this.$emit('lineKey', this.lineKey);
    },
    cell() {
      this.cellKey = !this.cellKey;
      this.$emit('cellKey', this.cellKey);
    },
  },
  mounted() {
    // this.testkn();
    // this.test = new this.$Throttle();
  },
};
</script>
<style lang='scss' scoped>
.trend-tool {
  width: 900px;
  margin: 0 auto;
  .tool-title {
    padding-bottom: 10px;
    color: #f60;
    font-size: 14px;
    text-align: left;
  }
  .tool-menu {
    display: flex;
    margin-bottom: 10px;
    user-select: none;
    > div {
      flex: 1;
      padding: 4px 2px;
      margin-right: 5px;
      border: 1px Solid #f60;
      border-radius: 5px;
      color: #f60;
      cursor: pointer;
    }
    .bg {
      background: #f60;
      color: #fff;
    }
    .acitve {
      background: red;
      color: #fff;
    }
  }
}
</style>