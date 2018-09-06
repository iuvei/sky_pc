
<template>
  <div class="bet-main pk10_main">
    <!--普通的-->
    <template v-if="![7,14].includes(playObj.playid) && !isSingle">
      <div v-for="(group,idx) in betSelectSet" :key='idx' class="group">
        <div class="title">
          <div class="title-txt" v-if="group.name" :class="{fir:idx===0,sec:idx===1,thi:idx===2}">{{group.name}}</div>
        </div>
        <div class="option">
          <div v-for="(item,key) in group.option" :key="key" class="item">
            <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
          </div>
        </div>
        <div class="actions">
          <div class="ball" v-for="(txt, index) in actionsArr" :key="index" @click="changeGroup(group, index)">
            <span>{{txt}}</span>
          </div>
        </div>
      </div>
    </template>

    <!--双面盘-->
    <template v-if="[14].includes(playObj.playid) && !isSingle">
      <div class="group smp" v-for="(group,idx) in betSelectSet" :key='idx'>
        <div class="title">
          <div class="title-txt" v-if="group.name" :class="{fir:idx===0,sec:idx===1,thi:idx===2}">{{group.name}}</div>
        </div>
        <div class="option smp">
          <div>
            <div v-for="(item,key) in group.option" :key="key" v-if="[0,1,2,3].includes(key)" class="item">
              <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
            </div>
          </div>
          <div>
            <div v-for="(item,key) in group.option" :key="key" v-if="[4,5].includes(key)" class="item">
              <div class="item-value" :class="[group.class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
            </div>
          </div>
        </div>
        <div style="width:450px" v-if="idx<5"></div>
        <div style="width:578px" v-if="idx>4"></div>
      </div>
    </template>

    <!--冠亚和-->
    <template v-if="[7].includes(playObj.playid) && !isSingle">
      <div class="group gyh">
        <div class="title">
          <div class="title-txt" v-if="betSelectSet[0].name">{{betSelectSet[0].name}}</div>
        </div>
        <div class="option">
          <div class="box balls">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key" class="item" v-if="key < 9">
                <div class="item-value" :class="[betSelectSet[0].class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
              </div>
            </div>
          </div>
          <div class="box">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key+'odd'" class="item odd" v-if="key < 9">
                <div class="item-odd" :style="{visibility:item.odds?'visible':'hidden'}">{{item.odds}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="width:310px;"></div>
      </div>
      <div class="group gyh" v-if="[7].includes(playObj.playid)">
        <div class="title bg-none"></div>
        <div class="option">
          <div class="box balls">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key" class="item" v-if="key > 8 && key < 17">
                <div class="item-value" :class="[betSelectSet[0].class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
              </div>
            </div>
          </div>
          <div class="box">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key + 'odd'" class="item odd" v-if="key > 8 && key < 17">
                <div class="item-odd" :style="{visibility:item.odds?'visible':'hidden'}">{{item.odds}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="width:345px;"></div>
      </div>
      <div class="group gyh" v-if="[7].includes(playObj.playid)">
        <div style="width:110px;"></div>
        <div class="option">
          <div class="box balls">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key" class="item" v-if="key > 16">
                <div class="item-value" :class="[betSelectSet[0].class,{'active':item.selected}]" @click="selectItem(item,key)">{{item.label}}</div>
              </div>
            </div>
          </div>
          <div class="box">
            <div>
              <div v-for="(item,key) in betSelectSet[0].option" :key="key" class="item odd" v-if="key > 16">
                <div class="item-odd" :style="{visibility:item.odds?'visible':'hidden'}">{{item.odds}}</div>
              </div>
            </div>
          </div>

        </div>
        <div style="width:420px;"></div>
      </div>
    </template>
    <!-- 单式 -->
    <template v-if="isSingle">
      <Input v-model="textarea" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :placeholder="'例如：' + myPlaceholder" @on-blur="filterData" />
    </template>
  </div>
</template>



<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import { getField, sortBallList } from './field.js'
import calcPk10 from './calc.js'

export default {
  name: 'betArea',
  data() {
    return {
      initPlayid: 7,
      betSelectSet: [],
      selsetedArr: [],
      actionsArr: ['全', '大', '小', '单', '双', '清'],
      textarea: '',
      myPlaceholder: '1 2 3',
      singleArr: []
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj']),
    isDwd() {
      return [6, 14, 15].includes(this.playObj.playid)
    },
    isSingle() {
      return [3, 5].includes(this.playObj.playid)
    }
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装
    async togetPeilv() {
      if (!this.playObj.playid) {
        this.betSelectSet = []
        return
      }
      // 获取模板数据
      // this.betSelectSet = getField(this.playObj.playid);
      let dataSource = getField(this.playObj.playid)
      // 请求赔率
      let ret = await this.getPeilv()

      if (ret && ret.length) {
        let item = []
        const playItem = ret.find(val => val.playid == this.playObj.playid)
        const peilv = playItem ? playItem.peilv : ''
        if (this.playObj.playid == 1) {
          const arr = peilv ? peilv.split('|') : []
          let pre = arr.length ? arr.splice(0, 4) : []
          item = [...arr, ...pre]
        } else {
          item = peilv ? peilv.split('|') : []
        }
        // 单一赔率
        if (item.length === 1) {
          this.changeField({ stateOdds: this.processZero(item[0]) })
        } else {
          this.changeField({ stateOdds: false })
          // this.betSelectSet.forEach((group, idx) => {
          dataSource.forEach((group, idx) => {
            let odds = item.splice(0, group.option.length),
              opt = []
            // this.betSelectSet[idx].option = group.option.map((val, key) => {
            dataSource[idx].option = group.option.map((val, key) => {
              this.$set(val, 'odds', this.processZero(odds[key]))
              return val
            })
          })
        }
      } else {
        return
      }
      // 根据模板排序
      this.betSelectSet = sortBallList(this.playObj.playid, dataSource)
      if (!this.betSelectSet || !this.betSelectSet.length) {
        this.betSelectSet = getField(this.playObj.playid)
      }

      // 单式判断
      if (this.isSingle) return
      this.changeField({
        betSetSource: JSON.parse(JSON.stringify(this.betSelectSet))
      })
    },
    // 清空选择
    clearSelect() {
      if (this.isSingle) {
        this.textarea = ''
        return
      }
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
      switch (this.playObj.playid) {
        case 1:
        case 7:
          // case 6:
          // case 14:
          // case 15:
          value.forEach(v => {
            arr = [...arr, ...v.split('|')].filter(h => h)
          })
          break
        case 2:
        case 4:
          arr = value.map(
            x =>
              x.length
                ? x
                    .split('|')
                    .map(y => y.length && y.padStart(2, '0'))
                    .join('|')
                : ''
          )
          break
        // 前二 单式
        case 3:
          arr = this.textarea
          break
        // 前三 单式
        case 5:
          break
        default:
          arr = value
          break
      }
      // 定位胆组装计算注数的数据
      if (this.isDwd) {
        arr = this.getDwdArr(arr)
      }
      return calcPk10.calcBetNum(this.playObj.playid, arr)
    },
    // 选球互斥
    // 选择号码
    selectItem(item, idx) {
      // 互斥
      // this.mutexK3(item, idx);
      item.selected = !item.selected
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
          selected: calcPk10.calcBetNum(this.playObj.playid, [v.join('|')]),
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
      row.option.forEach(x => {
        x.selected = false
        switch (actIndex) {
          case 0:
            x.selected = true
            break
          case 1:
            if (x.value > 5) x.selected = true
            break
          case 2:
            if (x.value < 6) x.selected = true
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
    //提交的数据特殊处理
    calcAddData(name, label, value) {
      //多行单赔率的处理
      if ([1].includes(this.playObj.playid)) {
        value = value.map(x => x.replace(/\|/g, '+'))
      } else if (this.isDwd) {
        //双面盘 定位胆，数字盘数据特殊处理
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
      if (value && value.length) {
        let spteater = '|'
        if (value[value.length - 1].includes('|')) {
          spteater = '|'
        } else if (value[value.length - 1].includes('+')) {
          spteater = '+'
        }
        value = value.map(x =>
          x
            .split(spteater)
            .sort((a, b) => a - b)
            .join(spteater)
        )
      }
      return {
        name,
        label,
        value
      }
    },
    addData(betSelectSet = this.betSelectSet, callback) {
      if (this.isSingle) {
        this.singleSelect(betSelectSet.replace(/\|/g, ' '), callback)
        return
      }
      let arr = [],
        name = [],
        label = [],
        value = []
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
      //计算注数
      let betNum = this.getBetNum(value)

      const obj = this.calcAddData(name, label, value)
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
    this.setBetting()
    this.togetPeilv()
  },
  destroyed() {
    this.$bus.$off('randomBet')
  },
  watch: {
    playObj(obj) {
      const val = obj.playid
      if (val == 3) {
        this.myPlaceholder = '1 2'
      }
      if (val == 5) {
        this.myPlaceholder = '1 2 3'
      }
      this.setBetting()
      this.togetPeilv()
      this.textarea = ''
    },
    textarea(val) {
      this.singleSelect()
    }
  }
}
</script>
<style lang='scss' scoped>
@mixin normal() {
}
@mixin active() {
  background: url(~/assets/img/game/pk10/pk10_btn_default_active.png) no-repeat
    top center;
  background-size: 40px 47px;
  transform: perspective(1px) scale(1.1);
  color: #fff;
}
.bet-main.pk10 {
  padding: 30px 0;
}
.pk10-main {
  .group {
    display: flex;
    padding: 4px 0;
    .title {
      width: 120px;
      background: url(~/assets/img/game/pk10/pk10_pos.png) no-repeat center
        center;
      background-size: 113px 40px;
      margin-left: -13px;
      height: 58px;
      &-txt {
        @include normal();
        height: 44px;
        text-align: right;
        line-height: 54px;
        margin: 0 14px;
        font-size: 18px;
        &.fir {
          background: url(~/assets/img/game/pk10/pk10_first.png) no-repeat
            center center;
          background-position: 20px 0;
          background-size: 37px 50px;
          margin: 0 14px;
        }
        &.sec {
          background: url(~/assets/img/game/pk10/pk10_sec.png) no-repeat center
            center;
          background-position: 20px 0;
          background-size: 37px 50px;
          margin: 0 14px;
        }
        &.thi {
          background: url(~/assets/img/game/pk10/pk10_thi.png) no-repeat center
            center;
          background-position: 20px 0;
          background-size: 37px 50px;
          margin: 0 14px;
        }
      }
    }
    .option {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      justify-content: center;
      padding: 2px 0;
      border-radius: 10px;
      align-items: center;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgb(238, 238, 238);
      }
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 52px;
        width: 50px;
        &-value {
          @include normal();
          background: url(~/assets/img/game/pk10/pk10_btn_default.png) no-repeat
            top center;
          background-size: 40px 47px;
          background-position: 0 0;
          transition: all 0.2s linear;
          height: 47px;
          width: 40px;
          line-height: 47px;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
          &:hover {
            @include active();
            background: url(~/assets/img/game/pk10/pk10_btn_default.png)
              no-repeat top center;
            // background: none;
            color: rgb(73, 80, 96);
          }
        }
        .active {
          @include active();
          transform: scale(1);
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
      &.smp {
        > div {
          display: flex;
        }
      }
    }
    &.smp {
      .title {
        width: 140px;
        background-position: 0 center;
        .title-txt {
          margin: 0 35px 0 10px;
        }
      }
      .item {
        width: 64px;
        height: 48px;
      }
    }
    &.gyh {
      .title {
        width: 140px;
        background-position: 0 center;
        .title-txt {
          margin: 0 35px;
        }
        &.bg-none {
          background: none;
        }
      }
      .option {
        justify-content: center;
        height: 86px;
        &:hover {
          .box.balls > div {
            background-color: rgb(231, 231, 231);
            box-shadow: 0 1px 1px 1px rgb(200, 200, 200) inset;
          }
        }
        .box {
          width: 96%;
          margin: 0 auto;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .box.balls {
          margin: 4px auto;
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
          > div {
            border-radius: 10px;
            height: 54px;
            .item {
              height: 48px;
              .item-value {
                margin: 0;
              }
            }
          }
        }
        .item {
          &.odd {
            height: auto;
          }
          width: 60px;
          .item-value {
            margin-bottom: 10px;
          }
          .item-odd {
            border-radius: 4px;
          }
        }
      }
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
