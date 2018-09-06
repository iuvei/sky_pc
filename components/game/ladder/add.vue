<template>
  <div class="ladder-add-betting">
    <div class="info">
      您选择了
      <span>{{betting.betNum}}</span>
      注，共
      <span>{{total}}</span>
      元，单注
    </div>
    <div class="number">

      <AppInputNumber class="money" v-model="money"></AppInputNumber>
      <div class="unit">
        <span :class="{active:unit==0}" @click="unit = 0">元</span>
        <span :class="{active:unit==1}" @click="unit = 1">角</span>
        <span :class="{active:unit==2}" @click="unit = 2">分</span>
      </div>
    </div>
    <div class="multiple-group">
      <div>倍数: </div>
      <AppNumberSide v-model="multiple"></AppNumberSide>
      
    </div>
    <div class="btn-group">
      <Button type="error" @click="goAdd" class="add">添加</Button>
      <Button type="info" @click="goSubmit" class="submit">一键投注</Button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "ladder-add-betting",
  data() {
    return {
      betting:{
        betNum: 1
      },
      total: 10,
      unit: 0,
      multiple: 1,
      money: 2
    };
  },
  computed: {
    ...mapState("userinfo", ["isLogin"]),
  },
  watch: {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    // 添加购物车
    goAdd() {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning("请选择号码球");
        return;
      }
      
      this.$Message.success("成功添加至购物车");
    },
    // 一键投注
    async goSubmit() {
      if (!this.isLogin) {
        this.$Message.warning("请先登录");
        return;
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning("请选择号码球");
        return;
      }

    }
  }
};
</script>
<style lang="scss" scoped>
.ladder-add-betting {
  height: 72px;
  display: flex;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #ededed;
  > div {
    height: 40px;
    display: flex;
    padding-right: 10px;
    align-items: center;
    color: #4f4f4f;
  }
  .info {
    span {
      width: 40px;
      text-align: center;
      color: #fd435a;
    }
  }
  .number {
    width: 170px;
    .money {
      width: 42px;
      height: 28px;
      margin-right: 6px;
      background-color: #ededed;
      border-radius: 10px;
    }
    .unit {
      height: 37px;
      // width: 100px;
      line-height: 25px;
      display: flex;
      flex: 1;
      padding: 6px 11px;
      border-radius: 18px;
      background-color: #ededed;
      span {
        flex: 1;
        text-align: center;
        margin-right: 4px;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          color: #ff586d;
        }
      }
      .active {
        background: linear-gradient(to bottom, #ff586d, #fd435a);
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .multiple-group {
    .odds {
      width: 100px;
    }
  }
  .btn-group {
    button {
      margin-left: 10px;
    }
    .add {
      width: 66px;
      height: 40px;
      background: rgba(253, 67, 90, 1);
      border-radius: 4px;
    }
    .submit {
      width: 110px;
      height: 40px;
      background: rgba(63, 172, 222, 1);
      border-radius: 7px 7px 7px 7px;
    }
  }
}
</style>
