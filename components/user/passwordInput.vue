<!-- 交易密码输入框-->
<template>
  <div class="deal_pw">
    <!-- {{value}}{{obj}} -->
    <input type="tel" v-model="obj[0]" maxlength='1' @input="input" @keyup.delete="del">
    <input type="tel" v-model="obj[1]" maxlength='1' @input="input" @keyup.delete="del">
    <input type="tel" v-model="obj[2]" maxlength='1' @input="input" @keyup.delete="del">
    <input type="tel" v-model="obj[3]" maxlength='1' @input="input" @keyup.delete="del">
  </div>
</template>
<script>
export default {
  name: "passwordInput",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    value: String,
    default: ""
  },
  // directives: {
  //   focus: {
  //     update(el, { value, oldValue }) {
  //       console.error(value);
  //       if (value != "" && oldValue == "") el.focus();
  //     }
  //   }
  // },
  data() {
    let value = this.value || "";
    value = value.split("");
    if (value.length !== 4) value = ["", "", "", ""];
    return {
      obj: value,
      //暂存四个变量
      first: "",
      second: "",
      third: "",
      forth: ""
    };
  },
  watch: {
    obj(v) {
      let value = v.join("");
      this.$emit("update", value);
      //暂存四个变量
      [this.first, this.second, this.third, this.forth] = v;
    }
  },
  methods: {
    input({ target }) {
      // console.error(target.previousElementSibling);
      // console.error(target.nextElementSibling);
      if (target.value === "" && target.previousElementSibling) {
        target.previousElementSibling.focus();
      } else if (target.value !== "" && target.nextElementSibling) {
        target.nextElementSibling.focus();
      }
    },
    del({ target }) {
      if (target.value === "" && target.previousElementSibling)
        target.previousElementSibling.focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.deal_pw {
  display: inline-block;
  input {
    text-security: disc;
    -webkit-text-security: disc;
    -mox-text-security: disc;
    text-security: disc;
    width: 40px;
    height: 30px;
    font-size: 18px;
    border: 1px solid #acacb4;
    border-radius: 3px;
    margin-right: 5px;
    text-align: center;
    background-color: #f3f3f3;
  }
}
</style>


