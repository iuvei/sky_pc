<template>
    <div class="th" v-if="number.length > 1">
        <div class="td">
            <span class="ball-left"> {{arr[0] == 0 ? '左' : '右'}}</span>
        </div>
        <div class="td">
            <span class="ball-3"> {{arr[1] == 0 ? 3 : 4}}</span>
        </div>
        <div class="td">
            <span :class="arr[2] == '0' ? 'ball-odd' : 'ball-even'"> {{arr[2] == 0 ? '单' : '双'}}</span>
        </div>
    </div>
    <div class="waiting" v-else>正在开奖...</div>
</template>
<script>
export default {
  name: "ladder-ball",
  props: ["number"],
  computed: {
    arr() {
      return this.number.split("+");
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.th {
  display: flex;
  .td {
    display: flex;
  }
  .waiting {
    font-size: 24px;
    color: #e93248;
    text-align: center;
  }
  span {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    font-size: 16px;
    text-align: center;
    color: #fff;
    margin-right: 17px;
  }
  .ball-left {
    color: #676363;
    background: #dcdcdc;
  }
  .ball-3 {
    background: #626262;
  }
  .ball-odd {
    background: #1aa1e7;
  }
  .ball-even {
    background: #E33B3F;
  }
}
</style>

