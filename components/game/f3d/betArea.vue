<template >
  <div class="bet-main">
    <div v-for="(group,idx) in betSelectSet" :key='idx' class="group" v-if="!isDanshi">
      <div class="title">
        <div class="title-txt" v-if="group.name">{{group.name}}</div>
      </div>
      <div class="option" :class="{'niuniu': playObj.playid == 131}">
        <div v-for="(item,key) in group.option" :key="key" class="item">
          <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(item,idx)">{{item.label}}</div>
          <div class="item-odd" v-show="item.odds">{{item.odds}}</div>
        </div>
      </div>
      <div class="actions" v-if="![3, 6, 7, 26, 27].includes(playObj.playid)">
        <div class="ball" v-for="(txt, index) in actionsArr" :key="index" @click="changeGroup(group, index)">
          <span>{{txt}}</span>
        </div>
      </div>
    </div>
    <div v-if="isDanshi">
      <Input v-model.trim="textarea" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="例如：1 2 3" @on-blur="filterData" />
      <div class="tiper">每个号码之间请用空格隔开，每一注号码之间请用一个逗号[,]隔开</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import getField from './field.js'
import calcSSC from './calc.js'

export default {
  name: 'betArea',
  props: ['playConfig'],
  data() {
    return {
      betSelectSet: [],
      selsetedArr: [],
      actionsArr: ['全', '大', '小', '单', '双', '清'],
      textarea: '',
      singleArr: [],
      zhushu: ''
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj']),
    isDwd() {
      return [12].includes(this.playObj.playid)
    },
    isDanshi() {
      return [2].includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装
    async togetPeilv() {
      if (!this.playObj.playid || this.isDanshi) return
      // 获取模板数据
      this.betSelectSet = getField(this.playObj.playid)
      // 请求赔率
      let ret = await this.getPeilv()
      let item
      // 和值数据处理
      const playItem = ret.find(val => val.playid == this.playObj.playid)
      const peilv = playItem ? playItem.peilv : ''
      item = peilv ? peilv.split('|') : []
      // 单一赔率
      if (item.length === 1) {
        this.changeField({ stateOdds: this.processZero(item[0]) })
      } else {
        this.changeField({ stateOdds: false })
        this.betSelectSet.forEach((group, idx) => {
          let odds = item.splice(0, group.option.length),
            opt = []
          this.betSelectSet[idx].option = group.option.map((val, key) => {
            this.$set(val, 'odds', this.processZero(odds[key]))
            return val
          })
        })
      }

      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      this.textarea = ''
      this.betSelectSet.forEach((group, idx) => {
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          val.selected = false
          return val
        })
      })
    },
    // 注数计算
    getBetNum(value) {
      let arr = []
      value.forEach(v => {
        arr = [...arr, ...v.split('|')].filter(h => h)
      })
      if (this.isDwd) {
        arr = this.getDwdArr(arr)
      }
      if (
        this.betSelectSet.length > 1 &&
        ![26, 27].includes(this.playObj.playid)
      ) {
        return calcSSC.calcBetNum(this.playObj.playid, value)
      } else {
        return calcSSC.calcBetNum(this.playObj.playid, arr)
      }
    },
    // 选球互斥
    // 选择号码
    selectItem(item, idx) {
      // 互斥
      item.selected = !item.selected
      this.addData()
    },
    // 单行操作
    changeGroup(row, actIndex) {
      // 0 全 1 大 2 小 3 单 4 双 5 清
      row.option.forEach(x => {
        x.selected = false
        switch (actIndex) {
          case 0:
            x.selected = true
            break
          case 1:
            if (x.value > 4) x.selected = true
            break
          case 2:
            if (x.value < 5) x.selected = true
            break
          case 3:
            if (x.value % 2 !== 0) x.selected = true
            break
          case 4:
            if (x.value % 2 === 0) x.selected = true
        }
      })
      this.addData()
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
      return {
        name,
        label,
        value
      }
    },
    singleSelect(betSelectSet = this.textarea, callback) {
      let arr = betSelectSet.split(',')

      this.singleArr = arr.map(v => {
        v = v
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')

        return {
          selected: calcSSC.calcBetNum(this.playObj.playid, [v.join('|')]),
          label: v.join(' '),
          value: v.join('|'),
          name: '号码'
        }
      })
      let data = this.singleArr.filter(item => item.selected)
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(data)),
          oneBetDate: {
            name: data.map(item => item.name),
            label: data.map(item => item.label),
            value: data.map(item => item.value)
          }
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(data)),
          oneBetDate: {
            name: data.map(item => item.name),
            label: data.map(item => item.label),
            value: data.map(item => item.value)
          },
          betNum: data.length
        })
      }
    },
    filterData() {
      this.textarea = this.singleArr
        .filter(item => item.selected)
        .map(item => item.label)
        .join(',')
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      if (this.isSingle) {
        this.singleSelect(betSelectSet.replace(/\|/g, ' '), callback)
        return
      }
      let arr = [],
        name = [],
        label = [],
        value = [],
        betNum,
        obj
      if (!this.isDanshi) {
        betSelectSet.forEach((g, i) => {
          let tr = g.option
            .filter(obj => obj.selected)
            .map(v => Object.assign(v, { name: g.name }))
          arr = [...arr, ...tr]
          name[i] = g.name
          label[i] = tr.map(td => td.label).join('|')
          value[i] = tr
            .map(td => td.value)
            .sort()
            .join('|')
        })
        betNum = this.getBetNum(value)

        obj = this.calcAddData(name, label, value)
      } else {
        arr = betSelectSet.split(',').map(item => {
          return {
            name: this.playObj.wanfa,
            label: item,
            value: item.split(' ').join('|')
          }
        })
        betNum = this.zhushu
        obj = {}
      }
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: obj,
          betNum
        })
      }
    }
  },
  async mounted() {
    this.$bus.$on('resetBetArea', () => {
      this.clearSelect()
    })
    this.$bus.$on('randomBet', this.addData)
    this.setBetting()
    // todo 后期删除 开发热更新兼容 开发时开启 上线时关闭
    // this.togetPeilv()
  },
  watch: {
    playObj(val) {
      this.setBetting()
      this.togetPeilv()
      this.textarea = ''
    },
    playConfig(val) {
      if (!val) {
        this.betSelectSet = []
      }
    },
    textarea(val) {
      this.singleSelect()
    },
    zhushu(val) {
      this.addData(this.textarea)
    }
  },
  destroyed() {
    this.$bus.$off('randomBet')
  }
}
</script>
<style lang='scss' scoped>
@mixin normal() {
}
@mixin active() {
  background: url(~/assets/img/game/ssc_choosed.png) no-repeat;
  background-size: contain;
  transform: perspective(1px) scale(1.1);
  color: #fff;
}
.bet-main {
  padding: 30px 0 30px 30px;
}
.bet-area {
  .group {
    display: flex;
    padding: 4px 0;
    align-items: center;
    .title {
      background: linear-gradient(to bottom, #ff586d, #e93248);
      width: 80px;
      border-radius: 20px;
      height: 40px;
      &-txt {
        color: #fff;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
    }
    .option {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      justify-content: flex-start;
      padding: 2px 0 2px 40px;
      border-radius: 10px;
      align-items: center;
      transition: background-color 0.4s ease;
      &:hover {
        background-color: rgb(238, 238, 238);
      }
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 18px;
        height: auto;
        width: 50px;
        &-value {
          border-radius: 50%;
          @include normal();
          background: url(~/assets/img/game/ssc_ball.png) no-repeat;
          background-size: cover;
          transition: all 0.2s linear;
          height: 50px;
          width: 50px;
          line-height: 50px;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
          &:hover {
            @include active();
            background-image: none;
            background-color: rgb(233, 50, 72);
            box-shadow: 0 1px 2px #333;
          }
        }
        .active {
          @include active();
          transform: scale(0.95);
          background-image: none;
          background-color: rgb(233, 50, 72);
          box-shadow: 0 1px 2px #333;
        }
        &-odd {
          height: 18px;
          border: 1px solid #ccc;
          padding: 0 6px;
          border-radius: 6px;
        }
        .long {
          width: auto;
          padding: 0 5px;
        }
      }
    }
    .niuniu {
      width: 800px;
      .item {
        margin-left: 50px;
      }
      // padding-left: 100px;
      flex: none;
    }
    .actions {
      display: flex;
      width: 330px;
      justify-content: center;
      align-items: center;
      .ball {
        width: 48px;
        height: 46px;
        position: relative;
        background: url(~/assets/img/game/pk10/pk10_btn_bg.png) no-repeat top
          center;
        background-size: 100% 100%;
        margin-right: 6px;

        span {
          content: '';
          display: block;
          background: url(~/assets/img/game/pk10/pk10_btn.png) no-repeat top
            center;
          background-size: 44px 44px;
          background-position: 2px 2px;
          display: block;
          font-size: 18px;
          height: 46px;
          line-height: 42px;
          transition: all 0.1s linear;
          text-align: center;
          cursor: pointer;
        }
        .active span,
        &:hover span {
          background: url(~/assets/img/game/pk10/pk10_btn_active.png) no-repeat
            top center;
          background-size: 44px 44px;
          background-position: 2px 2px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }
}
</style>
