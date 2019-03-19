<template>
  <div :class="['app-select',{expand:show}]" @click="toggle">
    <div class="value">{{value}}</div>
    <div class="options" v-show="show">
      <AppCollapse :open="show" class="app-collapse">
        <li v-for="(v,k) in data " :key="k" class="li" @click="selected(v)" :class="{disabled:limit.includes(v.value)}">
          <span>{{v.label}}</span>
        </li>
      </AppCollapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSelect',
  model: {
    prop: 'value',
    event: 'select',
  },
  props: ['data', 'value', 'limit'],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    selected(item) {
      if (this.limit.includes(item.value)) return;
      this.$emit('select', item.value);
    },
  },
};
</script>
<style lang='scss' scoped>
.app-select {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  &::after {
    transition: all 0.5s ease-in-out;
    content: '';
    display: inline-block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid #cacaca;
    border-left: 2px solid #cacaca;
    right: 10px;
    z-index: 3;
    transform: rotate(45deg);
  }
  .value {
    width: 29px;
    height: 29px;
    border: 1px solid #cacaca;
    border-radius: 15px;
    font-size: 18px;
    margin-left: 8px;
    text-align: center;
    line-height: 29px;
  }
  .options {
    height: 260px;
    overflow-y: scroll;
    position: absolute;
    top: 34px;
    width: 100%;
    border: 1px solid #cacaca;
  }
  .app-collapse {
    .li {
      height: 25px;
      width: 100%;
      text-align: center;
      line-height: 25px;
      border-bottom: 1px solid #cacaca;
      background-color: #fff;
      font-size: 16px;
      z-index: 1000;
      &:hover {
        background-color: #ffe9ec;
      }
    }
    .disabled {
      cursor: no-drop;
      background-color: #ffe9ec;
    }
  }
}
.expand {
  &::after {
    transition: all 0.5s ease-in-out;
    transform: rotate(225deg);
  }
}
</style>
