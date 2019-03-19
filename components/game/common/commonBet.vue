<template>
  <div class='common-bet'>
    <!-- 下注提示 -->
    <div class="bet-top" v-if="$route.params.id != 51">
      <div class="title">{{playObj.play_title}}</div>
      <Poptip trigger="hover">
        <div slot="content">
          <div class="wrap-pop" v-html="playObj.play_fanli"></div>
        </div>
        <div class="case">范例</div>
      </Poptip>
      <Poptip trigger="hover">
        <div slot="content">
          <div class="wrap-pop" v-html="playObj.play_shuoming"></div>
        </div>
        <div class="describe">玩法说明</div>
      </Poptip>
    </div>
    <!-- 下注选择区域 -->
    <div class="bet-area" v-switchClass="{key:animateKey,class:'fadeInRight',duration:0.5}">
      <slot name='area'></slot>
    </div>

    <!-- 下注详情&下注 -->
    <div class="bet-tool">
      <div class="info">
        您选择了
        <span>{{betting.betNum}}</span>
        注，共
        <span>{{total}}</span>
        元，
        <span v-show="isNeedSinglePrice">单注</span>
      </div>
      <div class="number" v-show="isNeedSinglePrice">

        <AppInputNumber class="money" v-model="money"></AppInputNumber>
        <div class="unit">
          <span :class="{active:unit==0}" @click="unit = 0">元</span>
          <span :class="{active:unit==1}" @click="unit = 1">角</span>
        </div>
      </div>
      <div class="multiple-group">
        <div>倍数: </div>
        <AppNumberSide v-model="multiple"></AppNumberSide>
        <div class="odds">
          <div v-show="stateOdds">
            <span>赔率：</span>
            <span>{{stateOdds}}</span>
          </div>

        </div>
      </div>
      <div class="btn-group">
        <Button type="error" @click="goAdd" class="add">添加</Button>
        <Button type="info" @click="goSubmit" class="submit">一键投注</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import switchClass from '../utils/directiveClass.js'
export default {
  name: 'commonBetArea',
  props: ['playObj', 'animateKey'],
  directives: { switchClass },
  computed: {
    ...mapState('userinfo', ['isLogin']),
    ...mapState('gameBet', ['betting', 'stateOdds', 'lhc']),
    isNeedSinglePrice() {
      return this.$route.name.split('-')[1] != 'lhc'
    },
    isLhc() {
      return this.$store.state.game.gameItem.js_tag === 'lhc'
    },
    isXync() {
      return this.$store.state.game.gameItem.js_tag === 'xync'
    },
    isLadder() {
      return ['tzyx'].includes(this.$store.state.game.gameItem.js_tag)
    },
    total() {
      if (this.isLhc && this.betting.selected.length) {
        if (this.lhc.isBall) {
          // 如果是选球
          let number = this.money * this.betting.betNum * this.multiple
          return number.float('multiply', this.unitArr[this.unit])
        } else {
          // 如果是填数字
          let moneys = this.betting.selected.map(x => x.money)
          let total = 0
          total = moneys.map(x => x * this.multiple).reduce((a, b) => a + b)
          return total.float('multiply', this.unitArr[this.unit])
        }
      } else if (this.isLadder || this.isXync) {
        let moneys = this.betting.selected.map(x => x.money)
        let total = 0
        total =
          moneys.length &&
          moneys.map(x => x * this.multiple).reduce((a, b) => a + b, 0)
        return total.float('multiply', this.unitArr[this.unit])
      } else {
        let number = this.money * this.betting.betNum * this.multiple
        return number.float('multiply', this.unitArr[this.unit])
      }
    }
  },
  data() {
    return {
      money: 2,
      unitArr: [1, 0.1],
      unit: 0,
      multiple: 1,
      ccc: 'wrap-pop'
    }
  },
  methods: {
    ...mapActions('gameBet', [
      'submitBet',
      'userSubmitTouzhu',
      'quickUserSubmitTouzhu'
    ]),
    ...mapMutations('gameBet', ['changeField', 'setShopCart']),
    // 一键投注
    async goSubmit() {
      if (!this.isLogin) {
        this.$Message.warning('请先登录')
        return
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning('请选择号码球')
        return
      }
      await this.$Throttle.promise(0.5)
      let betted = this.add(1)
      let money = 0,
        betNum = 0
      betted.forEach(item => {
        money += item.money
        betNum += item.betNum
      })
      let [err, ret] = await this.quickUserSubmitTouzhu({
        request: betted,
        multiple: this.multiple
      })
      if (ret) {
        this.setShopCart()
        this.$bus.$emit('resetBetArea')
        this.$Message.success('投注成功，祝您好运！')
        await this.$store.dispatch('userinfo/flushPrice')
      }
    },
    // 添加购物车
    goAdd() {
      if (!this.isLogin) {
        this.$Message.warning('请先登录')
        return
      }
      if (this.betting.betNum === 0) {
        this.$Message.warning('请选择号码球')
        return
      }
      let betted = this.add()
      this.setShopCart(betted)
      this.$bus.$emit('resetBetArea')
      this.$Message.success('成功添加至购物车')
    },
    // 购物车详情数据拼接
    getOneInfo() {
      let isRenxuan = this.$store.state.game.gameId * 1 == 54
      let str = '',
        data = this.betting.oneBetDate
      if (!isRenxuan) {
        return data.name
          .map((name, key) => `${name}(${data.label[key]})`.replace(/\s/g, ''))
          .join(' ')
      } else {
        let str = ''
        str = data.name
          .map((name, key) => `${name}`.replace(/\s/g, ''))
          .join(',')
        return `${this.playObj.wanfa}(${str})`
      }
    },
    // 购物车行数据
    add(type = 0) {
      let isDanshi =
          this.playObj.playname.includes('单式') ||
          this.playObj.wanfa.includes('单式'),
        isBaoxuan =
          this.playObj.playname.includes('包选') ||
          this.playObj.wanfa.includes('包选'),
        isDanxuan =
          this.playObj.playname.includes('单选') ||
          this.playObj.wanfa.includes('单选'),
        isRenxuanOne =
          this.playObj.playname.includes('任选一') ||
          this.playObj.wanfa.includes('任选一'),
        isPuke = this.$store.state.game.gameId * 1 == 54,
        betted = []
      if (this.stateOdds && !isDanshi && !isPuke) {
        // 正常下注
        betted = [
          {
            xiangqing: this.getOneInfo(),
            playId: this.playObj.playid,
            wanfa: this.playObj.wanfa,
            multiple: this.multiple,
            betNum: this.betting.betNum,
            odds: this.stateOdds,
            // 一键投注 区分
            money: type
              ? this.total.float('divide', this.multiple)
              : this.total,
            value: this.betting.oneBetDate.value.join('+')
          }
        ]
        // console.log(this.multiple * this.money * this.unitArr[this.unit]);
      } else if (this.stateOdds && !isDanxuan && !isRenxuanOne && isPuke) {
        // puke下注特殊情况
        betted = [
          {
            xiangqing: this.getOneInfo(),
            playId: this.playObj.playid,
            wanfa: this.playObj.wanfa,
            multiple: this.multiple,
            betNum: this.betting.betNum,
            odds: this.stateOdds,
            // 一键投注 区分
            money: type
              ? this.total.float('divide', this.multiple)
              : this.total,
            value: this.betting.oneBetDate.value.join('+')
          }
        ]
      } else {
        // 随机一注

        betted = this.betting.selected.map((v, k) => ({
          xiangqing: isBaoxuan
            ? `${this.playObj.wanfa}(${v.name})`
            : isPuke
              ? `${this.playObj.wanfa}(${v.name})`
              : `${v.name}(${v.label})`,
          playId: this.playObj.playid,
          wanfa: this.playObj.wanfa,
          multiple: this.multiple,
          betNum: 1,
          odds: isDanshi || isDanxuan || isRenxuanOne ? this.stateOdds : v.odds,
          // 一键投注 区分
          money: type
            ? (((this.isLadder || this.isXync) && v.money) || this.money).float(
                'multiply',
                this.unitArr[this.unit]
              )
            : (
                this.multiple *
                (((this.isLadder || this.isXync) && v.money) || this.money)
              ).float('multiply', this.unitArr[this.unit]),
          value: v.value
        }))
      }
      return betted
    }
  },
  watch: {
    'playObj.playid'(val) {
      this.money = 2
      this.unit = 0
      this.multiple = 1
    },
    money(val) {
      if (val) {
        this.$store.commit('gameBet/setCurPrice', val)
      }
    }
  },
  mounted() {
    this.$store.commit('gameBet/setCurPrice', 2)
  }
}
</script>

<style lang='scss' scoped>
.common-bet {
  padding: 10px 2px;
  background-color: #feffff;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  .bet-top {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 14px;
    padding-left: 10px;
    .title {
      padding: 0 20px;
      background: url('~assets/img/game/bet-note-title.png') no-repeat left
        center;
    }
    .case {
      padding: 0 20px;
      background: url('~assets/img/game/bet-note-case.png') no-repeat left
        center;
      cursor: pointer;
    }
    .describe {
      padding: 0 20px;
      background: url('~assets/img/game/bet-note-describe.png') no-repeat left
        center;
      cursor: pointer;
    }
  }
  .bet-tool {
    height: 72px;
    display: flex;
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
        min-width: 40px;
        text-align: center;
        color: #e93248;
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
          background: linear-gradient(to bottom, #ff586d, #e93248);
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
        background: #e93248;
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
}
</style>
<style lang='scss'>
.common-bet {
  .wrap-pop {
    width: 200px;
    white-space: pre-line;
  }
  .btn-group {
    span {
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
