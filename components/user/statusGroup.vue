<template>
  <div class="status-group">
    <div class="check_box" v-for="el in data" :key="el.value" :class="{ active : value === el.value}" @click="toggleTime(el.value)">{{el.label}}</div>
  </div>
</template>

<script>

export default {
  name: "statusGroup",
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    data: Array,
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    toggleTime(n) {
      this.$emit("update", n);
    }
  }
};
</script>

<style lang="scss" scoped>
.status-group {
  line-height: 34px;
  margin: 13px 2px;
  display: flex;
  font-size: 14px;
  align-items: center;
  .check_box {
    height: 24px;
    cursor: pointer;
    line-height: 24px;
    padding: 0px 5px 0px 5px;
    margin-left: 5px;
    color: #999;
    border: 1px Solid #ccc;
    font-size: 14px;
  }
  .check_box.active {
    border: 1px Solid red;
    color: red;
  }
}
</style>


