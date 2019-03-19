<template>
  <div class="xync-main">
    <ul>
      <li v-for="(item, index) in betSelectSet" :key="index" :class="[{'zh': index==0}, 'else']">
        <div class="title">
          <span>{{item.name}}</span>
        </div>
        <ul>
          <li v-for="(x, y) in item.option" :key="y" :class="{'active': x.money || x.selected}" @click.prevent="setPrice(x)">
            <div v-show="isDwd||y>19" style="color: #010101;">{{x.label}}</div>
            <div v-show="!isDwd&&y<20">
              <img :src="ball_icons[x.label-1]" alt="">
            </div>
            <div style="color: #666;">{{x.odds}}</div>
            <AppInputNumber class="number" v-model="x.money" :needNull='true' @input="singleChange" v-show="!isDwd"></AppInputNumber>
            <Checkbox v-model="x.selected" size="large" v-show="isDwd"></Checkbox>
          </li>
        </ul>
      </li>
    </ul>
    <div class="all_control" v-show="!isDwd">
      设置下注金额
      <AppInputNumber class="number special" v-model="allPrice" :needNull='true'></AppInputNumber>
      元
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import getField from './field.js'
import calcFarm from './calc.js'
import mixinMutex from '../mixinMutex'
const ball_icons = Array(20)
  .fill('')
  .map((el, id) =>
    require('../../../assets/img/xync_background/lucky_ball_' +
      (id + 1 + '').padStart(2, '0') +
      '.png')
  )
export default {
  name: 'betArea',
  data() {
    return {
      betSelectSet: [],
      selsetedArr: [],
      allPrice: '',
      ball_icons
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj', 'stateOdds', 'lhc']),
    // 公共单注金额
    commonPrice() {
      return this.lhc.curPrice
    },
    isDwd() {
      return [1].includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装 结构+赔率
    async togetPeilv(v) {
      if (!this.playObj.playid) return
      // 获取模板数据
      this.betSelectSet = getField(this.playObj.playid)
      // this.$set(this.betSelectSet, getField(this.playObj.playid));
      // 请求赔率
      let ret = await this.getPeilv()
      if (!ret.length) {
        return
      }
      let item
      const playItem = ret.find(val => val.playid == this.playObj.playid)
      const peilv = playItem ? playItem.peilv : ''
      item = peilv ? peilv.split('|') : []
      if (this.playObj.playid == 1) {
        this.changeField({ stateOdds: item[0] })
      } else {
        this.changeField({ stateOdds: false })
      }
      this.betSelectSet.forEach((group, idx) => {
        let odds =
            item.length == 1 ? item : item.splice(0, group.option.length),
          opt = []
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          if (this.playObj.playid == 1) {
            this.$set(val, 'odds', odds[0])
          } else {
            this.$set(val, 'odds', odds[key])
          }
          return val
        })
      })
      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      this.betSelectSet.forEach((group, idx) => {
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          val.money = ''
          val.selected = false
          return val
        })
      })
      this.allPrice = ''
    },
    setPrice(item) {
      let price = this.commonPrice
      if (!this.isDwd) {
        if (!isNaN(price) && !item.money.toString().trim().length) {
          item.money = Number(price)
        }
      } else {
        const selected = JSON.parse(JSON.stringify(item.selected))
        item.selected = !selected
        item.money = (!selected && price) || ''
      }
      setTimeout(this.addData)
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      let arr = [],
        name = [],
        label = [],
        obj,
        value = []
      betSelectSet.forEach((g, i) => {
        let tr = g.option
          .filter(m => (this.isDwd || callback ? m.selected : m.money))
          .map(v => Object.assign(v, { name: g.name }))
        arr = [...arr, ...tr]
        name[i] = g.name
        label[i] = tr.map(td => td.label).join('|')
        value[i] = tr
          .map(td => td.value)
          .sort()
          .join('|')
      })
      obj = this.calcAddData(name, label, value)
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj,
          betNum: arr.length
        })
      }
    },
    singleChange(val) {
      let _this = this
      window.setTimeout(_this.addData, 1)
    },
    calcAddData(name, label, value) {
      //双面盘 定位胆，数字盘数据特殊处理
      if (this.isDwd) {
        let _name = [],
          _label = []
        label.forEach((x, i) => {
          if (x.length) {
            _name.push(name[i])
            _label.push(x)
          }
        })
        name = _name
        label = _label
        value = this.getDwdArr(value)
      } else if (value.length === 1) {
        value = value.map(x => x.replace(/\|/g, '+'))
      }
      // console.log('label', label)
      return {
        name,
        label,
        value
      }
    }
  },
  mounted() {
    this.$bus.$on('resetBetArea', this.clearSelect)
    this.$bus.$on('randomBet', this.addData)
    this.setBetting()
    // todo 后期删除 开发热更新兼容 开发时开启 上线时关闭
    // this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('randomBet')
  },
  watch: {
    playObj(val) {
      this.setBetting()
      this.togetPeilv(2)
      this.allPrice = ''
    },
    // 双面盘 设置金额
    commonPrice(commonPrice) {
      if (this.isDwd) {
        this.betSelectSet.forEach(item => {
          item.option.forEach(m => {
            m.money = (m.money && commonPrice) || ''
          })
        })
        this.addData()
      }
    },
    allPrice(val) {
      this.betSelectSet.forEach(item => {
        item.option.forEach(m => {
          m.money = val
        })
      })
      this.addData()
    }
  }
}
</script>
<style lang='scss'>
.xync-main {
  padding: 20px;
  font-size: 14px;
  .number {
    display: inline-block;
    height: 27px;
    border-radius: 8px;
    border: 1px solid #cacaca;
    line-height: 27px;
    background-color: #f1ffff;
    input {
      background-color: transparent;
      height: 27px;
      line-height: 27px;
    }
  }
  .special {
    width: 80px;
  }
  > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > li {
      border: 1px solid #ffd5d5;
      width: 23%;
      // margin-right: 20px;
      margin-bottom: 20px;
      .title {
        font-weight: 500;
        background-color: #f5f5f5;
        span {
          background-color: #e93248;
          color: #fff;
          display: inline-block;
          text-align: center;
          width: 75px;
          height: 36px;
        }
      }
      ul {
        li {
          border-top: 1px solid #ffd5d5;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-weight: 500;
          div,
          input {
            width: 30%;
            text-align: center;
          }
          div {
            height: 36px;
            img {
              width: 40px;
            }
          }
          input {
            height: 27px;
            border-radius: 8px;
            border: 1px solid #cacaca;
          }
        }
        .active {
          background-color: #ffe9ec;
        }
      }
      .title,
      ul > li {
        height: 36px;
        line-height: 36px;
      }
    }
    .zh {
      width: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          width: 25%;
          border-right: 1px solid #ffd5d5;
          &:nth-child(4n) {
            border-right: none;
          }
          &:nth-child(32) {
            border-bottom: 1px solid #ffd5d5;
          }
        }
      }
    }
  }
  .all_control {
    text-align: center;
    width: 100%;
    border: 1px solid #ffd5d5;
    height: 48px;
    line-height: 48px;
    font-weight: 400;
    color: rgb(102, 102, 102);
    input {
      text-align: center;
      height: 27px;
      border-radius: 8px;
      border: 1px solid #cacaca;
    }
  }
}
</style>
