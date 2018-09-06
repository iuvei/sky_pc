<template>
  <div class="game">
    <!-- 主体内容 -->
    <div class="container">
      <!-- 组件复用模块 -->
      <div class="item" v-for="(item,key) in gameCenterList" :key="key" :class="item.tag">
        <gameIndexItem :item="item" :openTime="openTimes[item.tag]" :openNum="openNums[item.tag]" @openNext="openNext"></gameIndexItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import gameIndexItem from '~/components/game/gameIndexItem'

export default {
  name: 'gameIndex',
  components: { gameIndexItem },
  computed: {
    ...mapState('game', [
      'game2txt',
      'gameList',
      'nowGameTag',
      'isShowAllGame'
    ]),
    gameCenterList() {
      if (!this.nowGameTag || this.isShowAllGame) {
        return this.gameList
      } else {
        return this.gameList.filter(item => item.js_tag == this.nowGameTag)
      }
    }
  },
  data() {
    return {
      openTimes: {},
      openNums: {},
      globalRefresh: false
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    // 获取开奖号码
    async togetCplogList(request = {}) {
      let obj = {}
      let ret = await this.getCplogList(request)
      ret.forEach(r => {
        Object.assign(obj, { [r.tag]: r.next })
      })
      return obj
    },
    // 获取全部开奖时间
    async togetKjCpLog() {
      let obj = {}
      let ret = await this.getKjCpLog({ date: 0 })
      ret.forEach(r => {
        Object.assign(obj, { [r.tag]: r.prev[0] })
      })
      this.openNums = obj
    },
    // 获取单个开奖时间
    async togetKjCpLogOne(tag, phase, cplog) {
      let ret = await this.getKjCpLog({ tag, pcount: 1, date: 0 })
      if (ret.length) {
        this.openNums[tag] = ret[0]
        if (cplog) {
          this.openTimes[tag] = cplog[tag]
        } else {
          this.openTimes[tag].shift()
        }
        return true
      }
      return false
    },
    // 自动请求回调
    async openNext({ tag, length }) {
      let cplog,
        oldPhase = this.openNums[tag].qishu
      this.openNums[tag] = ''
      // let n = ;
      if (length === 1) {
        cplog = await this.togetCplogList()
        // console.log(cplog);
      }
      let ret = await this.togetKjCpLogOne(tag, oldPhase, cplog)
      //添加一次 失败后5秒请求
      if (!ret) {
        setTimeout(() => {
          this.togetKjCpLogOne(tag, oldPhase, cplog)
        }, 5000)
      }
    }
  },
  async mounted() {
    this.togetKjCpLog()
    this.openTimes = await this.togetCplogList()
  }
}
</script>

<style lang="scss" scoped>
.game {
  padding-left: 20px;
  // background: #f5f5f5;
  background: rgb(236, 236, 236);
  .container {
    background: rgb(236, 236, 236);
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .item {
      width: 315px;
      border: 1px solid #cacaca;
      border-radius: 6px;
      margin: 20px 19px 0 0;
      transition: all 0.2s ease-in-out;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.24);
        transform: scale(1.06);
        box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.24),
          -3px 0px 5px rgba(0, 0, 0, 0.24), 0px 3px 5px rgba(0, 0, 0, 0.24),
          0px -3px 5px rgba(0, 0, 0, 0.24);
      }
    }
  }
}
</style>
<style>
.bet-area .group .option .item,
.bet-area .group .option .item .active,
.bet-area .group .option .item .item-value,
.bet-area .group .option .item-value {
  user-select: none !important;
}
</style>



