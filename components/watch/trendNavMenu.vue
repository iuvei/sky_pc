<template>
  <menu class='nav-menu'>
    <div v-for="(v,k) in data" :key="k" :class="[{active:k===active}]" @click="$emit('clickItem',k)">
      <div :class="`_${k}`"></div>
      <span>{{v}}</span>
    </div>
  </menu>
</template>
<script>
export default {
  name: "navMenu",
  props: ["data", "active"],
};
</script>
<style lang='scss' scoped>
.nav-menu {
  display: flex;
  margin-top: 10px;
  background-color: #fff7f0;
  border: 1px solid #fecc9e;
  > div {
    height: 40px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    cursor: pointer;
    div:nth-child(1) {
      height: 27px;
      width: 27px;
      border-radius: 50%;
      margin-right: 5px;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  > div:nth-child(1) {
    div {
      display: none;
    }
    span {
      height: 28px;
      color: #fff;
      background: #bb27dd;
      border-radius: 5px;
      padding: 5px 10px;
    }
    span:hover {
      text-decoration: none;
    }
  }
  ._ssc {
    background: url("~assets/img/touzhu_ssc.png") no-repeat;
  }
  ._pk10 {
    background: url("~assets/img/touzhu_pk10.png") no-repeat;
  }
  ._k3 {
    background: url("~assets/img/touzhu_k3.png") no-repeat;
  }
  ._11x5 {
    background: url("~assets/img/touzhu_11x5.png") no-repeat;
  }
  ._3d {
    background: url("~assets/img/touzhu_3d.png") no-repeat;
  }
  ._lhc {
    background: url("~assets/img/touzhu_lhc.png") no-repeat;
  }
  ._pcdd {
    background: url("~assets/img/touzhu_pcdd.png") no-repeat;
  }
  ._lows {
    background: url("~assets/img/touzhu_low.png") no-repeat;
  }
  ._sport_key {
    // background: url("~assets/img/touzhu_sport_key.png") no-repeat;
  }
  .active {
    background-color: #fecc9e;
  }
}
</style>