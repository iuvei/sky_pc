<template>
  <div class="bet-main">
    <div
      v-for="(group,idx) in betSelectSet"
      :key='idx'
      class="group"
    >
      <div class="title">
        <div
          class="title-txt"
          v-if="group.name"
        >{{group.name}}</div>
      </div>
      <div
        class="option"
        :class="{sum:playObj.playid==1}"
      >
        <div
          v-for="(item,key) in group.option"
          :key="key"
          class="item"
        >
          <div
            class="item-value"
            :class="[group.class,{'active':item.selected}]"
            @click="selectItem(item,idx)"
          >{{item.label}}</div>
          <div
            class="item-odd"
            :style="{visibility:item.odds?'visible':'hidden'}"
          >{{item.odds}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinMutex from '../mixinMutex'
import getField from './field.js'
import calcK3 from './calc.js'

export default {
  name: 'betArea',
  data() {
    return {
      betSelectSet: [],
      selsetedArr: []
    }
  },
  mixins: [mixinMutex],
  computed: {
    ...mapState('gameBet', ['playObj', 'stateOdds'])
  },
  methods: {
    ...mapActions('game', ['getPeilv']),
    ...mapMutations('gameBet', ['setBetting', 'changeField']),
    // 下注数据组装 结构+赔率
    async togetPeilv(v) {
      // console.log(this.$route.params.id || this.$route.query.id)
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
      // 和值数据处理
      if (this.playObj.playid == 1) {
        let arr = ret
          .filter(val => val.playid == this.playObj.playid)[0]
          .peilv.split('|')
        let pre = arr.splice(0, 4)
        item = [...arr, ...pre]
      } else {
        item = ret
          .filter(val => val.playid == this.playObj.playid)[0]
          .peilv.split('|')
      }
      // 单一赔率
      if (item.length === 1) {
        this.changeField({ stateOdds: item[0] })
      } else {
        this.changeField({ stateOdds: false })
        this.betSelectSet.forEach((group, idx) => {
          let odds = item.splice(0, group.option.length),
            opt = []
          this.betSelectSet[idx].option = group.option.map((val, key) => {
            this.$set(val, 'odds', odds[key])
            // this.$set(val, "selected", false);
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
        case 14:
        case 15:
          value.forEach(v => {
            arr = [...arr, ...v.split('|')].filter(h => h)
          })
          break
        case 5:
        case 10:
          arr = value
          break
        default:
          break
      }
      return calcK3.calcBetNum(this.playObj.playid, arr)
    },
    // 选球互斥
    // 选择号码
    selectItem(item, idx) {
      // 互斥
      this.mutexK3(item, idx)
      item.selected = !item.selected
      this.addData()
    },
    addData(betSelectSet = this.betSelectSet, callback) {
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
        // 二同号判断
        if (this.playObj.playid == 7) {
          value[i] = tr
            .map(td => td.value)
            .sort()
            .join('+')
        } else {
          value[i] = tr
            .map(td => td.value)
            .sort()
            .join('|')
        }
      })
      if (callback) {
        callback({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: { name, label, value }
        })
      } else {
        this.setBetting({
          selected: JSON.parse(JSON.stringify(arr)),
          oneBetDate: { name, label, value },
          betNum: this.getBetNum(label)
        })
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
    // console.log('destroyed')
  },
  watch: {
    playObj(val) {
      // console.log('k3 watch')
      this.setBetting()
      this.togetPeilv()
    }
  }
}
</script>
<style lang='scss' scoped>
@mixin normal() {
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  background: linear-gradient(to bottom, #fafafa, #cecece);
  box-shadow: 1px 1px 1px #c6c6c6;
}
@mixin active() {
  transform: scale(1.1);
}
.bet-area {
  .group {
    display: flex;
    .title {
      width: 150px;
      display: flex;
      justify-content: center;
      &-txt {
        height: 44px;
        // width: 50px;
        text-align: center;
        line-height: 44px;
        font-size: 20px;
        margin: 10px auto 0;
        padding: 0 12px;
        @include normal();
      }
    }
    .option {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        width: 120px;
        &-value {
          @include normal();
          height: 40px;
          min-width: 40px;
          line-height: 40px;
          text-align: center;
          margin-bottom: 12px;
          cursor: pointer;
          padding: 0 5px;
          font-size: 20px;
          transition: all 0.3s ease-in-out;
          &:hover {
            border-radius: 4px;
            box-shadow: 1px 1px 1px #c6c6c6;
            @include active();
          }
        }
        .active {
          @include active();
          border: 1px solid #fe6678;
          border-radius: 4px;
          color: #fff;
          background: linear-gradient(to bottom, #fe6678, #e93248);
          box-shadow: 1px 1px 1px rgba(232, 76, 95, 0.97);
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
    .sum {
      .item {
        width: 100px;
      }
    }
  }
}
</style>
