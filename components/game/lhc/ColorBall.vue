<template>
  <span :class="{red:redBall(num),blue:blueBall(num),green:greenBall(num)}">{{num}}</span>
</template>

<script>
import { default_color } from "./field.js";
export default {
  name: "ColorBall",
  props: {
    num: {
      type: String,
      default: ""
    }
  },
  methods: {
    redBall(num) {
      return default_color.red.balls.includes(num);
    },
    blueBall(num) {
      return default_color.blue.balls.includes(num);
    },
    greenBall(num) {
      return default_color.green.balls.includes(num);
    }
  }
};
</script>

<style>
</style>
