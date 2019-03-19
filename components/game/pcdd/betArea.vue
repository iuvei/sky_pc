<template>
  <div class='bet-area'>
    <!-- 特码 -->
    <div class="special">
      <div class="title">
        <span>{{betSelectSet[1].name}}</span>
      </div>
      <div class="head">
        <div class="tr" v-for='key in 4' :key='key'>
          <div>号码</div>
          <div>赔率</div>
          <div>金额</div>
        </div>
      </div>
      <div class="body">
        <div :class="['tr',{active:item.money}]" v-for="(item,key) in betSelectSet[1].option" :key="key">
          <div class="ball-cell">
            <div :class="['ball',{active:item.money}]">
              {{item.label}}
            </div>
          </div>
          <div class="odds">{{item.odds}}</div>
          <div class="number-cell ">
            <AppInputNumber class="number " v-model="item.money" :needNull='true' @input="inputChange"></AppInputNumber>
          </div>
        </div>
      </div>
    </div>
    <!-- 包三 -->
    <div class="three">
      <div class="title">
        <span>{{betSelectSet[0].name}}</span>
      </div>
      <div class="three-group">
        <AppSelect v-model="numbers[0]" :data="betSelectSet[0].option" :limit="numbers" class="select"></AppSelect>
        <AppSelect v-model="numbers[1]" :data="betSelectSet[0].option" :limit="numbers" class="select"></AppSelect>
        <AppSelect v-model="numbers[2]" :data="betSelectSet[0].option" :limit="numbers" class="select"></AppSelect>
      </div>
      <div class="three-money">
        <span>下注金额</span>
        <AppInputNumber class="number " v-model="id2Money" :needNull='true' @input="inputChange"></AppInputNumber>
        <span>元</span>
      </div>
    </div>
    <!-- 混合 波色 豹子 -->
    <div class="multiple ">
      <!-- 混合 -->
      <div class="mix ">
        <div class="title ">
          <span>{{betSelectSet[2].name}}</span>
        </div>
        <div class="head ">
          <div class="tr " v-for='key in 2' :key='key'>
            <div>号码</div>
            <div>赔率</div>
            <div>金额</div>
          </div>
        </div>
        <div class="body">
          <div :class="['tr',{active:item.money}]" v-for="(item,key) in betSelectSet[2].option " :key="key ">
            <div class="ball-cell">
              <div :class="['ball',{active:item.money}]">
                {{item.label}}
              </div>
            </div>
            <div class="odds">{{item.odds}}</div>
            <div class="number-cell ">
              <AppInputNumber class="number " v-model="item.money" :needNull='true' @input="inputChange"></AppInputNumber>
            </div>
          </div>
        </div>
      </div>
      <!-- 波色 -->
      <div class="wave ">
        <div class="title ">
          <span>{{betSelectSet[3].name}}</span>
        </div>
        <div class="head ">
          <div class="tr ">
            <div>号码</div>
            <div>赔率</div>
            <div>金额</div>
          </div>
        </div>
        <div class="body ">
          <div :class="['tr',{active:item.money}]" v-for="(item,key) in betSelectSet[3].option " :key="key ">
            <div class="ball-cell">
              <div :class="['ball',{active:item.money}]">
                {{item.label}}
              </div>
            </div>
            <div class="odds">{{item.odds}}</div>
            <div class="number-cell">
              <AppInputNumber class="number " v-model="item.money" :needNull='true' @input="inputChange"></AppInputNumber>
            </div>
          </div>
        </div>
      </div>
      <!-- 豹子 -->
      <div class="leopard ">
        <div class="title ">
          <span>{{betSelectSet[4].name}}</span>
        </div>
        <div class="head ">
          <div class="tr ">
            <div>号码</div>
            <div>赔率</div>
            <div>金额</div>
          </div>
        </div>
        <div class="body ">
          <div :class="['tr',{active:item.money}]" v-for="(item,key) in betSelectSet[4].option " :key="key ">
            <div class="ball-cell">
              <div :class="['ball',{active:item.money}]">
                {{item.label}}
              </div>
            </div>
            <div class="odds">{{item.odds}}</div>
            <div class="number-cell ">
              <AppInputNumber class="number " v-model="item.money" :needNull='true' @input="inputChange"></AppInputNumber>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import getField from './field.js'
export default {
  name: 'betArea',
  data() {
    return {
      numbers: [0, 1, 2],
      betSelectSet: getField,
      id2Money: ''
    }
  },
  computed: {
    ...mapState('gameBet', ['playObj'])
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField', 'setShopCart']),
    inputChange(val) {
      // console.log(val)
      let arr = []
      this.betSelectSet.forEach((group, idx) => {
        let fd = []
        if (group.playId === 2) {
          // 包三
          if (!this.id2Money) return
          fd = [
            {
              wanfa: group.name,
              playId: group.playId,
              xiangqing: `${group.name}(${this.numbers.sort().join(' ')})`,
              betNum: 1,
              value: this.numbers.sort().join('+'),
              money: this.id2Money,
              odds: group.odds
            }
          ]
        } else {
          fd = group.option.filter(item => item.money).map(v =>
            Object.assign(
              {
                wanfa: group.name,
                playId: group.playId,
                xiangqing: `${group.name}(${v.label})`,
                betNum: 1
              },
              v
            )
          )
        }
        arr = [...arr, ...fd]
      })
      this.setBetting({
        betNum: arr.length
      })
      this.$emit('selectedItem', arr)
    },
    // 下注数据组装 结构+赔率
    async togetPeilv() {
      if (!this.playObj.playid) return
      // 请求赔率
      let ret = await this.getPeilv()
      if (!ret.length) {
        return
      }
      let id1Arr = ret[0].peilv.split('|'),
        id2Arr = ret[1].peilv.split('|'),
        id3Arr = ret[2].peilv.split('|')
      // 特码
      getField[1].option.map((v, k) => {
        return Object.assign(v, { odds: id1Arr[k] })
      })
      // 包三
      getField[0].odds = id2Arr[0]
      // 混合多样
      for (let i = 2; i < 5; i++) {
        option: getField[i].option.map((v, k) => {
          return Object.assign(v, { odds: id3Arr[k] })
        })
        id3Arr.splice(0, getField[i].option.length)
      }

      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      this.betSelectSet.forEach((group, idx) => {
        if (!idx) return
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          val.money = ''
          return val
        })
      })
      this.id2Money = ''
    },
    addData(betSelectSet, callback) {
      let group = betSelectSet[0],
        betted = []
      if (group.playId === 2) {
        // 包三
        betted = [
          {
            wanfa: group.name,
            playId: group.playId,
            xiangqing: `${group.name}(${this.numbers.sort().join(' ')})`,
            value: group.option
              .filter(item => item.selected)
              .map(v => v.value)
              .join('+'),
            odds: group.odds,
            money: 2,
            multiple: 1,
            betNum: 1
          }
        ]
      } else {
        betted = group.option.filter(item => item.selected).map(v =>
          Object.assign(v, {
            wanfa: group.name,
            playId: group.playId,
            xiangqing: `${group.name}(${v.label})`,
            multiple: 1,
            betNum: 1,
            money: 2
          })
        )
      }
      this.setShopCart(betted)
    }
  },
  mounted() {
    this.$bus.$on('resetBetArea', this.clearSelect)
    this.$bus.$on('randomBet', this.addData)
    this.setBetting()
    // 后期删除 开发热更新 兼容
    this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('randomBet')
  },
  watch: {
    playObj(val) {
      this.setBetting()
      this.togetPeilv()
    }
  }
}
</script>
<style lang='scss' scoped>
.bet-area {
  .title {
    height: 36px;
    background-color: #f5f5f5;
    span {
      display: inline-block;
      width: 75px;
      height: 36px;
      line-height: 36px;
      background-color: #e93248;
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
  .tr {
    display: flex;
    border-top: 1px solid #ffd5d5;
    border-right: 1px solid #ffd5d5;

    > div {
      flex: 1;
      text-align: center;
    }
    .ball-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      .ball {
        width: 31px;
        height: 31px;
        border-radius: 15px;
        line-height: 31px;
        font-size: 18px;
        background: linear-gradient(to bottom, #ffffff, #e2e2e2);
        box-shadow: 2px 0px 3px rgba(7, 0, 2, 0.21);
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: linear-gradient(to bottom, #fb5f73, #e93248);
          color: #fff;
          transform: scale(1.08);
        }
      }
      .active {
        background: linear-gradient(to bottom, #fb5f73, #e93248);
        color: #fff;
        transform: scale(1.08);
      }
    }

    .odds {
      font-size: 14px;
    }
    .hide {
      visibility: hidden;
    }
    .number-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 28px;
    }
  }
  .head {
    border-left: 1px solid #ffd5d5;
    .tr > div {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      background: #fcf9f1;
    }
  }
  .body {
    border-left: 1px solid #ffd5d5;
    border-bottom: 1px solid #ffd5d5;
    .tr {
      background-color: #fff;
      > div {
        height: 44px;
        line-height: 44px;
      }
    }
    .active {
      background-color: #ffe9ec;
    }
  }

  .special {
    .head,
    .body {
      column-count: 4;
      column-gap: 0px;
      // column-rule: thin solid #ffd5d5;
    }
  }
  .three {
    display: flex;
    height: 47px;
    margin-bottom: 10px;
    border: 1px solid #ffd5d5;
    border-top-width: 0;
    .title {
      height: 45px;
      background-color: #fff;
      span {
        width: 120px;
        height: 35px;
        border-radius: 23px;
        margin: 6px 6px;
      }
    }
    .three-group {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .select {
        // three-pack
        width: 80px;
        height: 35px;
        border: 1px solid #cacaca;
        border-radius: 17px;
        margin-left: 20px;
      }
    }
    .three-money {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      span {
        padding: 0 8px;
      }
    }
  }
  .multiple {
    display: flex;
    .mix {
      flex: 2;
      .head,
      .body {
        column-count: 2;
        column-gap: 0px;
        .tr .ball-cell .ball {
          width: auto;
          padding: 0 10px;
        }
      }
    }
    .wave,
    .leopard {
      flex: 1;
      .head,
      .body {
        border-left: none;
        .tr .ball-cell .ball {
          width: auto;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.bet-area {
  .number {
    width: 70px;
    height: 28px;
    line-height: 28px;
    // margin: 10px auto 4px;
    background-color: #f1fff;
    border-radius: 8px;
    border: 1px solid #cacaca;
  }
}
</style>
