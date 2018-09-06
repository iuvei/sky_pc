<template>
  <div class='game-head'>
    <div class="left fadeInLeftBig" v-switchClass="{key:animateKey,class:'fadeInLeftBig'}">
      <div class="icon">
        <img :src="item.icon" alt="">
      </div>
      <div class="info">
        <div class="info-name">{{item.game_name}}</div>
        <div class="info-set">
          总共
          <span class="red">{{item && item.tip && item.tip.replace(/\D/ig,'')}}</span>
          期 |
          <span>走势图</span>
        </div>
        <div>
          距离
          <span v-if="openTime" class="red">{{openTime[0].qishu}}</span>
          <span v-else>???</span>
          期开奖
        </div>
        <div class="lottery">
          <AppTimer :openTime="openTime" v-if="openTime.length" :callback="nextOpen" :repeat='openLength' offset="true">
          </AppTimer>
          <div v-else>欢迎下注</div>
        </div>
      </div>
    </div>
    <div class="center fadeInDownBig" v-switchClass="{key:animateKey,class:'fadeInDownBig'}">
      <div class="center-top">
        <SelfCenterTopTxt :kjList='kjList' :openPrize='openPrize' :openTime="openTime"></SelfCenterTopTxt>
      </div>
      <div class="center-balls">
        <AppLotteryNum v-if="kjList" :number="kjList[0].balls" :type="item.js_tag" :showZero="true"></AppLotteryNum>
        <div class='balls-opening' v-else>正在开奖......</div>
      </div>
      <!-- <div @click="nextOpen(20)">click</div> -->
    </div>
    <div class="right fadeInRightBig" v-switchClass="{key:animateKey,class:'fadeInRightBig'}">
      <div class="tr th">
        <div class="qh">期号</div>
        <div class="kjhm">开奖号码</div>
      </div>
      <div v-for="(v,key) in kjList" :key="key" class="tr">
        <div>{{v.qishu}}</div>
        <AppLotteryNum :number="v.balls" :type="item.js_tag"></AppLotteryNum>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getTrendBallArr } from '../../watch/tableHeader'
import switchClass from '../utils/directiveClass.js'
export default {
  name: 'PK10Head',
  data() {
    return {
      animateKey: 0,
      openTime: '',
      openLength: 0,
      kjList: '',
      openPrize: false,
      // 是否在封盘时间
      openless: false,
      reduceT: 0,
      interval: 0
    }
  },
  directives: { switchClass },
  props: ['item'],
  computed: {
    ...mapState('gameBet', ['periods'])
  },
  components: {
    SelfCenterTopTxt: {
      props: ['openPrize', 'kjList', 'openTime'],
      render() {
        if (this.openPrize) {
          return (
            <div>
              第
              <span class="red">{this.kjList[0].qishu}</span>
              期，正在开奖
            </div>
          )
        }
        return (
          <div>
            第
            <span class="red">
              {this.kjList ? this.kjList[0].qishu : '????'}
            </span>
            期，开奖号码
          </div>
        )
      }
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    ...mapMutations('gameBet', ['changeField', 'setShopCart', 'delShopCart']),
    toTop() {
      var timer = requestAnimationFrame(function fn() {
        // ;
        var s = document.documentElement.scrollTop
        if (s > 0) {
          s -= 100
          document.documentElement.scrollTop = s
          timer = requestAnimationFrame(fn)
        }
      })
    },
    async getInitData() {
      this.animateKey++
      ;[this.kjList, this.openTime] = await Promise.all([
        this.togetKjCpLog(),
        this.togetCplogList()
      ])
      this.openless = false
      this.$nextTick(() => {
        if (!this.kjList[0].balls) {
          this.openless = true
          this.kjList[0].balls = this.kjList[1].balls
          this.nextOpen(this.openTime.length)
          return
        }
        if (this.periods !== this.kjList[0].qishu + 1) {
          this.openless = true
          this.kjList.unshift({
            balls: this.kjList[0].balls,
            qishu: this.kjList[0].qishu + 1
          })
          this.nextOpen(this.openTime.length)
        }
      })
    },

    async togetKjCpLog() {
      return await this.getKjCpLog({
        tag: this.item.tag,
        date: 0,
        pcount: 10
      })
    },
    async togetCplogList() {
      let ret = await this.getCplogList({ tag: this.item.tag })
      this.changeField({ periods: ret[0].next[0].qishu })
      this.openLength = ret[0].next.length
      return ret[0].next
    },
    // 洗牌
    shuffle(arr) {
      var result = [],
        random
      while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length)
        result.push(arr[random])
        arr.splice(random, 1)
      }
      return result
    },
    // 随机数据
    random(t, i = 0) {
      if (!this.openPrize) {
        clearInterval(this.interval)
        return
      }
      let balls = this.kjList[0].balls,
        arr = getTrendBallArr[this.item.js_tag]
      switch (this.item.js_tag) {
        case 'pcdd':
          let pcdd = new Array(3)
            .fill(1)
            .map((v, k) => arr[~~(Math.random() * arr.length)])
          pcdd.push(pcdd.reduce((sum, val) => sum + val, 0))
          balls = pcdd.join('+')
          break
        case 'pk10':
          let pk10 = this.shuffle([...arr])
          balls = pk10.join('+')
          break
        case '11x5':
          let x5 = this.shuffle([...arr])
          balls = x5.slice(0, 5).join('+')
          break
        default:
          balls = (balls || '').replace(/\d{1,2}/g, () => {
            let item = arr[~~(Math.random() * arr.length)]
            return item
          })
          break
      }
      if (this.openTime[0].qishu == this.kjList[0].qishu || this.openless) {
        this.kjList[0].balls = balls
      } else {
        this.kjList.unshift({
          balls: balls,
          qishu: this.openTime[0].qishu
        })
      }
    },
    async nextOpen(length, long = 4) {
      console.log(length, long)
      this.openPrize = true
      this.random()
      clearInterval(this.interval)
      this.interval = setInterval(this.random, 400)
      clearTimeout(window.__nextTimer)

      window.__nextTimer = setTimeout(async () => {
        if (!this.openPrize) {
          clearInterval(this.interval)
          return
        }

        let list = await this.togetKjCpLog()
        clearInterval(this.interval)

        if (!this.openless) {
          let open = await this.togetCplogList()
          this.openTime = open
        }

        if (list[0].balls && list[0].qishu + 1 == this.periods) {
          this.kjList = list
          this.openPrize = false
          this.openless = false
        } else {
          this.openless = true
          this.nextOpen(length)
        }
      }, (long + 1) * 1000)
    }
  },
  mounted() {
    this.getInitData()
    this.toTop()
  },
  watch: {
    '$route.params.id'(val) {
      this.toTop()
      this.delShopCart()
      this.setShopCart()
      this.$bus.$emit('resetBetArea')
      this.openPrize = false
      this.getInitData()
    },
    openPrize(val) {
      this.changeField({ isScrollBalls: this.openPrize })
    }
  }
}
</script>
<style lang='scss' scoped>
.game-head {
  display: flex;
  // justify-content: ;
  align-items: center;
  height: 150px;
  background-color: #feffff;
  > div {
    height: 120px;
    flex: 1;
    padding: 0 10px;
  }
  .left {
    display: flex;
    border-right: 1px dashed #dddddd;
    justify-content: center;
    .icon {
      height: 100px;
      width: 100px;
      margin: 10px;
      img {
        width: 100%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-name {
        font-size: 18px;
      }
      &-set span {
        &:nth-child(2) {
          cursor: pointer;
        }
      }
      .lottery {
        height: 40px;
        font-size: 24px;
      }
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px dashed #dddddd;
    &-top {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
    }
    &-balls {
      height: 60px;
      margin-top: 6px;
    }
  }
  .right {
    overflow-y: scroll;
    .tr,
    .th {
      width: 305px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .qh {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .kjhm {
        width: 213px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .tr {
      width: 305px;
      display: flex;
      height: 30px;
      justify-content: center;
      align-items: center;
      div:nth-child(1) {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      div:nth-child(2) {
        width: 213px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="scss">
.game-head {
  .red {
    color: #e93248;
  }
  .center-balls {
    .pcdd-balls {
      height: 60px;
      .td {
        width: 60px;
        height: 60px;
        span {
          height: 50px;
          width: 50px;
          line-height: 50px;
          font-size: 24px;
        }
        i {
          line-height: 50px;
        }
      }
    }
    .balls-opening {
      font-size: 24px;
      color: #e93248;
      text-align: center;
    }
    // .default,
    // .k3-balls {
    //   height: 60px;
    //   .td {
    //     width: 70px;
    //     height: 60px;
    //     span {
    //       height: 50px;
    //       width: 50px;
    //       line-height: 50px;
    //       font-size: 24px;
    //       background-size: 50px;
    //     }
    //     i {
    //       line-height: 50px;
    //     }
    //   }
    // }
    .waiting {
      text-align: center;
    }
  }
}
</style>
