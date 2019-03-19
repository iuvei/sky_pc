<template >
  <div class="bet-main">
    <!-- {{playObj.playid}} -->
    <div v-for="(group,idx) in betSelectSet" :key='idx' class="group">
      <div class="title">
        <div class="title-txt" v-if="group.name">{{group.name}}</div>
      </div>
      <div class="option" :class="{'niuniu': playObj.playid == 57}">
        <div v-for="(item,key) in group.option" :key="key" class="item">
          <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(group,item)">{{item.label}}</div>
          <div class="item-odd" v-show="item.odds">{{item.odds}}</div>
        </div>
      </div>

      <div class="actions" v-if="shortcut.includes(playObj.playid)">
        <div class="ball" v-for="(txt, index) in actionsArr" :key="index" @click="changeGroup(group, index)">
          <span>{{txt}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import getField from './field.js'
import calcBetNum from './calc.js'
import { debug } from 'util'

export default {
  name: 'betArea',
  data() {
    return {
      shortcut: [1, 2, 3, 4, 5, 6],
      textarea: '',
      zhushu: '',
      myPlaceholder: '',
      betSelectSet: [],
      selsetedArr: [],
      singleArr: [],
      actionsArr: ['全', '大', '小', '单', '双', '清']
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj', 'stateOdds']),
    isDwd() {
      return [1, 2, 3, 4, 8].includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装
    async togetPeilv() {
      this.betSelectSet = []
      if (!this.playObj.playid) {
        return
      }

      // 请求赔率
      let ret = await this.getPeilv()
      let item
      // 和值数据处理
      const playItem = ret.find(val => val.playid == this.playObj.playid)
      const peilv = playItem ? playItem.peilv : ''
      item = peilv ? peilv.split('|') : []
      console.log('object', item)
      // 获取模板数据
      this.betSelectSet = getField(this.playObj)
      // console.log(this.betSelectSet)
      // debugger
      // if (this.playObj.playid == 1) {
      //   const arr = peilv ? peilv.split("|") : [];
      //   let pre = arr.length ? arr.splice(0, 4) : [];
      //   item = [...arr, ...pre];
      // } else {

      // }
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
      console.log(this.betSelectSet)
      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      // this.textarea = ''
      this.betSelectSet.forEach((group, idx) => {
        this.betSelectSet[idx].option = group.option.map((val, key) => {
          val.selected = false
          return val
        })
      })
    },
    //所有的定位胆都需要单独计算一个位置参数
    //只要当前行有值，就取当前行的2次方数，和即为位置数组
    getDwdArr(arr) {
      let c = 0
      arr.forEach((x, i) => {
        if (x.length) {
          c += Math.pow(2, i)
        }
      })
      return [c.toString()].concat(arr)
    },
    // 注数计算
    getBetNum(value) {
      let playid = this.playObj.playid
      let arr = []
      if ([1, 2, 3, 4, 8].includes(playid)) {
        // 定位
        arr = this.getDwdArr(value).filter(x => x.length)
      } else if ([5, 6].includes(playid)) {
        //二字现  三字现
        arr = value[0] ? value[0].split('+') : []
        // this.zhushu = calc(playid, singleRow)
      } else if ([7].includes(playid)) {
        // 和值组选
        value.forEach(item => {
          arr = [...arr, ...item.split('+')]
        })
      } else if ([9, 10, 11, 12].includes(playid)) {
        // 前后向
        arr = value
      }
      console.log(arr)
      return calcBetNum(playid, arr)
    },
    // 选择号码
    selectItem(group, item) {
      // console.log(item)
      item.selected = !item.selected
      // 互斥
      // this.mutex(group, item)
      this.addData()
    },
    // 单行操作
    changeGroup(row, actIndex) {
      // console.log(row, actIndex)
      // 0 全 1 大 2 小 3 单 4 双 5 清
      row.option.forEach((x, idx) => {
        x.selected = false
        switch (actIndex) {
          case 0:
            x.selected = true

            break
          case 1:
            if (x.value > 4) {
              x.selected = true
            }
            break
          case 2:
            if (x.value < 5) {
              x.selected = true
            }
            break
          case 3:
            if (x.value % 2 !== 0) {
              x.selected = true
            }
            break
          case 4:
            if (x.value % 2 === 0) {
              x.selected = true
            }
            break
        }
      })

      this.addData()
    },
    calcAddData(name, label, value) {
      const playid = this.playObj.playid
      //双面盘 定位胆，数字盘数据特殊处理
      if (this.isDwd) {
        value = this.getDwdArr(value)
      }
      return {
        name: name.filter(x => x.length),
        label: label.filter(x => x.length),
        value: value.filter(x => x.length)
      }
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      let arr = [],
        name = [],
        label = [],
        value = [],
        betNum,
        obj

      betSelectSet.forEach((g, i) => {
        let tr = g.option
          .filter(obj => obj.selected)
          .map(v => Object.assign(v, { name: g.name }))
        if (!tr.length) return false
        arr = [...arr, ...tr]
        name[i] = g.name
        label[i] = tr
          .map(td => td.label)
          .sort((a, b) => a - b)
          .join('|')
        if ([5, 6, 7].includes(this.playObj.playid)) {
          value[i] = tr
            .map(td => td.value)
            .sort((a, b) => a - b)
            .join('+')
        } else if ([9, 10, 11, 12].includes(this.playObj.playid)) {
          value[i] = tr
            .map(td => td.value)
            .sort((a, b) => a - b)
            .join('|')
          value = value.filter(item => item)
        } else {
          value[i] = tr
            .map(td => td.value)
            .sort((a, b) => a - b)
            .join('|')
        }
      })

      betNum = this.getBetNum(value)
      console.log('aaaaa', betNum)
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
          betNum
        })
      }
    }
  },
  async mounted() {
    this.$bus.$on('resetBetArea', this.clearSelect)
    this.$bus.$on('randomBet', this.addData)
    // console.log()
    this.setBetting()
    console.log('qxc mounted')
    // todo 后期删除 开发热更新兼容 开发时开启 上线时关闭
    // this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('resetBetArea')
    this.$bus.$off('randomBet')
  },
  watch: {
    playObj(obj) {
      console.log(obj)
      const val = obj.playid
      this.setBetting()
      console.log('qxc watch')
      this.togetPeilv()
      this.clearSelect()
    },
    textarea(val) {
      // let danshiExcl = val.split(" ").join("|");
      // this.zhushu = calcBetNum(this.playObj.playid, danshiExcl);
      // this.singleSelect()
    },
    zhushu(val) {
      this.addData(this.textarea)
    }
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
  padding: 30px 0 30px 12px;
}
.bet-area {
  .group {
    display: flex;
    padding: 4px 0;
    align-items: center;
    .title {
      background: linear-gradient(to bottom, #ff586d, #e93248);
      // width: 80px;
      padding: 0 17px;
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
      padding: 2px 0 2px 10px;
      margin-left: 5px;
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
        margin-left: 5px;
        align-items: center;
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
    // &.gyh {
    //   .title {
    //     width: 140px;
    //     background-position: 0 center;
    //     .title-txt {
    //       margin: 0 35px;
    //     }
    //     &.bg-none {
    //       background: none;
    //     }
    //   }
    //   .option {
    //     justify-content: center;
    //     height: 86px;
    //     position: relative;
    //     .item {
    //       width: 60px;
    //       .item-value {
    //         margin-bottom: 10px;
    //       }
    //       .item-odd {
    //         border-radius: 4px;
    //       }
    //     }
    //   }
    // }
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
