<template>
  <div class="special" style="padding:20px 0">

    <div class="head col-2" style="margin-top:20px;">
      <div class="tr" v-for="k in 2" :key="k">
        <div>生肖</div>
        <div>赔率</div>
        <div class="long-balls">号码</div>
        <div>勾选</div>
      </div>
    </div>

    <div class="body col-2">
      <div class="tr" v-for="(item,key) in dataSource[0].option" :key="key" @click="selectItem(item)">
        <div>{{item.label}}</div>
        <div v-if="!!item.odds">{{item.odds}}</div>
        <div v-if="!item.odds" class="placeholder-container">
          <div class="placeholder"></div>
        </div>
        <div class="wave-ball long-balls">
          <color-ball :num="num" v-for="(num, index) in item.numbers" :key="index"></color-ball>
        </div>
        <div v-if="item.label">
          <Checkbox v-model="item.selected" size="large"></Checkbox>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ColorBall from "./ColorBall";
export default {
  name: "lxbz",
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
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.placeholder-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.placeholder {
  width: 40px;
  background: #f0f0f0;
  height: 20px;
  border-radius: 4px;
}
.long-balls {
  flex: none !important;
  width: 180px !important;
  > span {
    margin-right: 6px;
  }
}
</style>






