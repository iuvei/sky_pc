<template>
  <div class='app-input-number-side'>
    <span :class="['l',{active:l==='l'}]" @click="setMultiple(-1)">-</span>
    <!-- <AppInputNumber class="multiple" v-model="value"></AppInputNumber> -->
    <AppInputNumber class="multiple" :value="value" @input="change" :max="max"></AppInputNumber>
    <span :class="['r',{active:l==='r'}]" @click="setMultiple(1)">+</span>
  </div>
</template>
<script>
export default {
  name: "AppNumberSide",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: Number,
    type: {
      default: 1,
    },
    max: {
      default: 99999,
    },
  },
  data() {
    return {
      l: "",
    };
  },
  methods: {
    setMultiple(n) {
      n > 0 ? (this.l = "r") : (this.l = "l");
      if (this.value + n < 1) return;

      this.$emit("change", this.value + n);
    },
    change(v) {
      this.$emit("change", v);
    },
  },
  watch: {
    // value() {
    //   this.$emit("change", this.value);
    // },
  },
};
</script>
<style lang='scss' scoped>
.app-input-number-side {
  display: flex;
  height: 30px;
  margin: 0 8px;
  span {
    width: 25px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #d1d1d1;
    cursor: pointer;
  }
  .l {
    background: linear-gradient(to right, #ffffff, #dadada);
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    user-select: none;
  }
  .r {
    background: linear-gradient(to right, #dadada, #ffffff);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    user-select: none;
  }
  .active {
    background: #ff586d;
  }
  .multiple {
    width: 40px;
    border-top: 1px solid #d1d1d1;
    border-bottom: 1px solid #d1d1d1;
  }
}
</style>