<template>
  <div class='app-input'>
    <input type="number" :value="value" @input="input" @change="change" :min="min" :max="max" class="n-input" />
  </div>
</template>
<script>
export default {
  name: "GameInputNumber",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: [Number, String],
    min: {
      default: 1,
    },
    max: {
      default: 99999,
    },
    type: {
      default: 1,
    },
    needNull: {
      default: false,
    },
  },
  methods: {
    input(event) {
      if (this.needNull && event.target.value === "") {
        this.$el.querySelector("input").value = "";
        this.$emit("input", "");
        return;
      }
      let _val = Math.floor(Number(event.target.value));
      if (_val < this.min) {
        _val = this.min;
      }
      if (_val > this.max) {
        _val = this.max;
      }
      this.$el.querySelector("input").value = _val;
      this.$emit("input", _val);
    },
    change(event) {
      this.$emit("change", event.target.value);
    },
  },
};
</script>
<style lang='scss' scoped>
.app-input {
  // position: relative;
  // &:after {
  //   position: absolute;
  //   content: "+";
  //   width: 16px;
  //   height: 16px;
  //   font-size: 16px;
  //   background: #ccc;
  //   color: #666;
  //   display: block;
  //   transform: rotate(45deg);
  //   top: 4px;
  //   right: 0;
  //   border-radius: 50%;
  // }
  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    text-align: center;
    border: 1px solid transparent;
    outline: 0;

    &:focus {
      // border-color: #fd697b;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>