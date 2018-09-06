<template >
  <div class="bet-main">
    <!-- {{playObj.playid}} -->

    <div v-if="!danshiArr.includes(playObj.playid)" v-for="(group,idx) in betSelectSet" :key='idx' class="group">
      <div class="title">
        <div class="title-txt" v-if="group.name">{{group.name}}</div>
      </div>
      <div class="option" :class="{'niuniu': playObj.playid == 57}">
        <div v-for="(item,key) in group.option" :key="key" class="item">
          <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(group,item)">{{item.label}}</div>
          <div class="item-odd" v-show="item.odds">{{item.odds}}</div>
        </div>
      </div>

      <div class="actions" v-if="![56, 54, 57].includes(playObj.playid)">
        <div class="ball" v-for="(txt, index) in actionsArr" :key="index" @click="changeGroup(group, index)">
          <span>{{txt}}</span>
        </div>
      </div>
    </div>
    <!-- <div v-if="danshiArr.includes(playObj.playid)">单式投注</div> -->
    <div v-if="isDanshi">
      <Input v-model="textarea" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :placeholder="'例如：' + myPlaceholder" @on-blur="filterData" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import getField from './field.js'
import calcBetNum from './calc.js'
import { compact } from 'lodash'

export default {
  name: 'betArea',
  data() {
    return {
      danshiArr: [
        2,
        4,
        7,
        9,
        12,
        14,
        17,
        19,
        22,
        24,
        38,
        39,
        40,
        41,
        42,
        43,
        44
      ],
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
      return [29].includes(this.playObj.playid)
    },
    isDanshi() {
      return this.danshiArr.includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装
    async togetPeilv() {
      if (!this.playObj.playid) return
      // 获取模板数据
      this.betSelectSet = getField(this.playObj)
      // 请求赔率
      let ret = await this.getPeilv()
      let item
      // 和值数据处理
      const playItem = ret.find(val => val.playid == this.playObj.playid)
      const peilv = playItem ? playItem.peilv : ''
      // if (this.playObj.playid == 1) {
      //   const arr = peilv ? peilv.split("|") : [];
      //   let pre = arr.length ? arr.splice(0, 4) : [];
      //   item = [...arr, ...pre];
      // } else {
      item = peilv ? peilv.split('|') : []
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
      // console.error(value)
      let arr = []
      // 龙虎, 单行处理
      if (
        [
          3,
          8,
          13,
          18,
          23,
          26,
          27,
          28,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          54
        ].includes(this.playObj.playid)
      ) {
        value.forEach(v => {
          arr = [...arr, ...v.split('+')].filter(h => h)
        })
      } else if (this.isDwd) {
        arr = this.getDwdArr(value)
      } else if (
        [
          1,
          5,
          6,
          10,
          11,
          15,
          16,
          20,
          21,
          25,
          45,
          46,
          47,
          48,
          49,
          50,
          51
        ].includes(this.playObj.playid)
      ) {
        // 三码直选复式，多行
        arr = value
      } else {
        value.forEach(v => {
          arr = [...arr, ...v.split('|')].filter(h => h)
        })
      }

      arr = compact(arr)
      return calcBetNum(this.playObj.playid, arr)
    },
    //号码选择互斥
    mutex({ name }, curItem) {
      const playid = this.playObj.playid
      if (name.indexOf('胆码') != -1 || name.indexOf('拖码') != -1) {
        //互斥的号码一般为胆拖，两行
        let arr1 = this.betSelectSet[0].option.filter(x => x.selected),
          arr2 = this.betSelectSet[1].option.filter(x => x.selected)

        // 如果是第一行点击，则第二行球消失
        if (name == this.betSelectSet[0].name) {
          arr1.forEach(item => {
            var index = arr2.findIndex(x => x.value === item.value)
            if (index >= 0) arr2[index].selected = !arr2[index].selected
          })
          //胆码最多只能选择三个或者两个
          if (playid == 51 && arr1.length > 7) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (playid == 50 && arr1.length > 6) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (playid == 49 && arr1.length > 5) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (playid == 48 && arr1.length > 4) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (playid == 47 && arr1.length > 3) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (
            (playid == 46 || playid == 5 || playid == 10 || playid == 15) &&
            arr1.length > 2
          ) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          } else if (
            (playid == 45 || playid == 20 || playid == 25) &&
            arr1.length > 1
          ) {
            arr1.filter(x => x.label != curItem.label)[0].selected = false
          }
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.betSelectSet[1].name) {
          arr2.forEach(item => {
            var index = arr1.findIndex(x => x.value === item.value)
            if (index >= 0) arr1[index].selected = !arr1[index].selected
          })
        }
      }
    },
    // 选择号码
    selectItem(group, item) {
      item.selected = !item.selected
      // 互斥
      this.mutex(group, item)
      this.addData()
    },
    singleSelect(betSelectSet = this.textarea, callback) {
      let arr = betSelectSet.split(',')

      this.singleArr = arr.map(v => {
        v = v
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')

        return {
          selected: calcBetNum(this.playObj.playid, [v.join('|')]),
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
    // 单行操作
    changeGroup(row, actIndex) {
      // 0 全 1 大 2 小 3 单 4 双 5 清
      row.option.forEach((x, idx) => {
        x.selected = false
        switch (actIndex) {
          case 0:
            x.selected = true
            this.mutex(row, row.option[idx])
            break
          case 1:
            if (x.value > 5) {
              x.selected = true
              this.mutex(row, row.option[idx])
            }
            break
          case 2:
            if (x.value < 6) {
              x.selected = true
              this.mutex(row, row.option[idx])
            }
            break
          case 3:
            if (x.value % 2 !== 0) {
              x.selected = true
              this.mutex(row, row.option[idx])
            }
            break
          case 4:
            if (x.value % 2 === 0) {
              x.selected = true
              this.mutex(row, row.option[idx])
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

      if (this.isDanshi) {
        this.singleSelect(betSelectSet.replace(/\|/g, ' '), callback)
        return
      }
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
        if (this.stateOdds) {
          value[i] = tr
            .map(td => td.value)
            .sort((a, b) => a - b)
            .join('+')
        } else {
          value[i] = tr
            .map(td => td.value)
            .sort((a, b) => a - b)
            .join('|')
        }
      })
      // 胆拖, 多行处理
      if (
        [
          1,
          5,
          6,
          10,
          11,
          15,
          16,
          20,
          21,
          25,
          45,
          46,
          47,
          48,
          49,
          50,
          51
        ].includes(this.playObj.playid) ||
        this.isDwd
      ) {
        value = value.map(x => x.replace(/\+/g, '|'))
      }
      betNum = this.getBetNum(value)
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
    // this.$bus.$on("resetBetArea", () => {
    //   this.clearSelect();
    // });
    // if (!this.playObj.palayid) return;
    this.setBetting()
    await this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('resetBetArea')
    this.$bus.$off('randomBet')
  },
  watch: {
    playObj(obj) {
      const val = obj.playid
      this.setBetting()
      this.togetPeilv()
      this.clearSelect()
      this.textarea = ''
      switch (val) {
        case 2:
        case 4:
        case 7:
        case 9:
        case 12:
        case 14:
        case 40:
          this.myPlaceholder = '1 2 3'
          break
        case 17:
        case 19:
        case 22:
        case 24:
        case 39:
          this.myPlaceholder = '1 2'
          break
        case 38:
          this.myPlaceholder = '1'
          break
        case 41:
          this.myPlaceholder = '1 2 3 4'
          break
        case 42:
          this.myPlaceholder = '1 2 3 4 5'
          break
        case 43:
          this.myPlaceholder = '1 2 3 4 5 6'
          break
        case 44:
          this.myPlaceholder = '1 2 3 4 5 6 7'
          break
      }
    },
    textarea(val) {
      // let danshiExcl = val.split(" ").join("|");
      // this.zhushu = calcBetNum(this.playObj.playid, danshiExcl);
      this.singleSelect()
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
  padding: 30px 0 30px 30px;
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
        margin-left: 18px;
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
