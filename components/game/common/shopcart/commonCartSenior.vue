<template>
  <div class='cart-senior'>
    <div class="cart-title">
      <div :class="{active:tabKey===0}" @click="switchTab(0)">普通追号</div>
      <div :class="{active:tabKey===1}" @click="switchTab(1)">高级追号</div>
    </div>>
    <div class="cart-body">
      <div class="cart-body-tool">
        <div>连续追号计划：</div>
        <div class="g-select">
          <div v-for="(v,k) in autoArr" :key='k' :class="{active:auto===v}" @click="auto=v">{{v}}期</div>
        </div>
        <div class="flex-center">
          追
          <GameNumber v-model="auto" max='20' :needNull='true'></GameNumber>
          期
        </div>
        <div class="flex-center">
          起始
          <GameNumber v-model="multiple" :needNull='true' @change='changeMultiple'></GameNumber>

          倍数
        </div>
        <div class="stop-checkbox">
          <Checkbox v-model="stop" true-value='1' false-value="0">中奖停追</Checkbox>
        </div>
      </div>
      <Table stripe :columns="columns" :data="data" height="400" class="table"></Table>
    </div>
    <div class="cart-info">共追号
      <span>{{auto}}</span> 期，
      <span>{{total}}</span> 元
    </div>
    <div class="cart-foot">
      <button class="ivu-btn confirm" @click="submit">确定投注</button>
      <button class="ivu-btn cancel" @click="()=>{this.beforeClose(false)}">暂不投注</button>
    </div>
  </div>
</template>
<script>
import GameNumberSide from '../InputNumber/InputNumberSide';
import GameNumber from '../InputNumber/InputNumber';
export default {
  name: 'CartSenior',
  props: ['componentData', 'beforeClose', 'visible'],
  data() {
    return {
      autoArr: [5, 10, 15, 20],
      auto: 5,
      multiple: 1,
      stop: '1',
      tabKey: 0,
      columns: [],
      tableList: [],
    };
  },
  components: { GameNumberSide, GameNumber },
  computed: {
    data() {
      return this.tableList.slice(0, this.auto);
    },
    total() {
      return this.data.reduce((s, item) => {
        return (s += item.multiple.float('multiply', item.money));
      }, 0);
    },
  },
  methods: {
    switchTab(n) {
      if (n) {
        this.$Message.info('高级功能，暂且关闭。');
      }
    },
    changeMultiple(n) {
      this.tableList.forEach(item => {
        item.multiple = n * 1;
      });
    },
    submit() {
      this.beforeClose({
        data: this.data.map(item => item.multiple),
        stop: this.stop,
      });
    },
  },
  mounted() {
    this.tableList = this.componentData.openTime.map((item, idx) => {
      this.$set(item, 'money', this.componentData.sum);
      this.$set(item, 'willWin', this.componentData.willWin);
      this.$set(item, 'multiple', 1);
      return item;
    });
    this.columns = [
      {
        title: '序号',
        key: 'qishu',
        width: 80,
        align: 'center',
        render: (h, { index }) => {
          return <span>{index + 1}</span>;
        },
      },
      { title: '追号期数', key: 'qishu', algin: 'center' },
      {
        title: '倍数',
        key: 'multiple',
        width: 120,
        align: 'center',
        render: (h, { row, index }) => {
          return (
            <div class="flex-center">
              <GameNumberSide
                v-model={row.multiple}
                onChange={n => {
                  this.tableList[index].multiple = n;
                }}
              />
              <div>倍</div>
            </div>
          );
        },
      },
      {
        title: '金额',
        key: 'money',
        align: 'center',
        render: (h, { row }) => {
          return <span>{row.multiple.float('multiply', row.money)}</span>;
        },
      },
      {
        title: '预期盈利',
        key: 'win',
        align: 'center',
        render: (h, { row }) => {
          return <span>{row.multiple.float('multiply', row.willWin)}</span>;
        },
      },
      {
        title: '开奖时间',
        align: 'center',
        width: 150,
        key: 'opentime',
        render: (h, { row }) => (
          <span>
            {new Date(row.opentime * 1000).format('yyyy-MM-dd hh:mm:ss')}
          </span>
        ),
      },
    ];
  },
};
</script>
<style lang='scss' scoped>
.cart-senior {
  padding: 0 50px;
  position: relative;
  .cart-title {
    display: flex;
    height: 30px;
    border-bottom: 3px solid #e5e5e5;
    align-items: flex-end;
    font-size: 16px;
    > div {
      width: 80px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        color: #ff586d;
      }
    }
    .active {
      color: #ff586d;
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: -3px;
        left: 0;
        background-color: #e93248;
        z-index: 3;
      }
    }
  }
  .cart-body {
    .cart-body-tool {
      display: flex;
      position: relative;
      align-items: center;
      padding: 8px 12px;
      > div {
        margin-right: 16px;
      }
      .g-select {
        display: flex;
        height: 24px;
        width: 200px;
        padding: 0 6px;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #dcdcdc;
        border-radius: 10px;
        background-color: #fff;
        > div {
          height: 24px;
          width: 40px;
          line-height: 24px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            color: #ff586d;
          }
        }
        .active {
          background: linear-gradient(to bottom, #ff586d, #e93248);
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
      }
      .stop-checkbox {
        position: absolute;
        right: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.senior-modal {
  width: 800px !important;
  .cart-senior {
    .flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cart-body-tool {
      .flex-center .app-input {
        width: 41px;
        height: 23px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #ededed;
        border-radius: 4px;
        margin: 0 5px;
      }
    }
    .cart-info {
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        color: #e93248;
      }
    }
    .cart-foot {
      height: 40px;
      margin-bottom: 20px;
      text-align: center;
      .ivu-btn {
        width: 110px;
        height: 40px;
        margin: 0 10px;
        border: 7px;
        font-size: 18px;
        color: #fff;
      }
      .confirm {
        background: #e93248;
      }
      .cancel {
        background: rgba(188, 188, 188, 1);
      }
    }
    .table {
      .flex-center {
      }
    }
  }
}
</style>
