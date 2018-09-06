<template>
  <div class="history-wrap">
    <div class="history-title">
      <div>
        期数
      </div>
      <div>
        开奖结果
      </div>
    </div>
    <div class="history-content">
      <div v-for="item in data" :key="item.qishu" class="history-item">
        <div class="history-qishu">{{item.qishu}}</div>
        <div class="history-icon">
          <span :class="['ball', item.single ? 'background-blue' : 'background-red']">
            {{item.single?'单':'双'}}
            <span class="num background-black">{{item.num}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "history-wrap",
  data() {
    return {
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
  methods: {}
};
</script>
<style lang="scss" scoped>
.history-wrap {
  background-image: url("~/assets/img/ladder-bg-1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  position: relative;
  padding: 7px 10px;
  height: 300px;
  .history-title {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b58e5e;
    border: 1px solid #b58e5e;
    color: #ffffff;
    > div {
      flex: 1;
      text-align: center;
      &:first-child {
        border-right: 1px solid #9d7f59;
      }
    }
  }
  .history-content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    .history-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      &:nth-child(n + 2) {
        border-top: 1px solid #ffffff;
      }
    }
    .history-qishu {
      flex: 1;
      color: #000000;
    }
    .history-icon {
      min-width: 60px;
    }
    .ball {
      position: relative;
      width: 30px;
      height: 30px;
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
