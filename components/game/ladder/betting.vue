<template>
  <div class="ladder-betting">
    <div class="betting-end">
      <div class="play-title">终点</div>
      <div class="betting-row">
        <span class="ball background-blue">单</span>
        <span class="ball background-red">双</span>
      </div>
      <div class="betting-row">
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
      </div>
      <div class="betting-row">
        <Input v-model="input1" @keyup.native="updateMoney($event, 'input1')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input2" @keyup.native="updateMoney($event, 'input2')" size="small" clearable :number="true" class="betting-input"></Input>
      </div>
    </div>

    <div class="betting-ladder">
      <div class="play-title">梯子</div>
      <div class="betting-row">
        <span class="ball background-black">3</span>
        <span class="ball background-black">4</span>
      </div>
      <div class="betting-row">
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
      </div>
      <div class="betting-row">
        <Input v-model="input3" @keyup.native="updateMoney($event, 'input3')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input4" @keyup.native="updateMoney($event, 'input4')" size="small" clearable :number="true" class="betting-input"></Input>
      </div>
    </div>

    <div class="betting-start">
      <div class="play-title">起点</div>
      <div class="betting-row">
        <span class="ball background-start">左
          <span class="num background-black">
            <Icon type="arrow-down-a"></Icon>
          </span>
        </span>
        <span class="ball background-start">右
          <span class="num background-black" style="left: 65%;">
            <Icon type="arrow-down-a"></Icon>
          </span>
        </span>
      </div>
      <div class="betting-row">
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
      </div>
      <div class="betting-row">
        <Input v-model="input5" @keyup.native="updateMoney($event, 'input5')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input6" @keyup.native="updateMoney($event, 'input6')" size="small" clearable :number="true" class="betting-input"></Input>
      </div>
    </div>

    <div class="betting-x">
      <div class="play-title">终点X梯子</div>
      <div class="betting-row">
        <span class="ball background-blue">单
          <span class="num background-black" style="left: 65%;">3</span>
        </span>
        <span class="ball background-red">双
          <span class="num background-black">3</span>
        </span>
        <span class="ball background-blue">单
          <span class="num background-black">4</span>
        </span>
        <span class="ball background-red">双
          <span class="num background-black" style="left: 65%;">4</span>
        </span>
      </div>
      <div class="betting-row">
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
        <span class="color-red">1.97</span>
      </div>
      <div class="betting-row">
        <Input v-model="input7" @keyup.native="updateMoney($event, 'input7')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input8" @keyup.native="updateMoney($event, 'input8')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input9" @keyup.native="updateMoney($event, 'input9')" size="small" clearable :number="true" class="betting-input"></Input>
        <Input v-model="input10" @keyup.native="updateMoney($event, 'input10')" size="small" clearable :number="true" class="betting-input"></Input>
      </div>
    </div>
    <div class="close-layer"></div>
    <!-- <div class="history-content">
      <div v-for="item in data" :key="item" class="history-item">
        <div class="history-qishu">{{item.qishu}}</div>
        <div class="history-icon">
          <span :class="['ball', item.single ? 'background-blue' : 'background-red']">
            {{item.single?'单':'双'}}
            <span class="num background-black">{{item.num}}</span>
          </span>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "ladder-betting",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      data: [
        {
          qishu: "201807100433",
          single: true,
          num: 3
        },
        {
          qishu: "201807100432",
          single: true,
          num: 4
        },
        {
          qishu: "201807100431",
          single: false,
          num: 3
        },
        {
          qishu: "201807100430",
          single: false,
          num: 4
        }
      ]
    };
  },
  computed: {},
  watch: {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    updateMoney({ target }, input) {
      let money = Math.round(target.value * 1) || "";
      target.value = money;
      this[input] = money;
      // console.error(money,this[input])
    }
  }
};
</script>
<style lang="scss" scoped>
.ladder-betting {
  display: flex;
  align-items: center;
  // justify-content: center;
  position: relative;
  // padding: 7px 10px;
  height: 150px;
  border: 1px solid #dadada;
  > div {
    height: 100%;
    flex: 1;
    text-align: center;
    &:nth-child(n + 2) {
      border-left: 1px solid #dadada;
    }
  }
  .betting-x {
    flex: 2;
  }
  .play-title {
    line-height: 34px;
    background-color: #52595e;
    color: #ffffff;
    font-size: 16px;
  }
  .close-layer {
    font-size: 16px;
    color: #fff;
    line-height: 25px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
    text-align: center;
    width: 100%;
  }
  .betting-input {
    padding: 0 5px;
  }
  .betting-row {
    width: 80%;
    padding-top: 7px;
    display: inline-flex;
    justify-content: space-around;
    .ball {
      position: relative;
      width: 40px;
      height: 40px;
      padding: 0;
      font-size: 14px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: rgb(255, 255, 255);
      border-radius: 1000px;
      .num {
        position: absolute;
        width: 12px;
        height: 12px;
        padding: 0;
        font-size: 10px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 1000px;
        left: -2px;
        top: -2px;
      }
    }
    .background-start {
      border: 1px solid #999999;
      color: #272727;
      .ivu-icon {
        color: #ffffff;
      }
    }
    .background-red {
      background-color: #e23a39;
    }
    .background-blue {
      background-color: #04a0ea;
    }
    .background-black {
      background-color: #000000;
    }
  }
}
</style>
