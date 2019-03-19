<template>
  <div class="day_list">
    <div class="day_con">
      <div class="detail-header" v-if="game.js_tag !=='lhc'">
        <kjItemHead v-if="highSpeed" :game="game"></kjItemHead>
        <kjItemHead v-if="highSpeed" :game="game"></kjItemHead>
        <kjItemHead v-if="highSpeed" :game="game"></kjItemHead>
      </div>
      <div class="detail-header" v-else>
        <kjItemHead :game="game"></kjItemHead>
      </div>

      <div class="day_con_main" v-if="data && data.length && game.js_tag !=='lhc'">
        <div>
          <kjItem v-for="(item,index) in colData1" :key="index" :item="item" :game="game" :day="day" @reload="reload"></kjItem>
        </div>
        <div>
          <kjItem v-for="(item,index) in colData2" :key="index" :item="item" :game="game" :day="day" @reload="reload"></kjItem>
        </div>
        <div>
          <kjItem v-for="(item,index) in colData3" :key="index" :item="item" :game="game" :day="day" @reload="reload"></kjItem>
        </div>
      </div>

      <div v-if="game.js_tag === 'lhc'">
        <div>
          <kjItem v-for="(item,index) in list" :key="index" :item="item" :game="game" :day="day" @reload="reload"></kjItem>
        </div>
      </div>
    </div>
    <Spin class="ivu-spin-fix" v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import kjItem from './kjItem'
import kjItemHead from './kjItemHead'
export default {
  name: 'lottery-table',
  props: ['game', 'data', 'day'],
  components: {
    kjItem,
    kjItemHead
  },
  data() {
    return {
      spinShow: true,
      kjList: [],
      list: []
    }
  },
  watch: {
    data: 'handle'
  },
  methods: {
    ...mapActions('game', ['getCplogList']),
    async handle(val) {
      this.list = await this.calcList()
    },
    // 获取开奖倒计时
    async getKjlog(game) {
      let ret = await this.getCplogList({ tag: game.tag })
      if (ret && Array.isArray(ret) && ret.length) {
        return ret[0].next
      }
      return []
    },
    colData(val) {
      let start = val * this.rowLength,
        _d = []
      for (let i = start, len = this.rowLength + start; i < len; i++) {
        if (i < this.list.length) {
          _d.push(this.list[i])
        } else {
          _d.push({})
        }
      }
      if (val === 2) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.spinShow = false
          }, 100)
        })
      }
      return _d
    },
    async calcList() {
      let _list = []
      let _qishu = this.data[0] ? this.data[0].qishu : 0
      if (this.data.length <= this.qishu) {
        for (let i = 0; i < this.qishu; i++) {
          if (this.data[i]) {
            _list.push(this.data[i])
            _qishu = this.data[i].qishu
          } else {
            _list.push({ qishu: _qishu })
          }
          _qishu++
        }
      }

      this.kjList = await this.getKjlog(this.game)

      if (this.kjList && this.kjList.length) {
        for (let i = 0; i < this.kjList.length; i++) {
          let c = this.kjList[i]
          let _item = _list.find(y => y.qishu === c.qishu)
          if (_item) {
            _item = Object.assign(_item, c)
            break
          }
        }
      }
      return _list
    },
    reload() {
      this.$emit('reload')
    }
  },
  computed: {
    ...mapState('game', ['qishus']),
    highSpeed() {
      return [
        'k3',
        '11x5',
        'pcdd',
        'ssc',
        'pk10',
        'pkniuniu',
        'xypk',
        'qxc',
        'xync',
        'tzyx'
      ].includes(this.game.js_tag)
    },
    qishu() {
      if (this.game && this.qishus) {
        return this.qishus.find(
          x => x.gameid === (this.game.game_id || this.game.gameid)
        ).qishu
      }
      return 0
    },
    rowLength() {
      if (this.qishu) {
        let qishu = Number(this.qishu)
        if (qishu % 3 === 0) {
          return qishu / 3
        } else {
          while (qishu++) {
            if (qishu % 3 === 0) {
              break
            }
          }
          return qishu / 3
        }
      }
    },
    colData1() {
      return this.colData(0)
    },
    colData2() {
      return this.colData(1)
    },
    colData3() {
      return this.colData(2)
    }
  },
  updated() {
    this.$nextTick(() => {
      let _this = this
      setTimeout(() => {
        _this.spinShow = false
      }, 2000)
    })
  }
  // mounted() {
  //   this.$nextTick(() => {
  //     let _this = this;
  //     setTimeout(() => {
  //       _this.spinShow = false;
  //     }, 2000);
  //   });
  //}
}
</script>

<style scoped>
.ivu-spin-fix {
  opacity: 0.8;
}
.day_list {
  position: relative;
  margin-bottom: 20px;
}
.day_list .day_con {
  line-height: 36px;
  font-size: 12px;
  color: #666;
}

.detail-header {
  display: flex;
  border-left: 1px solid #d2d2d2;
}

.detail-header > .col {
  flex-direction: row;
  flex: 1;
  display: flex;
  border: 1px solid #d2d2d2;
  margin-bottom: -1px;
  margin-left: -1px;
}
.detail-header > .col > div {
  flex: 1;
  text-align: center;
}
.detail-header > .col > div:nth-child(2) {
  flex: 1.5;
}
.detail-header > .col > .pks-nums {
  flex: 2;
  text-align: left;
  padding-left: 12px;
}
.detail-header > .col > .pks-issue {
  text-align: left;
  padding-left: 12px;
}

.day_con_main {
  display: flex;
  flex-direction: row;
  border-left: 1px solid #d2d2d2;
}
.day_con_main > div {
  flex: 1;
}
.col-row {
  display: flex;
  justify-content: space-around;
  border: 1px solid #d2d2d2;
  margin-bottom: -1px;
  margin-left: -1px;
}
.col-row > div {
  flex: 1;
  text-align: center;
}
.col-row > .red > .betting {
  padding: 3px 5px;
  background-color: #f90;
  color: #fff;
  line-height: 14px;
  cursor: pointer;
  margin-left: 5px;
}
.pk > div {
  flex: none;
  padding-left: 10px;
}
.col-row > div:nth-child(3) {
  flex: 1.5;
}
</style>
